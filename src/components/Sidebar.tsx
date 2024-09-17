import { TJobItem } from "../libs/types";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

type TSidebar = {
  resultCount: number;
  jobItemsSliced: TJobItem[];
  isLoading: boolean;
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
  currPage: number;
};

export default function Sidebar({
  resultCount,
  jobItemsSliced,
  isLoading,
  setCurrPage,
  currPage,
}: TSidebar) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount resultCount={resultCount} />
        <SortingControls />
      </div>
      <JobList jobItemsSliced={jobItemsSliced} isLoading={isLoading} />
      <PaginationControls
        setCurrPage={setCurrPage}
        currPage={currPage}
        resultCount={resultCount}
        jobItemsSliced={jobItemsSliced.length}

      />
    </div>
  );
}
