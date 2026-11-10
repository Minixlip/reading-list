interface BookTextProps {
  title: string;
  author: string;
  genre: string;
  pages?: number;
}

const BookText = ({ title, author, genre, pages }: BookTextProps) => {
  return (
    <>
      <h3>{title}</h3>
      <p className="book-meta">
        {author} · {genre}
        {pages !== undefined && ` · ${pages} pages`}
      </p>
    </>
  );
};

export default BookText;
