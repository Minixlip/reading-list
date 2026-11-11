interface ReadCounterProps {
  readCount: number;
  total: number;
}

const ReadCounter = ({ readCount, total }: ReadCounterProps) => {
  return <p className="result-count">{readCount} of {total} read</p>;
};

export default ReadCounter;
