import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container">
      <div className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>О платформе English Homework</h2>
            <p>
              English Homework — это инновационная платформа для изучения английского языка, 
              разработанная специально для русскоязычных студентов. Наша цель — сделать 
              изучение английского языка увлекательным, эффективным и доступным для всех.
            </p>
            
            <h2>Наши возможности</h2>
            <ul className="features-list">
              <li><i className="fas fa-check"></i> Интерактивные тестовые задания</li>
              <li><i className="fas fa-check"></i> Упражнения на перевод текстов</li>
              <li><i className="fas fa-check"></i> Игры для изучения слов (Виселица, Wordle)</li>
              <li><i className="fas fa-check"></i> Адаптивная система обучения</li>
              <li><i className="fas fa-check"></i> Отслеживание прогресса</li>
              <li><i className="fas fa-check"></i> Мобильная версия для обучения в любом месте</li>
            </ul>

            <h2>Как это работает</h2>
            <div className="work-steps">
              <div className="step">
                <div className="step-icon">
                  <i className="fas fa-user-plus"></i>
                </div>
                <h3>Регистрация</h3>
                <p>Создайте аккаунт и начните свой путь изучения английского</p>
              </div>
              
              <div className="step">
                <div className="step-icon">
                  <i className="fas fa-tasks"></i>
                </div>
                <h3>Выбор заданий</h3>
                <p>Выберите тип упражнений, которые соответствуют вашему уровню</p>
              </div>
              
              <div className="step">
                <div className="step-icon">
                  <i className="fas fa-gamepad"></i>
                </div>
                <h3>Игровое обучение</h3>
                <p>Изучайте язык через увлекательные игры и интерактивные задания</p>
              </div>
              
              <div className="step">
                <div className="step-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>Отслеживание прогресса</h3>
                <p>Следите за своими достижениями и улучшайте результаты</p>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <img 
              src="/images/about-image.jpg" 
              alt="English Homework Platform" 
              className="about-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
