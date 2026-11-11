import type { Book } from '../types/data/Books';
import BookCard from './BookCard';
import ResultCount from './ResultCount';

interface BookListProps {
  books: Book[];
  heading?: string;
  onToggleRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const BookList = ({ books, heading, onToggleRead, onDelete }: BookListProps) => {
  return (
    <section>
      {heading !== undefined && <h2>{heading}</h2>}
      <ResultCount count={books.length} />
      <ul className="book-list">
        {books.length === 0 ? (
          <li className="empty-state">There are no books to show.</li>
        ) : (
          books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              genre={book.genre}
              isRead={book.is_read}
              pages={book.pages}
              onToggleRead={onToggleRead}
              onDelete={onDelete}
            />
          ))
        )}
      </ul>
    </section>
  );
};

export default BookList;
