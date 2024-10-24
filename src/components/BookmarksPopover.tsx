import { forwardRef } from "react";
import { useBookmarksContext } from "../libs/hooks";
import { createPortal } from "react-dom";
import JobList from "./JobList";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { isLoading, jobItems } = useBookmarksContext();

  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={jobItems} isLoading={isLoading} />
    </div>,
    document.body
  );
});
export default BookmarksPopover;
