import { createContext, ReactNode, useCallback, useState } from "react";
import { useJobList, usePagination, useSearchContext } from "../libs/hooks";
import { TJobItem, TPageDirections, TSortBy } from "../libs/types";

type TJobItemsContext = {
  sortBy: "relevant" | "newest";
  setSortBy: React.Dispatch<React.SetStateAction<TSortBy>>;
  jobItems: TJobItem[] | undefined;
  isLoading: boolean;
  jobItemsSortedandSliced: TJobItem[];
  resultCount: number;
  handleSorting: (sortBy: TSortBy) => TJobItem[] | undefined;
  handleChangePage: (direction: TPageDirections) => void;
  currPage: number;
};

export const JobItemsContext = createContext<TJobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [sortBy, setSortBy] = useState<TSortBy>("relevant");

  // HOOKS
  const { debouncedValue } = useSearchContext();
  const { jobItems, isLoading } = useJobList(debouncedValue);
  const { sliceStart, sliceEnd, handleChangePage, currPage, setCurrPage } =
    usePagination();

  // DERIVED STATES
  const jobItemsSorted = jobItems;

  const jobItemsSortedandSliced =
    jobItemsSorted?.slice(sliceStart, sliceEnd) || [];

  const resultCount = jobItems?.length || 0;

  // HANDLE FUNCTIONS
  const handleSorting = useCallback(
    (sortBy: TSortBy) => {
      setSortBy(sortBy);
      setCurrPage(1);

      if (sortBy === "relevant") {
        return jobItemsSorted?.sort(
          (a, b) => b.relevanceScore - a.relevanceScore
        );
      }
      if (sortBy === "newest") {
        return jobItemsSorted?.sort((a, b) => a.daysAgo - b.daysAgo);
      }
    },
    [jobItemsSorted, setCurrPage]
  );
  return (
    <>
      <JobItemsContext.Provider
        value={{
          sortBy,
          setSortBy,
          jobItems,
          isLoading,
          jobItemsSortedandSliced,
          resultCount,
          handleSorting,
          handleChangePage,
          currPage,
        }}
      >
        {children};
      </JobItemsContext.Provider>
    </>
  );
}
