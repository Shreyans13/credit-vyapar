import { useState, useRef } from "react";
import { z } from "zod";

// Zod validation schema
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export default function FinalVerification({ onBack, onNext }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Clear error when user starts typing
    if (error) setError("");
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    try {
      otpSchema.parse({ otp: otpString });
      setError("");
      onNext();
    } catch (err) {
      const errorMessage = err.errors?.[0]?.message || "Invalid OTP";
      setError(errorMessage);
    }
  };

  const getInputClassName = () => {
    const baseClasses = "flex h-14 w-11 sm:w-12 text-center rounded-lg border-2 bg-transparent focus:ring-0 text-xl font-bold text-[#1152d4]";
    if (error) {
      return `${baseClasses} border-red-500 focus:border-red-500`;
    }
    return `${baseClasses} border-slate-200 dark:border-slate-700 focus:border-[#1152d4]`;
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col max-w-md mx-auto bg-white dark:bg-slate-900 shadow-xl font-['Inter'] text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={onBack}
          className="flex size-12 shrink-0 items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
          Final Step
        </h2>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-3 p-6">
        <div className="flex gap-6 justify-between items-center">
          <p className="text-base font-semibold leading-normal">
            Security Verification
          </p>
          <p className="text-[#1152d4] text-sm font-bold leading-normal">
            Step 10 of 11
          </p>
        </div>
        <div className="rounded-full bg-slate-200 dark:bg-slate-800 h-2 w-full overflow-hidden">
          <div
            className="h-full rounded-full bg-[#1152d4]"
            style={{ width: "90.9%" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-10">
        <div className="bg-[#1152d4]/10 p-4 rounded-full mb-6">
          <span className="material-symbols-outlined text-[#1152d4] text-5xl">
            verified_user
          </span>
        </div>
        <h2 className="tracking-tight text-3xl font-bold leading-tight text-center pb-3">
          Verify & Finalize
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed text-center max-w-xs">
          We've sent a 6-digit verification code to your registered mobile
          ending in{" "}
          <span className="font-bold text-slate-900 dark:text-slate-100">
            .... 8829
          </span>
          .
        </p>

        {/* OTP Input */}
        <div className="flex justify-center w-full py-10">
          <fieldset className="relative flex gap-2 sm:gap-4">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                className={getInputClassName()}
                inputMode="numeric"
                maxLength={1}
                pattern="\d*"
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
              />
            ))}
          </fieldset>
        </div>
        {error && (
          <p className="text-red-500 text-sm -mt-6 mb-6">{error}</p>
        )}

        {/* Resend */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Didn't receive the code?
          </p>
          <button className="text-[#1152d4] font-bold text-sm hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">refresh</span>
            Resend Code (45s)
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 mt-auto">
        <button
          onClick={handleVerify}
          className="w-full bg-[#1152d4] hover:bg-[#1152d4]/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#1152d4]/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>Verify & Finalize Agreement</span>
          <span className="material-symbols-outlined">task_alt</span>
        </button>
        <p className="text-center text-slate-400 dark:text-slate-500 text-xs mt-4 px-4 leading-normal">
          By finalizing, you agree to the digitally signed terms and conditions
          of the service agreement.
        </p>
      </div>
      <div className="h-6 bg-white dark:bg-slate-900" />
    </div>
  );
}
