import { createContext, ReactNode } from "react";
import { useJobItems, useLocalStorageHook } from "../libs/hooks";
import { TJobItem } from "../libs/types";

type TBookmarkContext = {
  bookmarkIds: number[];
  handleBookmarkToggle: (id: number) => void;
  jobItems: TJobItem[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<TBookmarkContext | null>(null);

export default function BookmarksContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [bookmarkIds, setBookmarkIds] = useLocalStorageHook<number[]>(
    "bookmarkIds",
   []
  );

  const { jobItems, isLoading } = useJobItems(bookmarkIds);

  const handleBookmarkToggle = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => [...prev].filter((prevId) => prevId !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };

  return (
    <>
      <BookmarksContext.Provider
        value={{ bookmarkIds, handleBookmarkToggle, jobItems, isLoading }}
      >
        {children};
      </BookmarksContext.Provider>
    </>
  );
}
