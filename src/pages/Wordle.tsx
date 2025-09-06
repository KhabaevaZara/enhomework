import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WordleGameState } from '../types/game';
import { wordleWords } from '../utils/wordList';

const Wordle: React.FC = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<WordleGameState>({
    currentWord: '',
    guesses: [],
    currentGuess: '',
    gameOver: false,
    isVictory: false,
    maxGuesses: 6
  });

  const getRandomWord = () => {
    const randomWord = wordleWords[Math.floor(Math.random() * wordleWords.length)];
    setGameState({
      currentWord: randomWord,
      guesses: [],
      currentGuess: '',
      gameOver: false,
      isVictory: false,
      maxGuesses: 6
    });
  };

  useEffect(() => {
    getRandomWord();
  }, []);

  const handleKeyPress = (key: string) => {
    if (gameState.gameOver) return;

    if (key === 'ENTER') {
      if (gameState.currentGuess.length === 5) {
        const newGuesses = [...gameState.guesses, gameState.currentGuess];
        const isVictory = gameState.currentGuess === gameState.currentWord;
        const gameOver = newGuesses.length >= gameState.maxGuesses || isVictory;

        setGameState({
          ...gameState,
          guesses: newGuesses,
          currentGuess: '',
          gameOver,
          isVictory
        });
      }
    } else if (key === 'BACKSPACE') {
      setGameState({
        ...gameState,
        currentGuess: gameState.currentGuess.slice(0, -1)
      });
    } else if (key.length === 1 && gameState.currentGuess.length < 5) {
      setGameState({
        ...gameState,
        currentGuess: gameState.currentGuess + key.toLowerCase()
      });
    }
  };

  const getTileClass = (letter: string, index: number, guess: string) => {
    if (gameState.currentWord[index] === letter) {
      return 'correct';
    } else if (gameState.currentWord.includes(letter)) {
      return 'present';
    } else {
      return 'absent';
    }
  };

  const renderBoard = () => {
    const tiles = [];
    
    // Render previous guesses
    gameState.guesses.forEach((guess, guessIndex) => {
      for (let i = 0; i < 5; i++) {
        tiles.push(
          <div key={`${guessIndex}-${i}`} className={`tile ${getTileClass(guess[i], i, guess)}`}>
            {guess[i]}
          </div>
        );
      }
    });

    // Render current guess
    if (!gameState.gameOver) {
      for (let i = 0; i < 5; i++) {
        tiles.push(
          <div key={`current-${i}`} className="tile">
            {gameState.currentGuess[i] || ''}
          </div>
        );
      }
    }

    // Render empty tiles for remaining guesses
    const remainingGuesses = gameState.maxGuesses - gameState.guesses.length - (gameState.gameOver ? 0 : 1);
    for (let guessIndex = 0; guessIndex < remainingGuesses; guessIndex++) {
      for (let i = 0; i < 5; i++) {
        tiles.push(
          <div key={`empty-${gameState.guesses.length + guessIndex}-${i}`} className="tile">
          </div>
        );
      }
    }

    return tiles;
  };

  const renderKeyboard = () => {
    const rows = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['ENTER', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'BACKSPACE']
    ];

    return rows.map((row, rowIndex) => (
      <div key={rowIndex} className="keyboard-row">
        {row.map(key => (
          <div
            key={key}
            className={key === 'ENTER' || key === 'BACKSPACE' ? 'enter-key-tile' : 'key-tile'}
            onClick={() => handleKeyPress(key)}
          >
            {key === 'BACKSPACE' ? '⌫' : key}
          </div>
        ))}
      </div>
    ));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <button className="back-button" onClick={handleBack}>
        <i className="fas fa-arrow-left"></i> Назад
      </button>

      <div className="gamecontainer">
        <div className="wordle-game-wrapper">
          <h1 id="title">WORDLE</h1>
          <hr />
          
          <div id="board">
            {renderBoard()}
          </div>

          <div className="keyboard-container">
            {renderKeyboard()}
          </div>

          <div className="game-controls">
            <button className="btn" onClick={getRandomWord}>
              Новая игра
            </button>
          </div>

          {gameState.gameOver && (
            <div id="answer">
              {gameState.isVictory ? 'Поздравляем! Вы угадали слово!' : `Правильное слово: ${gameState.currentWord}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wordle;
