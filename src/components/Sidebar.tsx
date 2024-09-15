import { TJobItem } from "../libs/types";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

type TJobList = {
  resultCount: number;
  jobItemsSliced: TJobItem[];
  isLoading: boolean;
};

export default function Sidebar({
  resultCount,
  jobItemsSliced,
  isLoading,
}: TJobList) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount resultCount={resultCount} />
        <SortingControls />
      </div>
      <JobList jobItemsSliced={jobItemsSliced} isLoading={isLoading} />
      <PaginationControls />
    </div>
  );
}
