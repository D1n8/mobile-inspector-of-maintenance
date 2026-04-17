// src/pages/Login/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

// Константы для API
const API_BASE_URL = 'https://hackathon.project-domain.ru';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  
  // Состояния формы
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Проверка интернета для PWA
    if (!navigator.onLine) {
      setError('Нет подключения к сети. Вход невозможен.');
      return;
    }

    setIsLoading(true);

    try {
      // --- ШАГ 1: Запрос на авторизацию ---
      const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: loginInput,
          password: password,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error('Неверный логин или пароль');
      }

      const tokenData = await loginResponse.json();

      // Сохраняем токены в локальное хранилище
      localStorage.setItem('access_token', tokenData.access_token);
      localStorage.setItem('refresh_token', tokenData.refresh_token);

      // --- ШАГ 2: Получение профиля пользователя ---
      const profileResponse = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`, // Передаем токен
          'Content-Type': 'application/json',
        },
      });

      if (!profileResponse.ok) {
        throw new Error('Не удалось получить данные профиля');
      }

      const userProfile = await profileResponse.json();

      // Сохраняем роль и имя, чтобы использовать их на других страницах
      localStorage.setItem('userRole', userProfile.role);
      localStorage.setItem('userName', userProfile.full_name);

      // --- ШАГ 3: Маршрутизация на основе роли ---
      // Внимание: проверь, как точно бэкенд отдает роль. 
      // Если он отдает 'master' или 'admin', перекидываем в десктоп.
      if (userProfile.role === 'master' || userProfile.role === 'admin') {
        navigate('/master/equipment');
      } else {
        // Иначе считаем его обходчиком
        navigate('/route'); 
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Если произошла ошибка (CORS, 401, 500)
      setError(err.message || 'Произошла ошибка при подключении к серверу');
      // Очищаем мусор, если авторизация прервалась
      localStorage.removeItem('access_token'); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="content login-screen">
        <h2>Вход в систему</h2>
        
        {error && (
          <div style={{ color: 'white', backgroundColor: 'var(--danger)', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '14px' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Логин / Email</label>
            <input 
              type="text" 
              value={loginInput}
              onChange={e => setLoginInput(e.target.value)}
              placeholder="Введите логин" 
              required 
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" 
              required 
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary login-btn"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? 'Авторизация...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};