import { useState } from "react";
import {
  Onboarding,
  LoginOTP,
  PersonalDetails,
  VerificationSummary,
  LoanOffers,
  OfferDetails,
  KYCVerification,
  RepaymentSetup,
  LoanAgreement,
  FinalVerification,
  LoanGranted,
} from "./components";

const SCREENS = [
  "onboarding",
  "login-otp",
  "personal-details",
  "verification-summary",
  "loan-offers",
  "offer-details",
  "kyc-verification",
  "repayment-setup",
  "loan-agreement",
  "final-verification",
  "loan-granted",
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const goNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, SCREENS.length - 1));
  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const screenProps = { onNext: goNext, onBack: goBack };

  switch (SCREENS[currentStep]) {
    case "onboarding":
      return <Onboarding {...screenProps} />;
    case "login-otp":
      return <LoginOTP {...screenProps} />;
    case "personal-details":
      return <PersonalDetails {...screenProps} />;
    case "verification-summary":
      return <VerificationSummary {...screenProps} />;
    case "loan-offers":
      return <LoanOffers {...screenProps} />;
    case "offer-details":
      return <OfferDetails {...screenProps} />;
    case "kyc-verification":
      return <KYCVerification {...screenProps} />;
    case "repayment-setup":
      return <RepaymentSetup {...screenProps} />;
    case "loan-agreement":
      return <LoanAgreement {...screenProps} />;
    case "final-verification":
      return <FinalVerification {...screenProps} />;
    case "loan-granted":
      return <LoanGranted />;
    default:
      return <Onboarding {...screenProps} />;
  }
}
