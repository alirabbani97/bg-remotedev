import Spinner from "./Spinner";

export default function IsLoadingContent() {
  return (
    <section className="job-details">
      {" "}
      <div>
        <Spinner />
      </div>
    </section>
  );
}
