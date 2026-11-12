export interface FormValues {
  title: string;
  author: string;
  genre: string;
}

export type FormErrors = Partial<Record<keyof FormValues, string>>;

export const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  const { title, author, genre } = values;

  if (!title.trim()) {
    errors.title = 'Title is required.';
  } else if (title.length > 100) {
    errors.title = 'Title must be 100 characters or fewer.';
  }
  if (!author.trim()) {
    errors.author = 'Author is required.';
  }

  if (!genre.trim()) {
    errors.genre = 'Choose a genre.';
  }

  return errors;
};
