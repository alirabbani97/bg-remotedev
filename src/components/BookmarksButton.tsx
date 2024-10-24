import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useState, useRef } from "react";
import { useOnClickOutside } from "../libs/hooks";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popOverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([buttonRef, popOverRef], () => setIsOpen(false));

  return (
    <section>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>

      {isOpen && <BookmarksPopover ref={popOverRef} />}
    </section>
  );
}
