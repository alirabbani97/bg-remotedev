import { createContext, ReactNode, useState } from "react";
import { useDebounce } from "../libs/hooks";

type TSearchContext = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  debouncedValue: string;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchText, setSearchText] = useState("");

  const debouncedValue = useDebounce(searchText, 250);
  
  return (
    <>
      <SearchContext.Provider
        value={{ searchText, setSearchText, debouncedValue }}
      >
        {children};
      </SearchContext.Provider>
    </>
  );
}
