import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { MouseEventHandler } from "react";

export default function PaginationControls({
  isNextPageLimitReached,
  handleChangePage,
  currPage,
}: {
  isNextPageLimitReached: number;
  handleChangePage: (direction: string) => void;
  currPage: number;
}) {
  return (
    <section className="pagination">
      {currPage > 1 && (
        <PaginationButton
          direction={"back"}
          currPage={currPage}
          onClick={() => handleChangePage("back")}
        />
      )}

      {currPage < isNextPageLimitReached && (
        <PaginationButton
          direction={"next"}
          currPage={currPage}
          onClick={() => handleChangePage("next")}
        />
      )}
    </section>
  );
}

function PaginationButton({
  currPage,
  direction,
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  currPage: number;
  direction: "back" | "next";
}) {
  return (
    <button
      onClick={(e) => {
        onClick(e);
        e.currentTarget.blur();
      }}
      className={`pagination__button  pagination__button--${direction}
       `}
    >
      {direction === "back" ? (
        <>
          <ArrowLeftIcon className="pagination__icon" />
          Previous {currPage - 1}
        </>
      ) : (
        <>
          Page {currPage + 1}
          <ArrowRightIcon className="pagination__icon" />
        </>
      )}
    </button>
  );
}
