import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { TBookmarkIcon } from "../libs/types";

export default function BookmarkIcon({
  id,
  onBookmarkToggle,
  isBookmarked,
}: TBookmarkIcon) {
  return (
    <button
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onBookmarkToggle(id);
        e.stopPropagation();
        e.preventDefault();
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon className={isBookmarked ? "filled" : ""} />
    </button>
  );
}
