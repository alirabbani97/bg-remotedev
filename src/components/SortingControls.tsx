import { useJobItemsContext } from "../libs/hooks";

export default function SortingControls() {
  const { sortBy, handleSorting } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        onClick={() => handleSorting("relevant")}
        className={`sorting__button sorting__button--relevant ${
          sortBy === "relevant" ? " sorting__button--active " : " "
        }`}
      >
        Relevant
      </button>

      <button
        onClick={() => handleSorting("newest")}
        className={`sorting__button sorting__button--recent ${
          sortBy === "newest" ? " sorting__button--active " : " "
        }`}
      >
        Recent
      </button>
    </section>
  );
}
