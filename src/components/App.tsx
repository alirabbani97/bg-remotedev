import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import { useDebounce, useJobList, usePagination } from "../libs/hooks";
import { useState } from "react";
import Sidebar from "./Sidebar";
import JobItemContent from "./JobItemContent";
import { Toaster } from "react-hot-toast";
import { TSortBy } from "../libs/types";

function App() {
  //STATES
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState<TSortBy>("relevant");
  const [bookmarkIds, setBookmarkIds] = useState<number[]>([]);

  // HOOKS
  const debouncedValue = useDebounce(searchText, 250);
  const { jobItems, isLoading } = useJobList(debouncedValue);
  const { sliceStart, sliceEnd, handleChangePage, currPage, setCurrPage } =
    usePagination();

  // DERIVED STATES
  const jobItemsSliced = jobItems?.slice(sliceStart, sliceEnd) || [];
  const resultCount = jobItems?.length || 0;

  // HANDLE FUNCTIONS
  const handleSorting = (sortBy: TSortBy) => {
    setSortBy(sortBy);
    setCurrPage(1);

    if (sortBy === "relevant") {
      return jobItems?.sort((a, b) => b.relevanceScore - a.relevanceScore);
    }
    if (sortBy === "newest") {
      return jobItems?.sort((a, b) => a.daysAgo - b.daysAgo);
    }
  };

  const handleBookmarkToggle = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => [...prev].filter((prevId) => prevId !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };

  return (
    <>
      <Background />

      <Header>
        <div className="header__top">
          <Logo />
          <BookmarksButton />
        </div>

        <SearchForm setSearchText={setSearchText} searchText={searchText} />
      </Header>

      <Container>
        <Sidebar
          resultCount={resultCount}
          jobItemsSliced={jobItemsSliced}
          isLoading={isLoading}
          handleChangePage={handleChangePage}
          currPage={currPage}
          setSortBy={handleSorting}
          sortBy={sortBy}
          bookmarkIds={bookmarkIds}
          handleBookmarkToggle={handleBookmarkToggle}
        />
        <JobItemContent
          handleBookmarkToggle={handleBookmarkToggle}
          bookmarkIds={bookmarkIds}
        />
      </Container>

      <Footer />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
