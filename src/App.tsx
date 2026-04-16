import { useState, useEffect } from 'react';

// Твой URL для авторизации
const LOGIN_URL = 'https://project-domain.ru/api/Auth/login'; 

function App() {
  const [data, setData] = useState<string>('Ожидание действий...');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Отслеживаем статус интернета (важно для PWA)
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Функция авторизации
  const handleLogin = async () => {
    if (!isOnline) {
      setData('❌ Ошибка: нет интернета. Невозможно выполнить вход в офлайн-режиме.');
      return;
    }

    setIsLoading(true);
    setData('Отправка запроса...');

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          // Обязательно указываем, что отправляем JSON
          'Content-Type': 'application/json', 
          // 'Accept': 'application/json' // Раскомментируй, если бэкенд требует этот заголовок
        },
        body: JSON.stringify({
          email: "admin@admin.ru",
          password: "admin"
        })
      });
      
      // Если бэкенд вернул не 200 OK (например, 401 Неверный пароль)
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // Выводим успешный ответ на экран
      setData(`✅ Успешный ответ от сервера:\n\n${JSON.stringify(result, null, 2)}`);
      
      // Здесь на хакатоне обычно сохраняют токен
      // localStorage.setItem('token', result.token);

    } catch (error) {
      setData(`❌ Ошибка запроса (CORS или сеть):\n${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Тест авторизации (PWA)</h2>
      
      <div style={{ 
        marginBottom: '20px', 
        padding: '10px', 
        backgroundColor: isOnline ? '#d4edda' : '#f8d7da',
        borderRadius: '5px'
      }}>
        Статус устройства: <strong>{isOnline ? '🟢 ОНЛАЙН' : '🔴 ОФФЛАЙН'}</strong>
      </div>

      <button 
        onClick={handleLogin} 
        disabled={isLoading}
        style={{ 
          padding: '12px 24px', 
          fontSize: '16px', 
          marginBottom: '20px',
          backgroundColor: isLoading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          width: '100%'
        }}
      >
        {isLoading ? 'Загрузка...' : 'Отправить POST на /api/Auth/login'}
      </button>

      <h4>Ответ от сервера:</h4>
      <pre style={{ 
        backgroundColor: '#282c34', 
        color: '#abb2bf',
        padding: '15px', 
        borderRadius: '5px',
        overflowX: 'auto',
        fontSize: '14px'
      }}>
        {data}
      </pre>
    </div>
  );
}

export default App;