import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Test: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'cards' | 'test' | 'match'>('cards');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [testAnswer, setTestAnswer] = useState('');
  const [testFeedback, setTestFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const words = [
    { english: 'apple', russian: 'яблоко', transcription: '/ˈæpəl/' },
    { english: 'house', russian: 'дом', transcription: '/haʊs/' },
    { english: 'water', russian: 'вода', transcription: '/ˈwɔːtər/' },
    { english: 'happy', russian: 'счастливый', transcription: '/ˈhæpi/' },
    { english: 'music', russian: 'музыка', transcription: '/ˈmjuːzɪk/' },
    { english: 'dream', russian: 'мечта', transcription: '/driːm/' },
    { english: 'light', russian: 'свет', transcription: '/laɪt/' },
    { english: 'peace', russian: 'мир', transcription: '/piːs/' },
    { english: 'smile', russian: 'улыбка', transcription: '/smaɪl/' },
    { english: 'heart', russian: 'сердце', transcription: '/hɑːrt/' }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleModeChange = (newMode: 'cards' | 'test' | 'match') => {
    setMode(newMode);
    setCurrentWordIndex(0);
    setTestAnswer('');
    setTestFeedback('');
    setShowFeedback(false);
    setCorrectAnswers(0);
    setTotalQuestions(0);
  };

  const handleCardFlip = () => {
    // Card flip logic would be implemented here
  };

  const handleNextCard = () => {
    setCurrentWordIndex((prev) => (prev + 1) % words.length);
  };

  const handlePreviousCard = () => {
    setCurrentWordIndex((prev) => (prev - 1 + words.length) % words.length);
  };

  const handleTestSubmit = () => {
    const currentWord = words[currentWordIndex];
    const isCorrect = testAnswer.toLowerCase().trim() === currentWord.russian.toLowerCase();
    
    setTestFeedback(isCorrect ? 'Правильно!' : `Неправильно! Правильный ответ: ${currentWord.russian}`);
    setShowFeedback(true);
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    setTotalQuestions(prev => prev + 1);
  };

  const handleNextTest = () => {
    setCurrentWordIndex((prev) => (prev + 1) % words.length);
    setTestAnswer('');
    setTestFeedback('');
    setShowFeedback(false);
  };

  const renderCardsMode = () => (
    <div className="word-card active">
      <div className="card-inner">
        <div className="card-front">
          <h2>{words[currentWordIndex].english}</h2>
          <p className="transcription">{words[currentWordIndex].transcription}</p>
          <button className="btn flip-btn" onClick={handleCardFlip}>
            Показать перевод
          </button>
        </div>
        <div className="card-back">
          <h2>{words[currentWordIndex].russian}</h2>
          <button className="btn flip-btn" onClick={handleCardFlip}>
            Показать слово
          </button>
        </div>
      </div>
      
      <div className="card-controls">
        <button className="btn" onClick={handlePreviousCard}>
          Предыдущее
        </button>
        <button className="btn" onClick={handleNextCard}>
          Следующее
        </button>
      </div>
    </div>
  );

  const renderTestMode = () => (
    <div className="test-mode active">
      <h2>Переведите слово на русский:</h2>
      <div className="test-word">{words[currentWordIndex].english}</div>
      
      <input
        type="text"
        id="testAnswer"
        value={testAnswer}
        onChange={(e) => setTestAnswer(e.target.value)}
        placeholder="Введите перевод..."
      />
      
      {showFeedback && (
        <div className={`test-feedback ${testFeedback.includes('Правильно') ? 'correct' : 'error'}`}>
          {testFeedback}
        </div>
      )}
      
      <div className="test-controls">
        {!showFeedback ? (
          <button className="btn" onClick={handleTestSubmit}>
            Проверить
          </button>
        ) : (
          <button className="btn" onClick={handleNextTest}>
            Следующее слово
          </button>
        )}
      </div>
    </div>
  );

  const renderMatchMode = () => (
    <div className="match-mode active">
      <h2>Сопоставьте слова:</h2>
      <div className="match-container">
        <div className="english-words">
          <h3>Английские слова</h3>
          {words.slice(0, 5).map((word, index) => (
            <div key={index} className="match-item">
              {word.english}
            </div>
          ))}
        </div>
        <div className="russian-words">
          <h3>Русские слова</h3>
          {words.slice(0, 5).map((word, index) => (
            <div key={index} className="match-item">
              {word.russian}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <button className="back-button" onClick={handleBack}>
        <i className="fas fa-arrow-left"></i> Назад
      </button>

      <header>
        <h1><i className="fas fa-graduation-cap"></i> Тест слов</h1>
        <p>Выберите режим изучения английских слов</p>
      </header>

      <div className="mode-selection">
        <h2>Выберите режим:</h2>
        <div className="mode-buttons">
          <button 
            className={`mode-btn ${mode === 'cards' ? 'active' : ''}`}
            onClick={() => handleModeChange('cards')}
          >
            Карточки
          </button>
          <button 
            className={`mode-btn ${mode === 'test' ? 'active' : ''}`}
            onClick={() => handleModeChange('test')}
          >
            Тест
          </button>
          <button 
            className={`mode-btn ${mode === 'match' ? 'active' : ''}`}
            onClick={() => handleModeChange('match')}
          >
            Сопоставление
          </button>
        </div>
      </div>

      {mode === 'cards' && renderCardsMode()}
      {mode === 'test' && renderTestMode()}
      {mode === 'match' && renderMatchMode()}

      {totalQuestions > 0 && (
        <div className="progress-section">
          <div className="progress-info">
            <span>Правильных ответов: {correctAnswers}</span>
            <span>Всего вопросов: {totalQuestions}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(correctAnswers / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
