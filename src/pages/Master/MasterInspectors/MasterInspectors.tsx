import React from 'react';
import { MOCK_INSPECTORS } from '../../../data/mockData';

export const MasterInspectors: React.FC = () => {
  return (
    <div>
      <h1 className="master-page-title">Управление персоналом</h1>
      <div className="master-card" style={{ display: 'flex', gap: '20px' }}>
        {MOCK_INSPECTORS.map(inspector => (
          <div key={inspector.id} style={{ 
            border: '1px solid var(--gray-light)', padding: '20px', borderRadius: '8px', width: '300px' 
          }}>
            <h3 style={{ marginBottom: '8px' }}>{inspector.name}</h3>
            <p style={{ color: 'var(--gray-text)', marginBottom: '16px' }}>Статус: {inspector.status}</p>
            <p style={{ marginBottom: '20px' }}>Назначено заданий: <strong>{inspector.tasks}</strong></p>
            <button className="btn btn-primary" style={{ padding: '10px' }} disabled={inspector.status !== 'На смене'}>
              Назначить маршрут
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};