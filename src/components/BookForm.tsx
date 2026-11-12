import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { FormValues } from '../lib/validate';

interface BookFormProps {
  onAddBook: (values: FormValues) => void;
}

const BookForm = ({ onAddBook }: BookFormProps) => {
  const [values, setValues] = useState<FormValues>({
    title: '',
    author: '',
    genre: '',
  });

  const handleFieldChange =
    (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((curr) => ({ ...curr, [field]: event.target.value }));
    };

  const clearForm = () => {
    setValues({ title: '', author: '', genre: '' });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddBook(values);
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input
        id="title-input"
        type="text"
        value={values.title}
        onChange={handleFieldChange('title')}
      />
      <label htmlFor="author-input">Author</label>
      <input
        id="author-input"
        type="text"
        value={values.author}
        onChange={handleFieldChange('author')}
      />
      <label htmlFor="genre-input">Genre</label>
      <select
        id="genre-input"
        value={values.genre}
        onChange={handleFieldChange('genre')}
      >
        <option value="">Select a genre</option>
        <option value={'sci-fi'}>sci-fi</option>
        <option value={'fantasy'}>fantasy</option>
        <option value={'literary'}>literary</option>
        <option value={'mystery'}>mystery</option>
        <option value={'non-fiction'}>non-fiction</option>
      </select>
      <button type="submit" className="btn">
        Add book
      </button>
      <button type="button" className="btn" onClick={clearForm}>
        Clear
      </button>
    </form>
  );
};

export default BookForm;
