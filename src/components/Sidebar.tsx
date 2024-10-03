import { TJobItem, TPageDirections, TSortBy } from "../libs/types";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

type TSidebar = {
  resultCount: number;
  jobItemsSliced: TJobItem[];
  isLoading: boolean;
  handleChangePage: (direction: TPageDirections) => void;
  currPage: number;
  setSortBy: (text: TSortBy) => void;
  sortBy: string;
};

export default function Sidebar({
  resultCount,
  jobItemsSliced,
  isLoading,
  handleChangePage,
  currPage,
  setSortBy,
  sortBy,
}: TSidebar) {
  const isNextPageLimitReached = resultCount / 7;

  console.log(isNextPageLimitReached);
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount resultCount={resultCount} />
        <SortingControls setSortBy={setSortBy} sortBy={sortBy} />
      </div>
      <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
      <PaginationControls
        currPage={currPage}
        isNextPageLimitReached={isNextPageLimitReached}
        handleChangePage={handleChangePage}
      />
    </div>
  );
}
