import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { validate } from '../lib/validate';
import type { FormErrors, FormValues } from '../lib/validate';

interface BookFormProps {
  onAddBook: (values: FormValues) => void;
}

const BookForm = ({ onAddBook }: BookFormProps) => {
  const [values, setValues] = useState<FormValues>({
    title: '',
    author: '',
    genre: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleFieldChange =
    (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((curr) => ({ ...curr, [field]: event.target.value }));
    };

  const clearForm = () => {
    setValues({ title: '', author: '', genre: '' });
    setErrors({});
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onAddBook(values);
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="title-input">Title</label>
      <input
        id="title-input"
        type="text"
        value={values.title}
        onChange={handleFieldChange('title')}
        required
        aria-invalid={Boolean(errors.title)}
        aria-describedby={errors.title ? 'title-error' : undefined}
      />
      {errors.title && (
        <p id="title-error" role="alert">
          {errors.title}
        </p>
      )}
      <label htmlFor="author-input">Author</label>
      <input
        id="author-input"
        type="text"
        value={values.author}
        onChange={handleFieldChange('author')}
        required
        aria-invalid={Boolean(errors.author)}
        aria-describedby={errors.author ? 'author-error' : undefined}
      />
      {errors.author && (
        <p id="author-error" role="alert">
          {errors.author}
        </p>
      )}
      <label htmlFor="genre-input">Genre</label>
      <select
        id="genre-input"
        value={values.genre}
        onChange={handleFieldChange('genre')}
        required
        aria-invalid={Boolean(errors.genre)}
        aria-describedby={errors.genre ? 'genre-error' : undefined}
      >
        <option value="">Select a genre</option>
        <option value={'sci-fi'}>sci-fi</option>
        <option value={'fantasy'}>fantasy</option>
        <option value={'literary'}>literary</option>
        <option value={'mystery'}>mystery</option>
        <option value={'non-fiction'}>non-fiction</option>
      </select>
      {errors.genre && (
        <p id="genre-error" role="alert">
          {errors.genre}
        </p>
      )}
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
