interface BookTextProps {
  title: string;
  author: string;
  genre: string;
}

const BookText = ({ title, author, genre }: BookTextProps) => {
  return (
    <>
      <h3>{title}</h3>
      <p className="book-meta">{author} · {genre}</p>
    </>
  );
};

export default BookText;
