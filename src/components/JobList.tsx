import { TJobItem } from "../libs/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type TJobList = {
  jobItemsSliced: TJobItem[];
  isLoading: boolean;
  bookmarkIds: number[];
  handleBookmarkToggle: (id: number) => void;
};
export function JobList({
  jobItemsSliced,
  isLoading,
  bookmarkIds,
  handleBookmarkToggle,
}: TJobList) {
  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {jobItemsSliced.map((item) => (
            <JobListItem
              key={item.id}
              JobItem={item}
              isBookmarked={bookmarkIds.includes(item.id)}
              handleBookmarkToggle={handleBookmarkToggle}
            />
          ))}
        </>
      )}
    </ul>
  );
}

export default JobList;
