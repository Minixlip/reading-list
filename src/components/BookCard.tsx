import BookText from './BookText';

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  genre: string;
  isRead: boolean;
  pages?: number;
  onToggleRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const BookCard = ({
  id,
  title,
  author,
  genre,
  isRead,
  pages,
  onToggleRead,
  onDelete,
}: BookCardProps) => {
  return (
    <li className={`book-card${isRead ? ' is-read' : ''}`}>
      <div className="book-info">
        <BookText title={title} author={author} genre={genre} pages={pages} />
        {isRead && <span className="badge">Read</span>}
      </div>
      <div className="book-actions">
        <button
          type="button"
          className="btn"
          aria-label={`Mark ${title} as ${isRead ? 'unread' : 'read'}`}
          onClick={() => onToggleRead(id)}
        >
          {isRead ? 'Mark unread' : 'Mark read'}
        </button>
        <button
          type="button"
          className="btn"
          aria-label={`Delete ${title}`}
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default BookCard;
