import './App.css';
import { useState } from 'react';
import Main from './home/Main';
import Header from './home/Header';
import Footer from './home/Footer';
import FilterBar from './components/FilterBar';
import Shelf from './components/Shelf';
import { BOOKS } from './data/books';
import type { Book } from './types/data/Books';
import type { StatusFilter } from './types';
import SearchBox from './components/SearchBox';

function App() {
  const [books, setBooks] = useState<Book[]>(BOOKS);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');

  const visibleBooks = books
    .filter(
      (book) =>
        filter === 'all' ||
        (filter === 'read' && book.is_read) ||
        (filter === 'unread' && !book.is_read),
    )
    .filter(
      (book) =>
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search),
    );

  const readCount = books.filter((book) => book.is_read).length;

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
        <SearchBox
          value={search}
          onChange={setSearch}
        />
        <FilterBar
          current={filter}
          onChange={setFilter}
        />
        <button
          type="button"
          className="btn"
          onClick={() => setBooks(BOOKS)}
        >
          Reset shelf
        </button>
        <Shelf
          books={visibleBooks}
          readCount={readCount}
          total={books.length}
          onToggleRead={toggleRead}
          onDelete={deleteBook}
        />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
