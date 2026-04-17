// src/pages/Login/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_USERS } from '../../data/mockData';
import './Login.scss';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Ищем пользователя в моках
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (!user) {
      setError('Неверный логин или пароль');
      return;
    }

    // Сохраняем роль (на хакатоне лучше в localStorage)
    localStorage.setItem('userRole', user.role);

    // Маршрутизация на основе роли
    if (user.role === 'master') {
      navigate('/master/equipment'); // Десктоп мастера
    } else {
      navigate('/route'); // Мобилка обходчика
    }
  };

  return (
    <div className="app-container"> {/* Оставляем мобильный контейнер для логина */}
      <div className="content login-screen">
        <h2>Вход в систему</h2>
        {error && <div style={{ color: 'var(--danger)', marginBottom: '15px' }}>{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Логин / Email</label>
            <input 
              type="text" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@admin.ru или worker@zavod.ru" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="admin или 123" 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary login-btn">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};