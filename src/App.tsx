import './App.css';
import { useState } from 'react';
import Main from './home/Main';
import Header from './home/Header';
import Footer from './home/Footer';
import BookList from './components/BookList';
import ResultCount from './components/ResultCount';
import { BOOKS } from './data/books';
import type { Book } from './types/data/Books';

function App() {
  const [books, setBooks] = useState<Book[]>(BOOKS);
  const unreadBooks = books.filter((book) => !book.is_read);
  const readBooks = books.filter((book) => book.is_read);

  const toggleRead = (id: number) => {
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === id ? { ...book, is_read: !book.is_read } : book,
      ),
    );
  };

  const deleteBook = (id: number) => {
    setBooks((currentBooks) => currentBooks.filter((book) => book.id !== id));
  };

  return (
    <div className="page">
      <Header />
      <Main>
        <ResultCount count={books.length} />
        <button type="button" className="btn" onClick={() => setBooks(BOOKS)}>
          Reset shelf
        </button>
        <BookList
          books={unreadBooks}
          heading="Unread"
          onToggleRead={toggleRead}
          onDelete={deleteBook}
        />
        <BookList
          books={readBooks}
          heading="Read"
          onToggleRead={toggleRead}
          onDelete={deleteBook}
        />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
