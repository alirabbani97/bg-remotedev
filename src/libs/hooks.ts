import { useState, useEffect } from "react";
import { TJobItem } from "./types";

export const useSearchFetch = (searchText: string) => {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);
  useEffect(() => {
    if (!searchText) return;

    const search = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );

      const data = await response.json();
      setJobItems(data.jobItems);
      console.log(data.jobItems);

      setIsLoading(false);
    };
    search();
  }, [searchText]);

  return [jobItemsSliced, isLoading] as const;
};
