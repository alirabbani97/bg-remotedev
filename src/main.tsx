import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookmarksContextProvider from "./contexts/BookmarksContextProvider.tsx";
import ActiveIdContextProvider from "./contexts/ActiveIdContextProvider.tsx";
import JobItemsContextProvider from "./contexts/JobItemsContextProvider.tsx";
import SearchContextProvider from "./contexts/SearchContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarksContextProvider>
        <SearchContextProvider>
          <ActiveIdContextProvider>
            <JobItemsContextProvider>
              <App />
            </JobItemsContextProvider>
          </ActiveIdContextProvider>
        </SearchContextProvider>
      </BookmarksContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
