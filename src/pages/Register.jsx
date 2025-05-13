import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Проверка совпадения паролей
    if (formData.password !== formData.confirmPassword) {
      return setError('Пароли не совпадают');
    }

    // Проверка длины пароля
    if (formData.password.length < 6) {
      return setError('Пароль должен содержать минимум 6 символов');
    }

    setLoading(true);
    
    try {
      const { email, password } = formData;
      await createUserWithEmailAndPassword(auth, email, password);
      // После успешной регистрации пользователь будет автоматически авторизован
      // и перенаправлен на dashboard через useEffect выше
    } catch (err) {
      console.error('Ошибка регистрации:', err);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Пользователь с таким email уже существует');
          break;
        case 'auth/invalid-email':
          setError('Некорректный email адрес');
          break;
        default:
          setError('Произошла ошибка при регистрации. Попробуйте позже.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Регистрация</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Введите ваш email"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Введите пароль"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Подтвердите пароль:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Подтвердите пароль"
              disabled={loading}
            />
          </div>
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>
        <div className="login-link">
          Уже есть аккаунт? <Link to="/">Войти</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 