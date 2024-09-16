import { useState, useEffect } from "react";
import { TJobItem, TJobItemContent } from "./types";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./constants";

type APIresponseJobItem = {
  public: boolean;
  jobItem: TJobItemContent;
};

const fetchJobItemContent = async (
  id: number | null
): Promise<APIresponseJobItem> => {
  const response = await fetch(`${BASE_URL}/${id}`);

  const data = await response.json();
  console.log(data);
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
      onError: () => {},
    }
  );
  const jobItemContent = data?.jobItem;
  const isLoading = isInitialLoading;
  return { jobItemContent, isLoading };
};

export const useJobList = (searchText: string) => {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // if (!searchText) return;

    const search = async () => {
      setIsLoading(true);

      const response = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${
          !searchText ? "r" : searchText
        }`
      );

      const data = await response.json();
      setJobItems(data.jobItems);
      // console.log(data.jobItems);

      setIsLoading(false);
    };
    search();
  }, [searchText]);

  return [jobItems, isLoading] as const;
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
