import { TJobItem } from "../libs/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type TJobList = { jobItemsSliced: TJobItem[]; isLoading: boolean };
export function JobList({ jobItemsSliced, isLoading }: TJobList) {
  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {jobItemsSliced.map((item) => (
            <JobListItem key={item.id} JobItem={item} />
          ))}
        </>
      )}
    </ul>
  );
}

export default JobList;
