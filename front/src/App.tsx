import { Routes, Route } from 'react-router-dom';
import VisitPage from './pages/VisitPage';
import SigninPage from './pages/SigninPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<SigninPage />}></Route>
      <Route path="visit" element={<VisitPage />}></Route>
    </Routes>
  );
};

export default App;
