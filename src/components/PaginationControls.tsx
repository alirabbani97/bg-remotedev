import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export default function PaginationControls({
  setCurrPage,
  currPage,
  resultCount,
  jobItemsSliced,
}: {
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
  currPage: number;
  resultCount: number;
  jobItemsSliced: number;
}) {
  const nextPageLimit = 7 / jobItemsSliced;
  return (
    <section className="pagination">
      {resultCount > 7 && (
        <>
          <button
            onClick={() => setCurrPage((prev) => (prev > 1 ? prev - 1 : 0))}
            className={`pagination__button pagination__button--back  ${
              currPage === 1 ? " pagination__button--hidden " : ""
            }`}
          >
            {" "}
            <>
              <ArrowLeftIcon className="pagination__icon" />
              Previous {currPage - 1}
            </>
          </button>
          <button
            onClick={() => setCurrPage((prev) => ++prev)}
            className={`pagination__button pagination__button--next ${
              nextPageLimit !== 1 ? " pagination__button--hidden " : ""
            }`}
          >
            Page {currPage + 1}
            <ArrowRightIcon className="pagination__icon" />
          </button>{" "}
        </>
      )}
    </section>
  );
}
