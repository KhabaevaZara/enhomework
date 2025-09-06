import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TranslationPhase {
  id: number;
  title: string;
  description: string;
  content: string;
  placeholder: string;
}

const Translate: React.FC = () => {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [originalText, setOriginalText] = useState('');
  const [translation, setTranslation] = useState('');
  const [audience, setAudience] = useState('');
  const [missionCompleted, setMissionCompleted] = useState(false);

  const phases: TranslationPhase[] = [
    {
      id: 1,
      title: 'Исходный текст',
      description: 'Введите текст, который нужно перевести',
      content: '',
      placeholder: 'Введите текст для перевода...'
    },
    {
      id: 2,
      title: 'Выбор аудитории',
      description: 'Выберите целевую аудиторию для перевода',
      content: '',
      placeholder: ''
    },
    {
      id: 3,
      title: 'Перевод',
      description: 'Переведите текст с учетом выбранной аудитории',
      content: '',
      placeholder: 'Введите ваш перевод...'
    }
  ];

  const audiences = [
    {
      title: 'Дети',
      description: 'Простой язык, короткие предложения',
      icon: 'fas fa-child'
    },
    {
      title: 'Подростки',
      description: 'Современный язык, неформальный стиль',
      icon: 'fas fa-user-graduate'
    },
    {
      title: 'Взрослые',
      description: 'Формальный стиль, сложные конструкции',
      icon: 'fas fa-user-tie'
    },
    {
      title: 'Профессионалы',
      description: 'Техническая терминология, точность',
      icon: 'fas fa-briefcase'
    }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handlePhaseComplete = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
    } else {
      setMissionCompleted(true);
    }
  };

  const handleNewMission = () => {
    setCurrentPhase(0);
    setOriginalText('');
    setTranslation('');
    setAudience('');
    setMissionCompleted(false);
  };

  const renderPhase1 = () => (
    <div className="phase active">
      <div className="phase-title">
        <div className="phase-number">1</div>
        <h2>{phases[0].title}</h2>
      </div>
      
      <div className="hint">
        <strong>Подсказка:</strong> Введите текст на английском языке, который вы хотите перевести на русский.
      </div>

      <label htmlFor="originalText">Исходный текст:</label>
      <textarea
        id="originalText"
        value={originalText}
        onChange={(e) => setOriginalText(e.target.value)}
        placeholder={phases[0].placeholder}
        rows={6}
      />

      <button 
        className="complete-phase" 
        onClick={handlePhaseComplete}
        disabled={!originalText.trim()}
      >
        Продолжить
      </button>
    </div>
  );

  const renderPhase2 = () => (
    <div className="phase active">
      <div className="phase-title">
        <div className="phase-number">2</div>
        <h2>{phases[1].title}</h2>
      </div>
      
      <div className="hint">
        <strong>Подсказка:</strong> Выберите целевую аудиторию для вашего перевода. Это поможет адаптировать стиль и сложность языка.
      </div>

      <div className="audience-selector">
        {audiences.map((aud, index) => (
          <div
            key={index}
            className={`audience-option ${audience === aud.title ? 'selected' : ''}`}
            onClick={() => setAudience(aud.title)}
          >
            <div className="audience-title">
              <i className={aud.icon}></i>
              {aud.title}
            </div>
            <div className="audience-desc">{aud.description}</div>
          </div>
        ))}
      </div>

      <button 
        className="complete-phase" 
        onClick={handlePhaseComplete}
        disabled={!audience}
      >
        Продолжить
      </button>
    </div>
  );

  const renderPhase3 = () => (
    <div className="phase active">
      <div className="phase-title">
        <div className="phase-number">3</div>
        <h2>{phases[2].title}</h2>
      </div>
      
      <div className="hint">
        <strong>Подсказка:</strong> Переведите текст с учетом выбранной аудитории ({audience}). Используйте подходящий стиль и уровень сложности.
      </div>

      <div className="source-text-section">
        <h2><i className="fas fa-file-text"></i> Исходный текст</h2>
        <div className="text-container">
          <div className="original-text">{originalText}</div>
        </div>
      </div>

      <label htmlFor="translation">Ваш перевод:</label>
      <textarea
        id="translation"
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
        placeholder={phases[2].placeholder}
        rows={6}
      />

      <button 
        className="complete-phase" 
        onClick={handlePhaseComplete}
        disabled={!translation.trim()}
      >
        Завершить задание
      </button>
    </div>
  );

  if (missionCompleted) {
    return (
      <div className="container">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> Назад
        </button>

        <div className="completed-message">
          <h2>Задание выполнено!</h2>
          <p>Вы успешно перевели текст для аудитории: <strong>{audience}</strong></p>
          <p>Отличная работа! Продолжайте практиковаться.</p>
          
          <div className="buttons">
            <button className="btn" onClick={handleNewMission}>
              Новое задание
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="back-button" onClick={handleBack}>
        <i className="fas fa-arrow-left"></i> Назад
      </button>

      <div className="mission-header">
        <h1 className="mission-title">
          <i className="fas fa-language"></i> Перевод текста
        </h1>
        <p className="mission-subtitle">
          Практикуйтесь в переводе с английского на русский. Выберите аудиторию и адаптируйте стиль перевода.
        </p>
      </div>

      <div className="progress-tracker">
        {phases.map((phase, index) => (
          <div 
            key={phase.id} 
            className={`progress-step ${index <= currentPhase ? 'active' : ''}`}
          >
            {phase.id}
          </div>
        ))}
      </div>

      {currentPhase === 0 && renderPhase1()}
      {currentPhase === 1 && renderPhase2()}
      {currentPhase === 2 && renderPhase3()}
    </div>
  );
};

export default Translate;
