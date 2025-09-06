import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HangmanGameState } from '../types/game';
import { wordList } from '../utils/wordList';

const Hangman: React.FC = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<HangmanGameState>({
    currentWord: '',
    correctLetters: [],
    wrongGuessCount: 0,
    maxGuesses: 6,
    gameOver: false,
    isVictory: false
  });
  const [currentHint, setCurrentHint] = useState('');

  const getRandomWord = () => {
    const randomItem = wordList[Math.floor(Math.random() * wordList.length)];
    setGameState({
      currentWord: randomItem.word,
      correctLetters: [],
      wrongGuessCount: 0,
      maxGuesses: 6,
      gameOver: false,
      isVictory: false
    });
    setCurrentHint(randomItem.hint);
  };

  useEffect(() => {
    getRandomWord();
  }, []);

  const handleLetterClick = (letter: string) => {
    if (gameState.gameOver || gameState.correctLetters.includes(letter)) return;

    const newCorrectLetters = [...gameState.correctLetters];
    let newWrongGuessCount = gameState.wrongGuessCount;

    if (gameState.currentWord.includes(letter)) {
      newCorrectLetters.push(letter);
    } else {
      newWrongGuessCount++;
    }

    const isVictory = newCorrectLetters.length === gameState.currentWord.length;
    const gameOver = newWrongGuessCount >= gameState.maxGuesses || isVictory;

    setGameState({
      ...gameState,
      correctLetters: newCorrectLetters,
      wrongGuessCount: newWrongGuessCount,
      gameOver,
      isVictory
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const renderWord = () => {
    return gameState.currentWord.split('').map((letter, index) => (
      <li key={index} className={`letter ${gameState.correctLetters.includes(letter) ? 'guessed' : ''}`}>
        {gameState.correctLetters.includes(letter) ? letter : ''}
      </li>
    ));
  };

  const renderKeyboard = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet.split('').map(letter => (
      <button
        key={letter}
        onClick={() => handleLetterClick(letter)}
        disabled={gameState.correctLetters.includes(letter) || gameState.gameOver}
      >
        {letter}
      </button>
    ));
  };

  return (
    <div className="container">
      <button className="back-button" onClick={handleBack}>
        <i className="fas fa-arrow-left"></i> Назад
      </button>

      <div className="game-container">
        <div className="hangman-box">
          <img 
            src={`/images/hangman/hangman-${gameState.wrongGuessCount}.svg`} 
            alt={`Hangman ${gameState.wrongGuessCount}`}
          />
          <h6>Виселица</h6>
        </div>

        <div className="game-box">
          <h6>Подсказка: <b>{currentHint}</b></h6>
          
          <ul className="word-display">
            {renderWord()}
          </ul>

          <h6>Попытки: <b className="guesses-text">{gameState.wrongGuessCount}/{gameState.maxGuesses}</b></h6>

          <div className="keyboard">
            {renderKeyboard()}
          </div>

          <button className="btn" onClick={getRandomWord} style={{ marginTop: '20px' }}>
            Новая игра
          </button>
        </div>
      </div>

      {/* Game Over Modal */}
      {gameState.gameOver && (
        <div className="game-modal show">
          <div className="content">
            <img 
              src={`/images/hangman/${gameState.isVictory ? 'victory' : 'lost'}.gif`} 
              alt={gameState.isVictory ? 'Victory' : 'Game Over'}
            />
            <h6>{gameState.isVictory ? 'Поздравляем!' : 'Игра окончена!'}</h6>
            <p>
              {gameState.isVictory ? 'Вы угадали слово:' : 'Правильное слово было:'} 
              <b> {gameState.currentWord}</b>
            </p>
            <button className="btn" onClick={getRandomWord}>
              Играть снова
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hangman;
