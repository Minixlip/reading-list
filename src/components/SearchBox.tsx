import type { ChangeEvent } from 'react';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  function handleOnChange(event: ChangeEvent<HTMLInputElement>): void {
    const searchVal = event.target.value.trim();

    console.log(searchVal);
    onChange(searchVal.toLocaleLowerCase());
  }
  return (
    <>
      <label htmlFor="search-input">Search your thing</label>
      <input
        id="search-input"
        type="text"
        value={value}
        placeholder="Search..."
        onChange={(event) => handleOnChange(event)}
      />
      <button
        type="button"
        onClick={() => onChange('')}
      >
        Clear
      </button>
    </>
  );
};

export default SearchBox;
