import { useActiveId } from "../libs/hooks";
import { TJobItem } from "../libs/types";
import BookmarkIcon from "./BookmarkIcon";

export default function JobListItem({
  JobItem,
  handleBookmarkToggle,
  isBookmarked,
}: {
  JobItem: TJobItem;
  isBookmarked: boolean;
  handleBookmarkToggle: (id: number) => void;
}) {
  const activeId = useActiveId();

  return (
    <li
      className={`job-item ${
        activeId === JobItem.id ? "job-item--active" : ""
      }`}
    >
      <a href={`#${JobItem.id}`} className="job-item__link">
        <div className="job-item__badge">{JobItem.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{JobItem.title}</h3>
          <p className="job-item__company">{JobItem.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon
            isBookmarked={isBookmarked}
            id={JobItem.id}
            onBookmarkToggle={handleBookmarkToggle}
          />
          <time className="job-item__time">{JobItem.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
