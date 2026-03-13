const SUCCESS_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDh8OQQpzNvELMMX5wdAeXSw4GFzU0mODK04qP87APM7-2t4KL4BPzzo9sDex3m3Vyc-gwK_popHl55VfI7u_vg_m75NaoqDJobD0srF-WS1y9e-MeDr0TZpIwg9o0dQgCzPLj1ferk_NDP0BiaimFNbRSO9kizwfsuTfKI768TkGecO38VxdUdUxYe0NNioTEpXLGpJ93TeopKDCYkfL1sZExgSoZGs4-g7m7sydapMALOT4_vie9LUn6XNX6QBoGVFB4FjD6SelQJ";

export default function LoanGranted() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col max-w-md mx-auto bg-white dark:bg-slate-900 shadow-xl overflow-x-hidden font-['Inter'] text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center bg-white dark:bg-slate-900 p-4 pb-2 justify-between">
        <div className="text-[#1152d4] flex size-12 shrink-0 items-center justify-center">
          <span className="material-symbols-outlined text-3xl">
            check_circle
          </span>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Success
        </h2>
      </div>

      {/* Progress (complete) */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between items-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-normal">
            Application Complete
          </p>
          <p className="text-[#1152d4] text-sm font-bold leading-normal">
            11 of 11
          </p>
        </div>
        <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#1152d4]"
            style={{ width: "100%" }}
          />
        </div>
      </div>

      {/* Success Header */}
      <div className="flex flex-col items-center pt-8 pb-4 px-4">
        <div className="w-20 h-20 bg-[#1152d4]/10 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[#1152d4] text-5xl">
            celebration
          </span>
        </div>
        <h1 className="tracking-tight text-3xl font-bold leading-tight text-center">
          Loan Successfully Granted!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm text-center mt-2 px-6">
          Your funds are being prepared and will be deposited into your linked
          bank account shortly.
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 p-4">
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal uppercase tracking-wider">
            Loan Amount
          </p>
          <p className="text-[#1152d4] tracking-tight text-3xl font-bold leading-tight">
            $10,000
          </p>
        </div>
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal uppercase tracking-wider">
            First EMI Date
          </p>
          <p className="tracking-tight text-2xl font-bold leading-tight">
            Oct 15, 2023
          </p>
        </div>
      </div>

      {/* Celebratory Content */}
      <div className="flex flex-col px-4 py-6 flex-grow">
        <div className="flex flex-col items-center gap-6">
          <div
            className="bg-center bg-no-repeat aspect-video bg-cover rounded-xl w-full max-w-[360px] shadow-sm"
            style={{ backgroundImage: `url("${SUCCESS_IMAGE}")` }}
          />
          <div className="flex max-w-[480px] flex-col items-center gap-2">
            <p className="text-xl font-bold leading-tight tracking-[-0.015em] text-center">
              Congratulations!
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed text-center px-4">
              You've completed all the steps. Your loan agreement has been
              digitally signed and a copy has been sent to your email.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 mt-auto">
        <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-[#1152d4] text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-[#1152d4]/25 hover:bg-[#1152d4]/90 transition-colors">
          Go to Dashboard
        </button>
        <button className="flex w-full mt-3 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-transparent text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          Download Receipt
        </button>
      </div>
      <div className="h-5 bg-white dark:bg-slate-900" />
    </div>
  );
}
