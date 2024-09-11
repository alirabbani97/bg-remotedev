import { TJobItem } from "../libs/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type TJobList = { jobItems: TJobItem[]; isLoading: boolean };

export function JobList({ jobItems, isLoading }: TJobList) {
  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {jobItems.map((item) => (
            <JobListItem key={item.id} JobItem={item} />
          ))}
        </>
      )}
    </ul>
  );
}

export default JobList;
