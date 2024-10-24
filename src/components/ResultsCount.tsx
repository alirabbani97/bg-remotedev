import { useJobItemsContext } from "../libs/hooks";

export default function ResultsCount() {
  const { resultCount } = useJobItemsContext();

  return <p className="count">{resultCount} results</p>;
}
