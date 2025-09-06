import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>English Homework</h3>
            <p>Платформа для изучения английского языка. Интерактивные задания, тесты и игры для эффективного обучения.</p>
            <div className="socials">
              <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><i className="fab fa-whatsapp"></i></button>
              <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><i className="fab fa-telegram"></i></button>
              <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><i className="fab fa-github"></i></button>
            </div>
          </div>
          
          <div className="footer-section links">
            <h3>Быстрые ссылки</h3>
            <ul>
              <li><Link to="/"><i className="fas fa-chevron-right"></i> Главная</Link></li>
              <li><Link to="/about"><i className="fas fa-chevron-right"></i> О платформе</Link></li>
              <li><button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}><i className="fas fa-chevron-right"></i> Контакты</button></li>
              <li><button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => document.getElementById('account')?.scrollIntoView({ behavior: 'smooth' })}><i className="fas fa-chevron-right"></i> Аккаунт</button></li>
            </ul>
          </div>
          
          <div className="footer-section contact" id="contact">
            <h3>Контакты</h3>
            <div className="contact-info">
              <p><i className="fas fa-map-marker-alt"></i> Владикавказ</p>
              <p><i className="fas fa-phone"></i> +7 (909) 476-48-82</p>
              <p><i className="fas fa-envelope"></i> ZaraKhabaeva52@gmail.com</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 English Homework. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
