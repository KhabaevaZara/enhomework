import React from 'react';
import Card from '../components/Card';

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="card-container">
        <Card
          icon="fas fa-question-circle"
          title="Тестовые задания"
          titleIcon="fas fa-check-circle"
          description="Проверьте свои знания с помощью тестовых заданий. Выберите правильный вариант ответа из предложенных. В конце вы узнаете свой результат."
          link="/test"
          linkText="Начать тест"
          assignment="test"
        />

        <Card
          icon="fas fa-language"
          title="Перевод текста"
          titleIcon="fas fa-exchange-alt"
          description="Попрактикуйтесь в переводе текстов с английского на русский и наоборот. Это поможет вам улучшить навыки понимания и перевода."
          link="/translate"
          linkText="Начать перевод"
          assignment="translation"
        />
        
        <Card
          icon="fas fa-pencil-alt"
          title="Подстановка слов"
          titleIcon="fas fa-tasks"
          description="Вставьте пропущенные слова в предложения. Это упражнение поможет вам улучшить понимание грамматики и лексики."
          link="#"
          linkText="Начать упражнение"
          assignment="fill-in"
        />

        <Card
          icon="fas fa-gamepad"
          title="Игры"
          titleIcon="fas fa-dice"
          description="Изучайте английский язык в игровой форме. Интерактивные игры помогут закрепить знания в увлекательной форме."
          link="/games"
          linkText="Начать игру"
          assignment="game"
        />
      </div>
    </div>
  );
};

export default Home;
