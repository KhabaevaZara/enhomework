import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Games from './pages/Games';
import Hangman from './pages/Hangman';
import Wordle from './pages/Wordle';
import Quiz from './pages/Quiz';
import Test from './pages/Test';
import Translate from './pages/Translate';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/games" element={<Games />} />
            <Route path="/hangman" element={<Hangman />} />
            <Route path="/wordle" element={<Wordle />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/test" element={<Test />} />
            <Route path="/translate" element={<Translate />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
