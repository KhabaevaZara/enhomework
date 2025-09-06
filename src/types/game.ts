export interface WordItem {
  word: string;
  hint: string;
}

export interface HangmanGameState {
  currentWord: string;
  correctLetters: string[];
  wrongGuessCount: number;
  maxGuesses: number;
  gameOver: boolean;
  isVictory: boolean;
}

export interface WordleGameState {
  currentWord: string;
  guesses: string[];
  currentGuess: string;
  gameOver: boolean;
  isVictory: boolean;
  maxGuesses: number;
}
