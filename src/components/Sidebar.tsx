import { TJobItem } from "../libs/types";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

type TSidebar = {
  resultCount: number;
  jobItemsSliced: TJobItem[];
  isLoading: boolean;
};

export default function Sidebar({
  resultCount,
  jobItemsSliced,
  isLoading,
}: TSidebar) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount resultCount={resultCount} />
        <SortingControls />
      </div>
      <JobList jobItemsSliced={jobItemsSliced} isLoading={isLoading} />
      <PaginationControls
        jobItemsSliced={jobItemsSliced.length}
      />
    </div>
  );
}
