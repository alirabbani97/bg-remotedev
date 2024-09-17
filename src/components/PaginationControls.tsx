import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { usePagination } from "../libs/hooks";
import { MouseEventHandler } from "react";

export default function PaginationControls({
  jobItemsSliced,
}: {
  jobItemsSliced: number;
}) {
  const { handleChangePage, currPage } = usePagination();

  const isNextPageLimitReached = 7 / jobItemsSliced !== 1;
  return (
    <section className="pagination">
      {currPage > 1 && (
        <PaginationButton
          direction={"back"}
          currPage={currPage}
          onClick={() => handleChangePage("back")}
        />
      )}

      {!isNextPageLimitReached && (
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
      onClick={onClick}
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
