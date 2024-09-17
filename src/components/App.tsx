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

function App() {
  const [searchText, setSearchText] = useState("");

  const debouncedValue = useDebounce(searchText, 250);
  // FETCHING SEARCH
  const { jobItems, isLoading } = useJobList(debouncedValue);

  const { nextpage, prevPage, setCurrPage, currPage } = usePagination();

  const jobItemsSliced = jobItems?.slice(prevPage, nextpage) || [];

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
          setCurrPage={setCurrPage}
          currPage={currPage}
        />
        <JobItemContent />
      </Container>

      <Footer />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
