import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import { useDebounce, useJobList } from "../libs/hooks";
import { useState } from "react";
import Sidebar from "./Sidebar";
import JobItemContent from "./JobItemContent";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce(searchText, 250);

  // FETCHING SEARCH
  const [jobItems, isLoading] = useJobList(debouncedValue);

  const jobItemsSliced = jobItems.slice(0, 7);
  const resultCount = jobItems.length;

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
        />
        <JobItemContent />
      </Container>

      <Footer />
    </>
  );
}

export default App;
