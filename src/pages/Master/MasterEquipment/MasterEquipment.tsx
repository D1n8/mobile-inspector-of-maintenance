import React from 'react';
import { MOCK_ROUTE } from '../../../data/mockData';

export const MasterEquipment: React.FC = () => {
  return (
    <div>
      <h1 className="master-page-title">Схема завода</h1>
      <div className="master-card">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Оборудование</th>
              <th style={{ padding: '12px' }}>Цех (Локация)</th>
              <th style={{ padding: '12px' }}>Статус обхода</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ROUTE.map(eq => (
              <tr key={eq.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', color: '#666' }}>#{eq.id}</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>{eq.name}</td>
                <td style={{ padding: '12px' }}>{eq.location}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '13px',
                    backgroundColor: eq.status === 'done' ? '#e8f5e9' : '#ffebee',
                    color: eq.status === 'done' ? 'var(--success)' : 'var(--danger)'
                  }}>
                    {eq.status === 'done' ? 'Проверено' : 'Требует проверки'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};