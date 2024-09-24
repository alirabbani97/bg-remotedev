import { useJobItemContent } from "../libs/hooks";
import BookmarkIcon from "./BookmarkIcon";
import IsLoadingContent from "./IsLoadingContent";

export default function JobItemContent({
  handleBookmarkToggle,
  bookmarkIds,
}: {
  bookmarkIds: number[];
  handleBookmarkToggle: (id: number) => void;
}) {
  const { isLoading, jobItemContent } = useJobItemContent();

  if (isLoading) {
    return <IsLoadingContent />;
  }
  if (!jobItemContent) {
    return <EmptyJobContent />;
  }

  return (
    <section className="job-details">
      {" "}
      <div>
        {/* {isLoading ? (
          <Spinner />
        ) : ( */}
        <>
          <img src={jobItemContent?.coverImgURL} alt="#" />

          <a
            className="apply-btn"
            href={jobItemContent?.companyURL}
            target="_blank"
          >
            Apply
          </a>

          <section className="job-info">
            <div className="job-info__left">
              <div className="job-info__badge">
                {jobItemContent?.badgeLetters}
              </div>
              <div className="job-info__below-badge">
                <time className="job-info__time">
                  {jobItemContent?.daysAgo}d ago
                </time>

                <BookmarkIcon
                  onBookmarkToggle={handleBookmarkToggle}
                  id={jobItemContent.id}
                  isBookmarked={bookmarkIds.includes(jobItemContent.id)}
                />
              </div>
            </div>

            <div className="job-info__right">
              <h2 className="second-heading">{jobItemContent?.title}</h2>
              <p className="job-info__company">{jobItemContent?.company}</p>
              <p className="job-info__description">
                {jobItemContent?.description}
              </p>
              <div className="job-info__extras">
                <p className="job-info__extra">
                  <i className="fa-solid fa-clock job-info__extra-icon"></i>
                  {jobItemContent?.duration}
                </p>
                <p className="job-info__extra">
                  <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                  {jobItemContent?.salary}
                </p>
                <p className="job-info__extra">
                  <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
                  {jobItemContent?.location}
                </p>
              </div>
            </div>
          </section>

          <div className="job-details__other">
            <section className="qualifications">
              <div className="qualifications__left">
                <h4 className="fourth-heading">Qualifications</h4>
                <p className="qualifications__sub-text">
                  Other qualifications may apply
                </p>
              </div>
              <ul className="qualifications__list">
                {jobItemContent?.qualifications.map((item) => (
                  <li key={item} className="qualifications__item">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="reviews">
              <div className="reviews__left">
                <h4 className="fourth-heading">Company reviews</h4>
                <p className="reviews__sub-text">
                  Recent things people are saying
                </p>
              </div>
              <ul className="reviews__list">
                {jobItemContent?.reviews.map((item) => (
                  <li key={item} className="reviews__item">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <footer className="job-details__footer">
            <p className="job-details__footer-text">
              If possible, please reference that you found the job on{" "}
              <span className="u-bold">rmtDev</span>, we would really appreciate
              it!
            </p>
          </footer>
        </>
        {/* )} */}
      </div>
    </section>
  );
}

function EmptyJobContent() {
  return (
    <section className="job-details">
      <div>
        <div className="job-details__start-view">
          <p>What are you looking for?</p>
          <p>
            Start by searching for any technology your ideal job is working with
          </p>
        </div>
      </div>
    </section>
  );
}
