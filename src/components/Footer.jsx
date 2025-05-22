import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>О нас</h3>
          <p>Мы создаем инновационные решения для наших клиентов, делая их жизнь проще и удобнее.</p>
        </div>
        
        <div className="footer-section">
          <h3>Контакты</h3>
          <ul>
            <li>Email: test@example.com</li>
            <li>Телефон: +375 (29) 123-45-67</li>
            <li>Адрес: г. Минск, ул. Примерная, 123</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Ссылки</h3>
          <ul>
            <li><a href="/">Главная</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Социальные сети</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">Telegram</a>
            <a href="https://vk.com" target="_blank" rel="noopener noreferrer">VK</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ваша компания. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer; 