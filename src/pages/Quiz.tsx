import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the capital of England?",
      options: ["London", "Manchester", "Birmingham", "Liverpool"],
      correct: 0,
      explanation: "London is the capital and largest city of England and the United Kingdom."
    },
    {
      id: 2,
      question: "Which of the following is a fruit?",
      options: ["Carrot", "Apple", "Potato", "Onion"],
      correct: 1,
      explanation: "Apple is a fruit, while the others are vegetables."
    },
    {
      id: 3,
      question: "What is the past tense of 'go'?",
      options: ["goed", "went", "gone", "going"],
      correct: 1,
      explanation: "The past tense of 'go' is 'went'."
    },
    {
      id: 4,
      question: "Which word means 'very big'?",
      options: ["small", "tiny", "huge", "little"],
      correct: 2,
      explanation: "'Huge' means very big or enormous."
    },
    {
      id: 5,
      question: "What is the opposite of 'hot'?",
      options: ["warm", "cool", "cold", "both cool and cold"],
      correct: 3,
      explanation: "Both 'cool' and 'cold' are opposites of 'hot', with 'cold' being the stronger opposite."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (quizCompleted) {
    return (
      <div className="container">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> Назад
        </button>

        <div className="completed-message">
          <h2>Викторина завершена!</h2>
          <p>Ваш результат: {score} из {questions.length}</p>
          <p>Процент правильных ответов: {Math.round((score / questions.length) * 100)}%</p>
          <button className="btn" onClick={handleRestart}>
            Пройти снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="back-button" onClick={handleBack}>
        <i className="fas fa-arrow-left"></i> Назад
      </button>

      <header>
        <h1><i className="fas fa-question-circle"></i> Викторина по английскому</h1>
        <p>Вопрос {currentQuestion + 1} из {questions.length}</p>
      </header>

      <div className="f-word">
        <h2>{questions[currentQuestion].question}</h2>
        
        <div className="quiz-options">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${selectedAnswer === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
            >
              {option}
            </button>
          ))}
        </div>

        {!showResult ? (
          <button 
            className="btn" 
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            style={{ marginTop: '20px' }}
          >
            Ответить
          </button>
        ) : (
          <div className="quiz-result">
            <div className={`result-message ${selectedAnswer === questions[currentQuestion].correct ? 'correct' : 'incorrect'}`}>
              {selectedAnswer === questions[currentQuestion].correct ? 'Правильно!' : 'Неправильно!'}
            </div>
            <p className="explanation">{questions[currentQuestion].explanation}</p>
            <button className="btn" onClick={handleNextQuestion}>
              {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Завершить'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
