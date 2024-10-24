import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { useJobItemsContext } from "../libs/hooks";

export default function Sidebar() {
  const { isLoading, jobItemsSortedandSliced } = useJobItemsContext();
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount />
        <SortingControls />
      </div>
      <JobList isLoading={isLoading} jobItems={jobItemsSortedandSliced} />
      <PaginationControls />
    </div>
  );
}
