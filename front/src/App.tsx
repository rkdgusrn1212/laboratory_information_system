import { Routes, Route } from 'react-router-dom';

import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import OrderPage from './pages/OrderPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<SigninPage />}></Route>
      <Route path="signup" element={<SignupPage />}></Route>
      <Route path="order" element={<OrderPage />}></Route>
    </Routes>
  );
};

export default App;
