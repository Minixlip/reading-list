import './App.css';
import Main from './home/Main';
import Header from './home/Header';
import Footer from './home/Footer';
import BookList from './components/BookList';
import ResultCount from './components/ResultCount';
import { BOOKS } from './data/books';

function App() {
  const unreadBooks = BOOKS.filter((book) => !book.is_read);
  const readBooks = BOOKS.filter((book) => book.is_read);

  return (
    <div className="page">
      <Header />
      <Main>
        <ResultCount count={BOOKS.length} />
        <BookList books={unreadBooks} heading="Unread" />
        <BookList books={readBooks} heading="Read" />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
