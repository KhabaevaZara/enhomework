import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container">
          <div className="nav-row">
            <Link to="/" className="logo" onClick={closeMenu}>
              <i className="fas fa-book-open"></i>
              <strong>English Homework</strong>
            </Link>
                
            <div className="contener">
              <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`} id="navMenu">
                <li className="nav-list__item">
                  <Link to="/" className="nav-list__link" onClick={closeMenu}>Главная</Link>
                </li>    
                <li className="nav-list__item">
                  <Link to="/about" className="nav-list__link" onClick={closeMenu}>О платформе</Link>
                </li> 
                <li className="nav-list__item">
                  <button 
                    className="nav-list__link" 
                    onClick={() => {
                      closeMenu();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                  >
                    Контакты
                  </button>
                </li> 
                        
                <li id="account" className="nav-list__item account-tooltip">
                  <button 
                    className="nav-list__link" 
                    onClick={closeMenu}
                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                  >
                    Аккаунт
                  </button>
                  <button className="tooltip-content" id="signButton" onClick={openAuthModal}>
                    Регистрация/Вход
                  </button>
                </li>
              </ul>  
                    
              <button className="mobile-menu-btn" id="mobileMenuBtn" onClick={toggleMenu}>
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </button> 
            </div>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
};

export default Header;
