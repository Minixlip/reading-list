import type { StatusFilter } from '../types';

interface FilterBarProps {
  current: StatusFilter;
  onChange: (filter: StatusFilter) => void;
}

const FilterBar = ({ current, onChange }: FilterBarProps) => {
  return (
    <div className="filter-bar" role="group" aria-label="Filter books by read status">
      <button
        type="button"
        className={`btn${current === 'all' ? ' is-active' : ''}`}
        aria-pressed={current === 'all'}
        onClick={() => onChange('all')}
      >
        All
      </button>
      <button
        type="button"
        className={`btn${current === 'read' ? ' is-active' : ''}`}
        aria-pressed={current === 'read'}
        onClick={() => onChange('read')}
      >
        Read
      </button>
      <button
        type="button"
        className={`btn${current === 'unread' ? ' is-active' : ''}`}
        aria-pressed={current === 'unread'}
        onClick={() => onChange('unread')}
      >
        Unread
      </button>
    </div>
  );
};

export default FilterBar;
