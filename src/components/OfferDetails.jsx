const emiSchedule = [
  { month: "Month 1", date: "Oct 15, 2023", amount: "$473.50", label: "Principal + Interest" },
  { month: "Month 2", date: "Nov 15, 2023", amount: "$473.50", label: "Standard Installment" },
  { month: "Month 3", date: "Dec 15, 2023", amount: "$473.50", label: "Standard Installment" },
];

export default function OfferDetails({ onBack, onNext }) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col max-w-md mx-auto bg-white dark:bg-[#101622] shadow-xl overflow-x-hidden font-['Inter'] text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center bg-white dark:bg-[#101622] p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={onBack}
          className="flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
          Offer Details
        </h2>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-3 p-4 bg-white dark:bg-[#101622]">
        <div className="flex gap-6 justify-between items-center">
          <p className="text-sm font-medium leading-normal">
            Step 6: Loan Selection
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-normal leading-normal uppercase tracking-wider">
            6 of 11
          </p>
        </div>
        <div className="rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden h-2">
          <div
            className="h-full rounded-full bg-[#1152d4]"
            style={{ width: "54.5%" }}
          />
        </div>
      </div>

      {/* Heading */}
      <div className="px-4 pt-6 pb-2">
        <h1 className="tracking-tight text-3xl font-bold leading-tight">
          Your Personalized Loan Offer
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          Review your custom terms and repayment schedule before proceeding.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-3 p-4">
        <div className="flex min-w-[140px] flex-1 flex-col gap-1 rounded-xl p-4 bg-[#1152d4]/5 border border-[#1152d4]/10">
          <p className="text-[#1152d4] text-xs font-semibold uppercase tracking-wider">
            Total Amount
          </p>
          <p className="tracking-tight text-2xl font-bold leading-tight">
            $15,000
          </p>
        </div>
        <div className="flex min-w-[140px] flex-1 flex-col gap-1 rounded-xl p-4 bg-[#1152d4]/5 border border-[#1152d4]/10">
          <p className="text-[#1152d4] text-xs font-semibold uppercase tracking-wider">
            Interest Rate
          </p>
          <p className="tracking-tight text-2xl font-bold leading-tight">
            8.5%{" "}
            <span className="text-sm font-normal text-slate-500">p.a.</span>
          </p>
        </div>
        <div className="flex min-w-full flex-col gap-1 rounded-xl p-4 bg-[#1152d4] text-white shadow-lg shadow-[#1152d4]/20">
          <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">
            Monthly EMI
          </p>
          <p className="tracking-tight text-3xl font-bold leading-tight">
            $473.50
          </p>
        </div>
      </div>

      {/* EMI Schedule */}
      <div className="px-4 py-4">
        <h3 className="text-lg font-bold leading-tight tracking-tight mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#1152d4]">
            calendar_month
          </span>
          EMI Schedule Breakdown
        </h3>
        <div className="space-y-3">
          {emiSchedule.map((row, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 ${
                i === 0
                  ? "bg-slate-50 dark:bg-slate-900/50"
                  : "bg-white dark:bg-transparent"
              }`}
            >
              <div className="flex flex-col">
                <span className="font-semibold">{row.month}</span>
                <span className="text-xs text-slate-500">{row.date}</span>
              </div>
              <div className="text-right">
                <p className="font-bold">{row.amount}</p>
                <p className="text-[10px] text-slate-400 uppercase">
                  {row.label}
                </p>
              </div>
            </div>
          ))}
          <button className="w-full py-2 text-[#1152d4] font-medium text-sm hover:underline">
            View Full 36-Month Schedule
          </button>
        </div>
      </div>

      {/* Total Repayment */}
      <div className="mx-4 mb-32 p-4 rounded-xl bg-slate-900 dark:bg-slate-800 text-white">
        <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-3">
          <span className="text-slate-400 text-sm">Principal Amount</span>
          <span className="font-medium">$15,000.00</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-3">
          <span className="text-slate-400 text-sm">
            Total Interest (36 mo)
          </span>
          <span className="font-medium">$2,046.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold">Total Repayment</span>
          <span className="text-xl font-bold">$17,046.00</span>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-white/80 dark:bg-[#101622]/80 backdrop-blur-md border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={onNext}
          className="w-full bg-[#1152d4] hover:bg-[#1152d4]/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#1152d4]/30 transition-all flex items-center justify-center gap-2"
        >
          Select this Offer
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-2 uppercase tracking-tighter">
          By clicking, you agree to the preliminary loan terms.
        </p>
      </div>
    </div>
  );
}
