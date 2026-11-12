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
import GenreSelect from './components/GenreSelect';
import PagesOnlyToggle from './components/PagesOnlyToggle';
import type { FormValues } from './lib/validate';
import BookForm from './components/BookForm';

function App() {
  const [books, setBooks] = useState<Book[]>(BOOKS);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [pages, setPages] = useState(false);

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
    )
    .filter((book) => (genre === '' ? true : book.genre === genre))
    .filter((book) => (pages === true ? book.pages !== undefined : true));

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

  const addBook = (values: FormValues) => {
    setBooks((currentBooks) => {
      const id = Math.max(0, ...currentBooks.map((book) => book.id)) + 1;

      return [...currentBooks, { ...values, id, is_read: false }];
    });
  };

  return (
    <div className="page">
      <Header />
      <Main>
        <div className="filter-bar">
          <SearchBox
            value={search}
            onChange={setSearch}
          />
          <GenreSelect
            value={genre}
            onChange={setGenre}
          />
          <PagesOnlyToggle
            value={pages}
            onChange={setPages}
          />
        </div>
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
        <BookForm onAddBook={addBook} />
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
