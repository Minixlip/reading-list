import type { Book } from '../types/data/Books';
import BookList from './BookList';
import ReadCounter from './ReadCounter';

interface ShelfProps {
  books: Book[];
  readCount: number;
  total: number;
  onToggleRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const Shelf = ({ books, readCount, total, onToggleRead, onDelete }: ShelfProps) => {
  return (
    <>
      <ReadCounter readCount={readCount} total={total} />
      <BookList books={books} onToggleRead={onToggleRead} onDelete={onDelete} />
    </>
  );
};

export default Shelf;
