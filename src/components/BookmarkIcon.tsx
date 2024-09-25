import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

export default function BookmarkIcon({ id }: { id: number }) {
  const { bookmarkIds, handleBookmarkToggle } = useContext(BookmarksContext);

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
