import { useBookmarksContext } from "../libs/hooks";
import JobList from "./JobList";

export default function BookmarksPopover() {
  const { isLoading, jobItems } = useBookmarksContext();

  return (
    <div className="bookmarks-popover">
      <JobList jobItems={jobItems} isLoading={isLoading} />
    </div>
  );
}
