// src/pages/Master/MasterLayout/MasterLayout.tsx
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './MasterLayout.scss';

export const MasterLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <div className="master-layout">
      {/* Боковое меню */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>ТОиР Контроль</h2>
          <p>АРМ Мастера</p>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/master/equipment" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            Схема завода (Оборудование)
          </NavLink>
          <NavLink to="/master/inspectors" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            Список обходчиков
          </NavLink>
          <NavLink to="/master/analytics" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            Аналитика
          </NavLink>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>Выйти из системы</button>
      </aside>

      {/* Основной контент (сюда будут рендериться страницы) */}
      <main className="master-main">
        <Outlet /> 
      </main>
    </div>
  );
};