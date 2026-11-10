import type { Book } from '../types/data/Books';
import BookCard from './BookCard';

interface BookListProps {
  books: Book[];
}

const BookList = ({ books }: BookListProps) => {
  return (
    <ul className="book-list">
      {books.length === 0 ? (
        <li className="empty-state">There are no books to show.</li>
      ) : (
        books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            genre={book.genre}
            isRead={book.is_read}
          />
        ))
      )}
    </ul>
  );
};

export default BookList;
