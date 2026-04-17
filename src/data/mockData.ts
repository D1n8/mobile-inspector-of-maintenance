// src/data/mockData.ts
export interface Equipment {
  id: string;
  name: string;
  location: string;
  status: 'pending' | 'done';
}

export const MOCK_ROUTE: Equipment[] = [
  { id: '1', name: 'Насос питательный ПЭ-1', location: 'Турбинный цех', status: 'pending' },
  { id: '2', name: 'Маслоохладитель МО-2', location: 'Турбинный цех', status: 'pending' },
  { id: '3', name: 'Задвижка паропровода ВД', location: 'Котельный цех', status: 'done' },
];

// Добавляем моки для пользователей и логина
export const MOCK_USERS = [
  { email: 'admin@admin.ru', password: 'admin', role: 'master', name: 'Иван Мастеров' },
  { email: 'worker@zavod.ru', password: '123', role: 'inspector', name: 'Петр Обходчиков' },
];

export const MOCK_INSPECTORS = [
  { id: '101', name: 'Петр Обходчиков', status: 'На смене', tasks: 3 },
  { id: '102', name: 'Алексей Смирнов', status: 'Выходной', tasks: 0 },
];