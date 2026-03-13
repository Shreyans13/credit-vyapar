import { useState, useRef } from "react";
import { z } from "zod";

const ILLUSTRATION_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBP7ZsiKzKIWM6wPM7aPAfhvP-H6_ZLdUxQkId-LgMt8ThNOXm6cKduyqCCZdwC0RCgyPJaqWjVX38CJ_2ayOU159bm-ULSpTg7Dqt4I3gerEzDZ1GjAdCb5OgHp0MSb6jugFxRqbX_Ddwpvl7S6TIA5U4BXkth_qdw_zPxpqIfX9VoaLMbGnK_xnTUu60Ib80n6e0fD1SNYN8mmy1I6i64juGsC1hlMG_x-JidiuQVqNMhfPhqybVRlJnYTKKjpoxaSB9H2thOsN-d";

// Zod validation schemas
const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone number format"),
});

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export default function LoginOTP({ onBack, onNext }) {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [errors, setErrors] = useState({});
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Clear error when user starts typing
    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: undefined }));
    }
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validatePhone = () => {
    try {
      phoneSchema.parse({ phone });
      setErrors((prev) => ({ ...prev, phone: undefined }));
      return true;
    } catch (error) {
      const errorMessage = error.errors?.[0]?.message || "Invalid phone number";
      setErrors((prev) => ({ ...prev, phone: errorMessage }));
      return false;
    }
  };

  const handleSendOTP = () => {
    if (validatePhone()) {
      setOtpSent(true);
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    try {
      otpSchema.parse({ otp: otpString });
      setErrors((prev) => ({ ...prev, otp: undefined }));
      onNext();
    } catch (error) {
      const errorMessage = error.errors?.[0]?.message || "Invalid OTP";
      setErrors((prev) => ({ ...prev, otp: errorMessage }));
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#101622] font-['Inter'] text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="flex size-12 shrink-0 items-center justify-start hover:bg-[#1152d4]/10 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1">
          Loan Application
        </h2>
        <div className="size-12" />
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between">
          <p className="text-base font-medium leading-normal">
            Step 2: Identity Verification
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-normal">
            2 of 11
          </p>
        </div>
        <div className="rounded-full bg-[#1152d4]/10 dark:bg-[#1152d4]/20 h-2 w-full">
          <div
            className="h-2 rounded-full bg-[#1152d4]"
            style={{ width: "18.18%" }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col px-4 pt-8 pb-4">
        <h2 className="tracking-tight text-[28px] font-bold leading-tight pb-3">
          Verify your phone
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal pb-8">
          We'll send a 6-digit verification code to your device to secure your
          application.
        </p>

        {/* Phone Number Input */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium leading-normal pb-2">
              Phone Number
            </label>
            <input
              className={`w-full rounded-lg border ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-[#1152d4]/20 focus:ring-[#1152d4] focus:border-[#1152d4]"
              } bg-white dark:bg-slate-800 h-14 placeholder:text-slate-400 px-4 focus:ring-2 text-slate-900 dark:text-slate-100`}
              placeholder="000-000-0000"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) {
                  setErrors((prev) => ({ ...prev, phone: undefined }));
                }
              }}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          <button
            onClick={handleSendOTP}
            disabled={otpSent}
            className="w-full bg-[#1152d4] hover:bg-[#1152d4]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold h-14 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1152d4]/20"
          >
            <span>{otpSent ? "OTP Sent" : "Send OTP"}</span>
            <span className="material-symbols-outlined text-sm">send</span>
          </button>
        </div>

        {/* OTP Section */}
        {otpSent && (
          <div className="mt-12 pt-8 border-t border-[#1152d4]/10">
            <label className="text-sm font-medium leading-normal pb-4 block">
              Enter 6-digit code
            </label>
            <div className="flex justify-between gap-2 max-w-sm mx-auto w-full">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  className={`w-12 h-14 text-center text-xl font-bold rounded-lg border ${
                    errors.otp
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-[#1152d4]/20 focus:ring-[#1152d4] focus:border-[#1152d4]"
                  } bg-white dark:bg-slate-800 focus:ring-2 text-slate-900 dark:text-slate-100`}
                  maxLength={1}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                />
              ))}
            </div>
            {errors.otp && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {errors.otp}
              </p>
            )}
            <div className="flex justify-center mt-6">
              <button className="text-[#1152d4] font-semibold text-sm hover:underline">
                Resend code in 00:59
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 text-center">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Having trouble?{" "}
          <button className="text-[#1152d4] font-medium">
            Contact support
          </button>
        </p>
      </div>

      {/* Illustration */}
      <div className="p-4 flex justify-center">
        <div className="w-full max-w-[320px] aspect-video rounded-2xl bg-gradient-to-br from-[#1152d4]/5 to-[#1152d4]/20 border border-[#1152d4]/10 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full opacity-50">
            <img
              alt="Contactless security verification"
              className="w-full h-full object-cover"
              src={ILLUSTRATION_IMAGE}
            />
          </div>
        </div>
      </div>

      {/* Next button (for flow navigation) */}
      {otpSent && (
        <div className="px-4 pb-6">
          <button
            onClick={handleVerify}
            className="w-full bg-[#1152d4] hover:bg-[#1152d4]/90 text-white font-bold h-14 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1152d4]/20"
          >
            <span>Verify & Continue</span>
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
