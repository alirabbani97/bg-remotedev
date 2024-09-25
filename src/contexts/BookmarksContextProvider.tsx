import React, { createContext, ReactNode, useState } from "react";

type TBookmarkContext = {
  bookmarkIds: number[];
  handleBookmarkToggle: (id: number) => void;
};

export const BookmarksContext = createContext<TBookmarkContext>(null);

export default function BookmarksContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [bookmarkIds, setBookmarkIds] = useState<number[]>([]);

  const handleBookmarkToggle = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => [...prev].filter((prevId) => prevId !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };
  return (
    <>
      <BookmarksContext.Provider value={{ bookmarkIds, handleBookmarkToggle }}>
        {children};
      </BookmarksContext.Provider>
    </>
  );
}
