import { useSearchContext } from "../libs/hooks";

export default function SearchForm() {
  const {searchText,setSearchText}=useSearchContext()
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        spellCheck="false"
        type="text"
        required
        value={searchText}
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
