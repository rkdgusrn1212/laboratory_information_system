import { Routes, Route } from 'react-router-dom';
import VisitPage from './pages/VisitPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="visit" element={<VisitPage />}></Route>
    </Routes>
  );
};

export default App;
