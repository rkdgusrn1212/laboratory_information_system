import { Routes, Route } from 'react-router-dom';

import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import ReceptConsultationPage from './pages/ReceptConsultationPage';
import ConsultationPage from './pages/ConsultationPage';
import RedirectPage from './pages/RedirectPage';
import Navigation from './pages/Navigation';
import BloodCollectionPage from './pages/BloodCollectionPage';
import ReceptCollectionPage from './pages/ReceptCollectionPage';
import InadequatePage from './pages/InadequatesubmitPage';
import TestResultAnalysisPage from './pages/TestResultAnalysisPage';
import TestReceptPage from './pages/TestReceptPage';
import TestResultInputPage from './pages/TestResultInputPage';
import TestResultPage from './pages/TestResultPage';
import MyInfoPage from './pages/MyInfoPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<SigninPage />}></Route>
      <Route path="signup" element={<SignupPage />}></Route>
      <Route
        path="recept-consultation"
        element={<ReceptConsultationPage />}
      ></Route>
      <Route path="my-info" element={<MyInfoPage />}></Route>
      <Route path="" element={<Navigation />}>
        <Route path="consultation">
          <Route path="" element={<ConsultationPage />}></Route>
        </Route>
        <Route path="collection">
          <Route path="" element={<ReceptCollectionPage />}></Route>
          <Route path="collect" element={<BloodCollectionPage />}></Route>
          <Route path="inadequate">
            <Route path="submit" element={<InadequatePage />}></Route>
          </Route>
        </Route>
        <Route path="test">
          <Route path="" element={<TestReceptPage />}></Route>
          <Route path="analysis" element={<TestResultAnalysisPage />}></Route>
          <Route path="input" element={<TestResultInputPage />}></Route>
          <Route path="result" element={<TestResultPage />}></Route>
        </Route>
      </Route>
      <Route path="*" element={<RedirectPage />}></Route>
    </Routes>
  );
};

export default App;
