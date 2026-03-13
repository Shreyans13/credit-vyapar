const TOTAL_STEPS = 11;
const CURRENT_STEP = 7;

export default function KYCVerification({ onBack, onNext }) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#101622] font-['Inter'] text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center bg-white dark:bg-slate-900 p-4 border-b border-[#1152d4]/10 justify-between">
        <button
          onClick={onBack}
          className="flex size-12 shrink-0 items-center cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          KYC Verification
        </h2>
      </div>

      {/* Step Dots */}
      <div className="flex w-full flex-wrap items-center justify-center gap-2 py-6 px-4">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full ${
              i < CURRENT_STEP
                ? i === CURRENT_STEP - 1
                  ? "w-6 bg-[#1152d4] ring-4 ring-[#1152d4]/20"
                  : "w-2 bg-[#1152d4]"
                : "w-2 bg-slate-300 dark:bg-slate-700"
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col px-6 py-8 flex-grow">
        <div className="flex flex-col items-center gap-8 max-w-md mx-auto w-full">
          {/* Status Visualization */}
          <div className="relative flex items-center justify-center w-full aspect-square max-w-[280px] rounded-full bg-[#1152d4]/5 border-2 border-dashed border-[#1152d4]/30 p-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-4 border-[#1152d4] border-t-transparent animate-spin" />
            </div>
            <div className="bg-[#1152d4] text-white rounded-full p-6 shadow-xl shadow-[#1152d4]/40 relative z-10">
              <span className="material-symbols-outlined !text-6xl">
                verified_user
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-center gap-4 text-center">
            <h3 className="text-2xl font-bold leading-tight tracking-tight">
              Verifying your identity
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Please wait while we securely process your documents. We're
              currently matching your facial biometrics with your provided ID.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={onNext}
            className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-6 bg-[#1152d4] text-white text-base font-bold transition-all hover:bg-[#1152d4]/90 shadow-lg shadow-[#1152d4]/25"
          >
            Complete KYC
          </button>
        </div>
      </div>

      {/* Footer Progress */}
      <div className="flex flex-col gap-4 p-6 bg-white dark:bg-slate-900 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex gap-6 justify-between items-center">
          <div className="flex flex-col">
            <p className="text-base font-bold">Verification Progress</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Biometric Face Scan (Step 7 of 11)
            </p>
          </div>
          <div className="bg-[#1152d4]/10 text-[#1152d4] px-3 py-1 rounded-full text-sm font-bold">
            63%
          </div>
        </div>
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-[#1152d4]"
            style={{ width: "63%" }}
          />
        </div>
        <div className="flex items-center gap-3 p-4 bg-[#1152d4]/5 rounded-lg border border-[#1152d4]/10">
          <span className="material-symbols-outlined text-[#1152d4]">
            security
          </span>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-snug">
            Your data is encrypted and handled in compliance with international
            security standards.
          </p>
        </div>
      </div>
      <div className="h-4 bg-white dark:bg-slate-900" />
    </div>
  );
}
