// src/pages/EquipmentForm/EquipmentForm.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_ROUTE } from '../../data/mockData';
import './EquipmentForm.scss';

export const EquipmentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Находим оборудование по ID из URL
  const selectedEq = MOCK_ROUTE.find(eq => eq.id === id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Данные по ${selectedEq?.name} сохранены!`);
    navigate('/route');
  };

  if (!selectedEq) {
    return <div className="app-container"><div className="content">Оборудование не найдено</div></div>;
  }

  return (
    <div className="app-container">
      <header className="header">
        <button className="back-btn" onClick={() => navigate('/route')}>◄ Назад</button>
        <h1>Чек-лист</h1>
        <div style={{ width: '50px' }}></div>
      </header>

      <form className="content" onSubmit={handleSubmit}>
        <div className="eq-header">
          <h2>{selectedEq.name}</h2>
          <p>{selectedEq.location}</p>
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
          <label htmlFor="defect" className="defect-label">Обнаружен визуальный дефект</label>
        </div>

        <div className="form-group">
          <label>Комментарий / Описание дефекта</label>
          <textarea placeholder="Опишите состояние или обнаруженные проблемы..."></textarea>
        </div>

        <button type="button" className="btn btn-secondary photo-btn">
          📷 Сделать фото
        </button>

        <button type="submit" className="btn btn-primary">
          Сохранить данные
        </button>
      </form>
    </div>
  );
};