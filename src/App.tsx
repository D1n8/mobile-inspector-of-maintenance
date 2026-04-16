// App.tsx
import React, { useState } from 'react';
import './App.scss';

// --- Типы данных ---
interface Equipment {
  id: string;
  name: string;
  location: string;
  status: 'pending' | 'done';
}

// --- Моковые данные (Маршрут) ---
const MOCK_ROUTE: Equipment[] = [
  { id: '1', name: 'Насос питательный ПЭ-1', location: 'Турбинный цех', status: 'pending' },
  { id: '2', name: 'Маслоохладитель МО-2', location: 'Турбинный цех', status: 'pending' },
  { id: '3', name: 'Задвижка паропровода ВД', location: 'Котельный цех', status: 'done' },
];

// ==========================================
// ОСНОВНОЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ
// ==========================================
export default function App() {
  // Состояния роутинга
  const [currentPage, setCurrentPage] = useState<'login' | 'list' | 'form'>('login');
  
  // Состояние выбранного оборудования для формы
  const [selectedEq, setSelectedEq] = useState<Equipment | null>(null);

  // Обработчики переходов
  const handleLoginSuccess = () => setCurrentPage('list');
  
  const handleOpenForm = (eq: Equipment) => {
    setSelectedEq(eq);
    setCurrentPage('form');
  };

  const handleBackToList = () => {
    setSelectedEq(null);
    setCurrentPage('list');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Имитация отправки данных (на хакатоне здесь будет fetch)
    alert(`Данные по ${selectedEq?.name} сохранены локально!`);
    handleBackToList();
  };

  // --- Страница 1: АВТОРИЗАЦИЯ ---
  if (currentPage === 'login') {
    return (
      <div className="app-container">
        <div className="content login-screen">
          <h2>Вход в систему</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleLoginSuccess(); }}>
            <div className="form-group">
              <label>Логин / Email</label>
              <input type="text" placeholder="admin@zavod.ru" required />
            </div>
            <div className="form-group">
              <label>Пароль</label>
              <input type="password" placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Страница 2: СПИСОК ОБОРУДОВАНИЯ (Карта/Маршрут) ---
  if (currentPage === 'list') {
    return (
      <div className="app-container">
        <header className="header">
          <h1>Маршрут обхода</h1>
          <button className="back-btn" onClick={() => setCurrentPage('login')}>Выход</button>
        </header>
        
        <div className="content">
          <p style={{ marginBottom: '16px', color: 'var(--gray-text)' }}>
            Осталось проверить: {MOCK_ROUTE.filter(e => e.status === 'pending').length}
          </p>

          <div className="equipment-list">
            {MOCK_ROUTE.map((eq) => (
              <div 
                key={eq.id} 
                className="equipment-card"
                onClick={() => handleOpenForm(eq)}
              >
                <div className="eq-info">
                  <h3>{eq.name}</h3>
                  <p>{eq.location}</p>
                </div>
                {/* Индикатор статуса */}
                <div className={`status ${eq.status}`} title={eq.status === 'done' ? 'Проверено' : 'Ожидает'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Страница 3: ФОРМА ЗАПОЛНЕНИЯ ---
  if (currentPage === 'form' && selectedEq) {
    return (
      <div className="app-container">
        <header className="header">
          <button className="back-btn" onClick={handleBackToList}>◄ Назад</button>
          <h1>Чек-лист</h1>
          <div style={{ width: '50px' }}></div> {/* Пустой блок для выравнивания заголовка по центру */}
        </header>

        <form className="content" onSubmit={handleSubmitForm}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '4px' }}>{selectedEq.name}</h2>
            <p style={{ color: 'var(--gray-text)', fontSize: '14px' }}>{selectedEq.location}</p>
          </div>

          <div className="form-group">
            <label>Температура подшипника (°C)</label>
            <input type="number" step="0.1" placeholder="Например: 45.5" required />
          </div>

          <div className="form-group">
            <label>Давление масла (МПа)</label>
            <input type="number" step="0.01" placeholder="Например: 0.15" required />
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="defect" />
            <label htmlFor="defect" style={{ color: 'var(--danger)' }}>Обнаружен визуальный дефект</label>
          </div>

          <div className="form-group">
            <label>Комментарий / Описание дефекта</label>
            <textarea placeholder="Опишите состояние или обнаруженные проблемы..."></textarea>
          </div>

          {/* Имитация кнопки фотофиксации (в PWA сюда вешается input type="file" capture="environment") */}
          <button type="button" className="btn btn-secondary" style={{ marginBottom: '20px' }}>
            📷 Сделать фото
          </button>

          <button type="submit" className="btn btn-primary">
            Сохранить данные
          </button>
        </form>
      </div>
    );
  }

  return null;
}