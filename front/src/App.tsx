import { Routes, Route } from 'react-router-dom';
import VisitPage from './pages/VisitPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<SigninPage />}></Route>
      <Route path="signup" element={<SignupPage />}></Route>
      <Route path="visit" element={<VisitPage />}></Route>
    </Routes>
  );
};

export default App;
