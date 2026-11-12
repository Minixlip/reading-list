import type { ChangeEvent } from 'react';

interface pagesOnlyToggleProps {
  value: boolean;
  onChange: (checked: boolean) => void;
}

const PagesOnlyToggle = ({ value, onChange }: pagesOnlyToggleProps) => {
  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.checked);

    console.log(value);
  }

  return (
    <>
      <label htmlFor="pages-input">Only books with a page count</label>
      <input
        id="pages-input"
        type="checkbox"
        checked={value}
        onChange={(event) => handleOnChange(event)}
      />
    </>
  );
};

export default PagesOnlyToggle;
