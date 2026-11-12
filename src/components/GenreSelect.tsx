import type { ChangeEvent } from 'react';

interface GenreSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const GenreSelect = ({ value, onChange }: GenreSelectProps) => {
  function handleOnChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedGenre = event.target.value;

    onChange(selectedGenre);

    console.log(selectedGenre);
  }

  return (
    <>
      <label>Select a genre</label>
      <select
        defaultValue={value}
        onChange={(event) => handleOnChange(event)}
      >
        <option value={''}>All genres</option>
        <option value={'sci-fi'}>sci-fi</option>
        <option value={'fantasy'}>fantasy</option>
        <option value={'literary'}>literary</option>
        <option value={'mystery'}>mystery</option>
        <option value={'non-fiction'}>non-fiction</option>
      </select>
    </>
  );
};

export default GenreSelect;
