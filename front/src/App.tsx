import { Routes, Route } from 'react-router-dom';

import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import OrderPage from './pages/OrderPage';
import RedirectPage from './pages/RedirectPage';
import Navigation from './pages/Navigation';
import Bloodcollection from './components/bloodcollection/bloodcollection';
import ReceptCollection from './components/recept_collection/recept_collection';
import Inadequate from './components/inadequate/inadequatesubmit';
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<SigninPage />}></Route>
      <Route path="signup" element={<SignupPage />}></Route>
      <Route path="" element={<Navigation />}>
        <Route path="order" element={<OrderPage />}></Route>
        <Route path="bloodcollection" element={<Bloodcollection />}></Route>
        <Route path="receptcollection" element={<ReceptCollection />}></Route>
        <Route path="inadequate" element={<Inadequate />}></Route>
      </Route>
      <Route path="*" element={<RedirectPage />}></Route>
    </Routes>
  );
};

export default App;
