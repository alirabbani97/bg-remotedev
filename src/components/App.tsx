import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import { useSearchFetch } from "../libs/hooks";
import { useState } from "react";
import Sidebar from "./Sidebar";
import JobItemContent from "./JobItemContent";

function App() {
  const [searchText, setSearchText] = useState("");

  const [jobItems, isLoading] = useSearchFetch(searchText);

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
        <Sidebar jobItems={jobItems} isLoading={isLoading} />
        <JobItemContent />
      </Container>

      <Footer />
    </>
  );
}

export default App;
