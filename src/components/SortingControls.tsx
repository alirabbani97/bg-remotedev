type TSortingControls = {
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
};

export default function SortingControls({
  setSortBy,
  sortBy,
}: TSortingControls) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        onClick={() => setSortBy("relevant")}
        className={`sorting__button sorting__button--relevant ${
          sortBy === "relevant" ? " sorting__button--active" : ""
        }`}
      >
        Relevant
      </button>

      <button
        onClick={() => setSortBy("relevant")}
        className={`sorting__button sorting__button--recent ${
          sortBy === "recent" ? " sorting__button--active" : ""
        }`}
      >
        Recent
      </button>
    </section>
  );
}
