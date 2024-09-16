import { useState, useEffect } from "react";
import { TJobItem } from "./types";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./constants";

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

// export const useJobItemContent = () => {
//   const [jobItemContent, setJobItemContent] = useState<TJobItemContent | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState(false);
//   const activeId = useActiveId();

//   useEffect(() => {
//     if (!activeId) return;

//     const getJobItemContent = async () => {
//       setIsLoading(true);
//       const response = await fetch(
//         `https://bytegrad.com/course-assets/projects/rmtdev/api/data/${activeId}`
//       );

//       const data = await response.json();
//       setJobItemContent(data.jobItem);
//       // console.log(data.jobItem);

//       setIsLoading(false);
//     };
//     getJobItemContent();
//   }, [activeId]);

//   return { activeId, isLoading, jobItemContent };
// };

export const useJobItemContent = () => {
  const activeId = useActiveId();
  const { data, isLoading } = useQuery(
    ["job-item", activeId],
    async () => {
      const response = await fetch(`${BASE_URL}/${activeId}`);

      const data = await response.json();
      return data;
      // console.log(data.jobItem);
    },
    {
      staleTime: 1000 * 60 * 60,
      enabled: !!activeId,
      refetchOnWindowFocus: false,
      retry: false,
      onError: () => {},
    }
  );

  return { data, isLoading };
};

export const useJobList = (searchText: string) => {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);
  const resultCount = jobItems.length;

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

  return [resultCount, jobItemsSliced, isLoading] as const;
};

export const useDebounce = (text: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(text);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(text), delay);

    return () => clearTimeout(timerId);
  }, [text, delay]);

  return debouncedValue;
};
