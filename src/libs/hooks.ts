import { useState, useEffect } from "react";
import { TJobItem, TJobItemContent, TPageDirections, TSortBy } from "./types";
import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL, RESULTS_PER_PAGE } from "./constants";
import { handleError } from "./utils";

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

export const useJobItemContent = () => {
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
