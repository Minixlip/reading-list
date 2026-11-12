import type { StatusFilter } from '../types';

interface FilterBarProps {
  current: StatusFilter;
  onChange: (filter: StatusFilter) => void;
}

const FilterBar = ({ current, onChange }: FilterBarProps) => {
  return (
    <fieldset className="filter-bar">
      <legend>Status</legend>
      <label>
        <input
          type="radio"
          name="status"
          value="all"
          checked={current === 'all'}
          onChange={() => onChange('all')}
        />
        All
      </label>
      <label>
        <input
          type="radio"
          name="status"
          value="read"
          checked={current === 'read'}
          onChange={() => onChange('read')}
        />
        Read
      </label>
      <label>
        <input
          type="radio"
          name="status"
          value="unread"
          checked={current === 'unread'}
          onChange={() => onChange('unread')}
        />
        Unread
      </label>
    </fieldset>
  );
};

export default FilterBar;
