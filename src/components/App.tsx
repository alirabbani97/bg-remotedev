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
import { TJobItem } from "../libs/types";

function App() {
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("relevant");

  const debouncedValue = useDebounce(searchText, 250);
  // FETCHING SEARCH
  const { jobItems, isLoading } = useJobList(debouncedValue);

  const { sliceStart, sliceEnd, handleChangePage, currPage } = usePagination();

  const jobItemsSliced = jobItems?.slice(sliceStart, sliceEnd) || [];

  const jobsSorted = () => {
    if (sortBy === "relevant") {
      return jobItems?.toSorted((a,b)=> b.relevanceScore - a.relevanceScore)
   
    }
    if (sortBy === "newest") {
      return  jobItems?.toSorted((a,b)=> a.daysAgo - b.daysAgo)

    }
  };

  const resultCount = jobItems?.length || 0;

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
          setSortBy={setSortBy}
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
