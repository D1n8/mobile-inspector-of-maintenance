import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.scss';

// Страницы общие
import { Login } from './pages/Login/Login';

// Страницы Обходчика (Мобильные)
import { RouteList } from './pages/RouteList/RouteList';
import { EquipmentForm } from './pages/EquipmentForm/EquipmentForm';

// Страницы Мастера (Десктоп)
import { MasterLayout } from './pages/Master/MasterLayout/MasterLayout';
import { MasterEquipment } from './pages/Master/MasterEquipment/MasterEquipment';
import { MasterInspectors } from './pages/Master/MasterInspectors/MasterInspectors';
import { MasterAnalytics } from './pages/Master/MasterAnalytics/MasterAnalytics';

export default function App() {
  return (
    <BrowserRouter basename='/mobile-inspector-of-maintenance/'>
      <Routes>
        {/* Общая точка входа */}
        <Route path="/" element={<Login />} />

        {/* --- ЗОНА ОБХОДЧИКА (Мобильная верстка .app-container) --- */}
        <Route path="/route" element={<RouteList />} />
        <Route path="/form/:id" element={<EquipmentForm />} />

        {/* --- ЗОНА МАСТЕРА (Десктоп верстка) --- */}
        {/* MasterLayout оборачивает все дочерние пути */}
        <Route path="/master" element={<MasterLayout />}>
          <Route path="equipment" element={<MasterEquipment />} />
          <Route path="inspectors" element={<MasterInspectors />} />
          <Route path="analytics" element={<MasterAnalytics />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}