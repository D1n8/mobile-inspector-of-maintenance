// src/pages/EquipmentForm/EquipmentForm.tsx
import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_ROUTE } from '../../data/mockData';
import './EquipmentForm.scss';

const API_BASE_URL = 'https://hackathon.project-domain.ru';
// Хардкод ID оборудования по ТЗ
const HARDCODED_EQUIPMENT_ID = "37362c7d-d972-45d0-92c2-fb68bb2aae69";

export const EquipmentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Скрытый input для вызова камеры
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Находим оборудование по ID из URL для отображения названия
  const selectedEq = MOCK_ROUTE.find(eq => eq.id === id);

  // Состояния полей формы
  const [temperature, setTemperature] = useState('');
  const [pressure, setPressure] = useState('');
  const [vibration, setVibration] = useState(''); // Новое поле
  const [fault, setFault] = useState(false);
  const [comment, setComment] = useState('');
  
  // Состояния для фото и UI
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Обработка выбора фото
  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Создаем локальную ссылку для превью (работает без интернета)
      const objectUrl = URL.createObjectURL(file);
      setPhotoPreview(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Ошибка: Вы не авторизованы (нет токена)');
      return;
    }

    setIsSubmitting(true);

    try {
      // Формируем тело запроса по ТЗ
      const payload = {
        temperature: parseFloat(temperature) || 0,
        pressure: parseFloat(pressure) || 0,
        vibration: parseFloat(vibration) || 0,
        fault: fault,
        comment: comment,
        photo_url: "https://mock-storage.ru/photos/temp-photo.jpg", // Моковая ссылка по ТЗ
        equipment_id: HARDCODED_EQUIPMENT_ID
      };

      const response = await fetch(`${API_BASE_URL}/equipment/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Передаем токен
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // Если словили 401 Unauthorized, возможно токен протух
        if (response.status === 401) {
            throw new Error('Сессия истекла. Пожалуйста, перезайдите в систему.');
        }
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      alert(`Данные успешно отправлены на сервер!`);
      navigate('/route'); // Возвращаемся к списку маршрута

    } catch (err: any) {
      setError(err.message || 'Ошибка при отправке данных');
    } finally {
      setIsSubmitting(false);
    }
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

        {error && (
          <div style={{ color: 'white', backgroundColor: 'var(--danger)', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <div className="form-group">
          <label>Температура подшипника (°C)</label>
          <input 
            type="number" step="0.1" 
            value={temperature} onChange={e => setTemperature(e.target.value)}
            placeholder="Например: 45.5" required 
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label>Давление масла (МПа)</label>
          <input 
            type="number" step="0.01" 
            value={pressure} onChange={e => setPressure(e.target.value)}
            placeholder="Например: 0.15" required 
            disabled={isSubmitting}
          />
        </div>

        {/* НОВОЕ ПОЛЕ: Вибрация */}
        <div className="form-group">
          <label>Уровень вибрации (мм/с)</label>
          <input 
            type="number" step="0.1" 
            value={vibration} onChange={e => setVibration(e.target.value)}
            placeholder="Например: 2.5" required 
            disabled={isSubmitting}
          />
        </div>

        <div className="checkbox-group">
          <input 
            type="checkbox" 
            id="fault" 
            checked={fault}
            onChange={e => setFault(e.target.checked)}
            disabled={isSubmitting}
          />
          <label htmlFor="fault" className="defect-label">Обнаружен дефект (Fault)</label>
        </div>

        <div className="form-group">
          <label>Комментарий / Описание</label>
          <textarea 
            value={comment} onChange={e => setComment(e.target.value)}
            placeholder="Опишите состояние..."
            disabled={isSubmitting}
          ></textarea>
        </div>

        {/* БЛОК ФОТОФИКСАЦИИ */}
        <div className="photo-section">
          {/* Скрытый инпут, который вызывает камеру телефона */}
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" // Запрашивает основную (заднюю) камеру на мобилках
            ref={fileInputRef}
            onChange={handlePhotoCapture}
            style={{ display: 'none' }} 
          />
          
          <button 
            type="button" 
            className="btn btn-secondary photo-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={isSubmitting}
          >
            {photoPreview ? '📷 Переснять фото' : '📷 Сделать фото'}
          </button>

          {/* Превью сделанной фотографии */}
          {photoPreview && (
             <div className="photo-preview-container">
               <img src={photoPreview} alt="Превью дефекта" className="photo-preview" />
             </div>
          )}
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1, marginTop: '20px' }}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить на сервер'}
        </button>
      </form>
    </div>
  );
};