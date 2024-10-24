import React, { useState, useEffect, useContext } from "react";
import { TJobItem, TJobItemContent, TPageDirections } from "./types";
import { useQueries, useQuery } from "@tanstack/react-query";
import { BASE_API_URL, RESULTS_PER_PAGE } from "./constants";
import { handleError } from "./utils";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";
import { SearchContext } from "../contexts/SearchContextProvider";
import { JobItemsContext } from "../contexts/JobItemsContextProvider";

type APIresponseJobItem = {
  public: boolean;
  jobItem: TJobItemContent;
};

type APIresponseJobList = {
  public: boolean;
  sorted: boolean;
  jobItems: TJobItem[];
};

const fetchJobItemContent = async (
  id: number | null
): Promise<APIresponseJobItem> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.description);
  }
  const data = await response.json();
  // console.log(data);
  return data;
};

export const useJobItem = () => {
  const activeId = useActiveId();
  const { data, isInitialLoading } = useQuery(
    ["job-item", activeId],
    () => (activeId ? fetchJobItemContent(activeId) : null),
    {
      staleTime: 1000 * 60 * 60,
      enabled: !!activeId,
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError,
    }
  );
  const jobItemContent = data?.jobItem;
  const isLoading = isInitialLoading;
  return { jobItemContent, isLoading };
};

export const useJobItems = (ids: number[]) => {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItemContent(id),
      staleTime: 1000 * 60 * 60,
      enabled: !!id,
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError,
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => !!jobItem) as TJobItemContent[];
  const isLoading = results.some((result) => result.isLoading);
  return { jobItems, isLoading };
};

const fetchJobList = async (
  text: string | null
): Promise<APIresponseJobList> => {
  const response = await fetch(`${BASE_API_URL}?search=${text}`);
  // console.log(response);
  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.description);
  }
  const data = await response.json();
  console.log(data);
  return data;
};

export const useJobList = (searchText: string) => {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobList(searchText),
    {
      staleTime: 1000 * 60 * 60,
      enabled: !!searchText,
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError,
    }
  );

  return { jobItems: data?.jobItems, isLoading: isInitialLoading } as const;
};

export const useDebounce = (text: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(text);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(text), delay);

    return () => clearTimeout(timerId);
  }, [text, delay]);

  return debouncedValue;
};

export const useActiveId = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    function hashChangeListener() {
      const id = +window.location.hash.slice(1);

      setActiveId(id);
    }

    hashChangeListener();
    window.addEventListener("hashchange", hashChangeListener);

    return () => {
      window.removeEventListener("hashchange", hashChangeListener);
    };
  }, []);

  return activeId;
};

export const usePagination = () => {
  const [currPage, setCurrPage] = useState(1);

  const handleChangePage = (direction: TPageDirections) => {
    if (direction === "back") {
      setCurrPage((prev) => (prev > 1 ? prev - 1 : 0));
    }
    if (direction === "next") {
      setCurrPage((prev) => prev + 1);
    }
  };

  const sliceEnd = RESULTS_PER_PAGE * currPage || RESULTS_PER_PAGE;
  const sliceStart = currPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE || 0;

  return { sliceStart, sliceEnd, handleChangePage, currPage, setCurrPage };
};

export const useLocalStorageHook = <T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  clickEvent: () => void
) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (refs.every((ref) => !ref.current?.contains(e.target as Node))) {
        clickEvent();
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [clickEvent, refs]);

  return {};
}

export const useBookmarksContext = () => {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error(
      "BookmarksContext should be used inside a BookmarksContext.Provider wrapper."
    );
  }

  return context;
};

export const useActiveIdContext = () => {
  const context = useContext(ActiveIdContext);

  if (!context) {
    throw new Error(
      "ActiveIdContext should be used inside a ActiveIdContext.Provider wrapper."
    );
  }

  return context;
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      "SearchContext should be used inside a SearchContext.Provider wrapper."
    );
  }

  return context;
};
export const useJobItemsContext = () => {
  const context = useContext(JobItemsContext);

  if (!context) {
    throw new Error(
      "JobItemsContext should be used inside a JobItemsContext.Provider wrapper."
    );
  }

  return context;
};
