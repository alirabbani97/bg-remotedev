import { BookmarkFilledIcon } from "@radix-ui/react-icons";

import { useBookmarksContext } from "../libs/hooks";

export default function BookmarkIcon({ id }: { id: number }) {
  const { bookmarkIds, handleBookmarkToggle } = useBookmarksContext();

  return (
    <button
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleBookmarkToggle(id);
        e.stopPropagation();
        e.preventDefault();
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={bookmarkIds.includes(id) ? "filled" : ""}
      />
    </button>
  );
}
