// src/pages/RouteList/RouteList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_ROUTE } from '../../data/mockData';
import './RouteList.scss';

export const RouteList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <header className="header">
        <h1>Маршрут обхода</h1>
        <button className="back-btn" onClick={() => navigate('/')}>Выход</button>
      </header>
      
      <div className="content">
        <p className="route-stats">
          Осталось проверить: {MOCK_ROUTE.filter(e => e.status === 'pending').length}
        </p>

        <div className="equipment-list">
          {MOCK_ROUTE.map((eq) => (
            <div 
              key={eq.id} 
              className="equipment-card"
              onClick={() => navigate(`/form/${eq.id}`)}
            >
              <div className="eq-info">
                <h3>{eq.name}</h3>
                <p>{eq.location}</p>
              </div>
              <div className={`status ${eq.status}`} title={eq.status === 'done' ? 'Проверено' : 'Ожидает'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};