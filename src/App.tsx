import './App.css';
import Main from './home/Main';
import Header from './home/Header';
import Footer from './home/Footer';
import BookCard from './components/BookCard';

function App() {
  return (
    <div className="page">
      <Header />
      <Main>
        <ul className="book-list">
          <BookCard
            title="Dune"
            author="Frank Herbert"
            genre="sci-fi"
            isRead={true}
          />
          <BookCard
            title="Piranesi"
            author="Susanna Clarke"
            genre="fantasy"
            isRead={false}
          />
          <BookCard
            title="Never Let Me Go"
            author="Kazuo Ishiguro"
            genre="literary"
            isRead={false}
          />
        </ul>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
