interface ResultCountProps {
  count: number;
  label?: string;
}

const ResultCount = ({ count, label = 'books' }: ResultCountProps) => {
  return <p className="result-count">{count} {label}</p>;
};

export default ResultCount;
