import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { SignupLogin } from './components/SignupLogin';
import { KYCDetails } from './components/KYCDetails';
import { DocumentUpload } from './components/DocumentUpload';
import { EligibleLenders } from './components/EligibleLenders';
import { LenderProfile } from './components/LenderProfile';
import { AgreementSigning } from './components/AgreementSigning';
import { ActivationSuccess } from './components/ActivationSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup-login" element={<SignupLogin />} />
        <Route path="/kyc-details" element={<KYCDetails />} />
        <Route path="/document-upload" element={<DocumentUpload />} />
        <Route path="/eligible-lenders" element={<EligibleLenders />} />
        <Route path="/lender-profile" element={<LenderProfile />} />
        <Route path="/agreement-signing" element={<AgreementSigning />} />
        <Route path="/activation-success" element={<ActivationSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
