import BookText from './BookText';

interface BookCardProps {
  title: string;
  author: string;
  genre: string;
  isRead: boolean;
}

const BookCard = ({ title, author, genre, isRead }: BookCardProps) => {
  return (
    <li className={`book-card${isRead ? ' is-read' : ''}`}>
      <div className="book-info">
        <BookText title={title} author={author} genre={genre} />
        {isRead && <span className="badge">Read</span>}
      </div>
      <div className="book-actions">
        <button
          type="button"
          className="btn"
          aria-label={`Mark ${title} as ${isRead ? 'unread' : 'read'}`}
        >
          {isRead ? 'Mark unread' : 'Mark read'}
        </button>
        <button type="button" className="btn" aria-label={`Delete ${title}`}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default BookCard;
