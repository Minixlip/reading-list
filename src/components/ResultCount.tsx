interface ResultCountProps {
  count: number;
}

const ResultCount = ({ count }: ResultCountProps) => {
  return <p className="result-count">{count} books</p>;
};

export default ResultCount;
