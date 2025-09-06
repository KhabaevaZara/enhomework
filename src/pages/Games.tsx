import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const Games: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <button className="back-button" onClick={handleBack}>
        <i className="fas fa-arrow-left"></i> Назад
      </button>

      <header>
        <h1><i className="fas fa-gamepad"></i> Игры для изучения английского</h1>
        <p>Выберите игру, чтобы попрактиковать английский язык в увлекательной форме</p>
      </header>
      
      <div className="card-container">
        <Card
          icon="fas fa-question"
          title="Викторина"
          titleIcon="fas fa-check-double"
          description="Проверьте свои знания английского в увлекательной викторине с вопросами разной сложности"
          link="/quiz"
          linkText="Начать играть"
          assignment="test"
        />

        <Card
          icon="fas fa-ghost"
          title="Виселица"
          titleIcon="fas fa-redo"
          description="Угадайте слово по буквам, прежде чем будет нарисована виселица - классическая игра для изучения слов"
          link="/hangman"
          linkText="Начать играть"
          assignment="translation"
        />
        
        <Card
          icon="fas fa-puzzle-piece"
          title="Игра слов"
          titleIcon="fas fa-font"
          description="Составляйте слова из предложенных букв, расширяйте свой словарный запас"
          link="#"
          linkText="Начать играть"
          assignment="fill-in"
        />

        <Card
          icon="fas fa-font"
          title="Wordle"
          titleIcon="fas fa-keyboard"
          description="Угадайте слово за 6 попыток. Каждая попытка покажет, какие буквы правильные"
          link="/wordle"
          linkText="Начать играть"
          assignment="fill-in"
        />
      </div>
    </div>
  );
};

export default Games;
