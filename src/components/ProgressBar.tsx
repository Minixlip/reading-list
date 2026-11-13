interface ProgressBarProps {
  pagesRead: number;
  totalPages: number;
}

const calculatePercentage = (pagesRead: number, totalPages: number): number => {
  if (totalPages <= 0) return 0;

  return Math.min(100, Math.max(0, Math.round((pagesRead / totalPages) * 100)));
};

const ProgressBar = ({ pagesRead, totalPages }: ProgressBarProps) => {
  const percentage = calculatePercentage(pagesRead, totalPages);

  return (
    <>
      <progress
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        value={percentage}
        max={100}
      />
      <span>{percentage}%</span>
    </>
  );
};

export default ProgressBar;
