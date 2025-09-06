import React, { useState, useEffect } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement real authentication
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const password = form.querySelector('#registerPassword') as HTMLInputElement;
    const repeatPassword = form.querySelector('#registerRepeatPassword') as HTMLInputElement;
    
    if (password && repeatPassword && password.value !== repeatPassword.value) {
      repeatPassword.setCustomValidity('Пароли не совпадают');
      repeatPassword.reportValidity();
      setTimeout(() => repeatPassword.setCustomValidity(''), 1500);
      return;
    }
    
    // TODO: Implement real registration
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" onClick={handleOverlayClick}>
      <div className="modal-content sign-in" style={{ display: isSignUp ? 'none' : 'block' }}>
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">&times;</button>
        <form id="loginForm" onSubmit={handleLoginSubmit}>
          <h2 style={{ color: 'white' }} className="two">Войти</h2>
          
          <div className="input-group">
            <input type="text" id="loginUsername" required /> 
            <label htmlFor="loginUsername">Никнейм</label>
          </div>
          
          <div className="input-group">
            <input type="password" id="loginPassword" required />
            <label htmlFor="loginPassword">Пароль</label>
          </div>
          
          <div className="remember">
            <label style={{ color: 'white' }}>
              <input type="checkbox" /> Запомнить меня
            </label>
          </div>
          
          <button className="registr" type="submit">Войти</button>
          
          <div className="signUp-link">
            <p className="two">У вас нет аккаунта? 
              <button style={{ color: 'white', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }} className="signUpBtn-link" onClick={() => setIsSignUp(true)}>
                Регистрация
              </button>
            </p>
          </div>
        </form>
      </div>
      
      <div className="modal-content sign-up" style={{ display: isSignUp ? 'block' : 'none' }}>
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">&times;</button>
        <form id="registerForm" onSubmit={handleRegisterSubmit}>
          <h2 style={{ color: 'white' }} className="two">Регистрация</h2>
          <br />
          
          <div className="input-group">
            <input type="text" id="registerusername" required />
            <label htmlFor="registerusername">Никнейм</label>
          </div>
         
          <div className="input-group">
            <input type="password" id="registerPassword" required />
            <label htmlFor="registerPassword">Придумайте пароль</label>
          </div>
          
          <div className="input-group">
            <input type="password" id="registerRepeatPassword" required />
            <label htmlFor="registerRepeatPassword">Повторите пароль</label>
          </div>
          
          <div className="remember"></div>
          
          <button className="registr" type="submit">Зарегистрироваться</button>
          
          <div className="signUp-link">
            <p style={{ color: 'white' }} className="two">У Вас уже есть аккаунт?
              <button style={{ color: 'white', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }} className="signInBtn-link" onClick={() => setIsSignUp(false)}>
                Войти
              </button>
            </p>  
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
