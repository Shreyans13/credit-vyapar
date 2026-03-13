import { useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';

const OTP_LENGTH = 6;
const RESEND_COUNTDOWN = 30;

export function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || '';

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_COUNTDOWN);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const isComplete = otp.every((d) => d !== '');

  const handleChange = (index, value) => {
    // Only allow single digit
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError('');

    // Auto-advance to next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        // Clear current field
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous field and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const newOtp = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((digit, i) => { newOtp[i] = digit; });
    setOtp(newOtp);
    setError('');
    // Focus last filled or next empty
    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    if (!isComplete) return;
    setIsVerifying(true);
    setError('');

    // Simulate async OTP verification
    await new Promise((res) => setTimeout(res, 900));

    // For demo purposes, any complete OTP is accepted
    setIsVerifying(false);
    navigate('/kyc-details');
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(Array(OTP_LENGTH).fill(''));
    setError('');
    setCountdown(RESEND_COUNTDOWN);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  const maskedPhone = phoneNumber
    ? `+91 ${phoneNumber.slice(0, 2)}XXXXX${phoneNumber.slice(-3)}`
    : '+91 XXXXXXXXXX';

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden max-w-md mx-auto shadow-2xl">
      {/* Top Navigation */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 justify-between border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => navigate('/signup-login')}
          className="text-slate-900 dark:text-slate-100 flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
          Verify OTP
        </h2>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center px-6 pt-12 pb-8">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
          <ShieldCheck className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-slate-900 dark:text-slate-100 tracking-tight text-3xl font-extrabold leading-tight text-center">
          Enter OTP
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal mt-2 text-center">
          We sent a 6-digit code to
        </p>
        <p className="text-slate-900 dark:text-slate-100 text-base font-semibold mt-0.5 text-center">
          {maskedPhone}
        </p>
      </div>

      {/* OTP Input Section */}
      <div className="flex-1 px-6 space-y-6">
        {/* 6 digit boxes */}
        <div className="flex justify-center gap-3" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-all focus:outline-none focus:ring-2
                ${error
                  ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-800'
                  : digit
                    ? 'border-primary focus:ring-primary/20'
                    : 'border-slate-300 dark:border-slate-700 focus:ring-primary/20'
                }`}
            />
          ))}
        </div>

        {/* Inline error */}
        {error && (
          <p className="text-red-500 text-xs flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}

        {/* Verify Button */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={!isComplete || isVerifying}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-400 text-white font-bold text-lg h-14 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isVerifying ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              Verify &amp; Continue
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Resend OTP */}
        <div className="flex items-center justify-center gap-1 pt-1">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Didn't receive the code?
          </p>
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-primary text-sm font-semibold hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            <span className="text-slate-400 dark:text-slate-500 text-sm font-semibold">
              Resend in {countdown}s
            </span>
          )}
        </div>

        {/* Info callout */}
        <div className="flex gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            This OTP is valid for 10 minutes. Do not share it with anyone. CreditVyapar will never ask for your OTP.
          </p>
        </div>
      </div>

      {/* Background Accent Decorative */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}
