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
        />
        <JobItemContent />
      </Container>

      <Footer />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
