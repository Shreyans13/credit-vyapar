const eligibleOffers = [
  {
    id: 1,
    icon: "account_balance",
    status: "Eligible",
    lender: "Lender Prime",
    maxAmount: "$12,500",
    interestRate: "5.49% Fixed APR",
    secondLabel: "Term Length",
    secondValue: "36 - 60 Months",
    note: "*No impact on credit score",
  },
  {
    id: 2,
    icon: "payments",
    status: "Eligible",
    lender: "Global Credit",
    maxAmount: "$8,000",
    interestRate: "6.25% Variable",
    secondLabel: "Processing Fee",
    secondValue: "$0 Fees",
    note: "Quick 24h funding",
  },
];

export default function LoanOffers({ onBack, onNext }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col mx-auto max-w-md bg-[#f6f6f8] dark:bg-[#101622] shadow-xl font-['Inter'] text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center bg-white dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 ml-2">
          Loan Offers
        </h2>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-3 p-4 bg-white dark:bg-slate-900">
        <div className="flex gap-6 justify-between items-center">
          <p className="text-base font-semibold">Review Soft Offers</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Step 5 of 11
          </p>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#1152d4] h-full rounded-full"
            style={{ width: "45%" }}
          />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Based on your preliminary info, these lenders have pre-qualified you.
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          Available Offers
        </h3>

        {/* Eligible Cards */}
        {eligibleOffers.map((offer) => (
          <div
            key={offer.id}
            className="group relative flex flex-col gap-4 rounded-xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-[#1152d4] transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3 items-center">
                <div className="size-12 rounded-lg bg-[#1152d4]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#1152d4]">
                    {offer.icon}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">
                    {offer.status}
                  </p>
                  <h4 className="text-lg font-bold">{offer.lender}</h4>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#1152d4]">
                  {offer.maxAmount}
                </p>
                <p className="text-xs text-slate-500">Max Amount</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-xs text-slate-500">Interest Rate</p>
                <p className="text-sm font-semibold">{offer.interestRate}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">{offer.secondLabel}</p>
                <p className="text-sm font-semibold">{offer.secondValue}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 italic">
                {offer.note}
              </span>
              <button
                onClick={onNext}
                className="flex items-center gap-1 text-sm font-bold text-[#1152d4] group-hover:translate-x-1 transition-transform"
              >
                Select Offer{" "}
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        ))}

        {/* Not Eligible Card */}
        <div className="opacity-60 grayscale relative flex flex-col gap-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 p-5 border border-dashed border-slate-300 dark:border-slate-700 cursor-not-allowed">
          <div className="flex items-start justify-between">
            <div className="flex gap-3 items-center">
              <div className="size-12 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-500">
                  domain_disabled
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Not Eligible
                </p>
                <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300">
                  Harbor Finance
                </h4>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            This lender requires a higher debt-to-income ratio than currently
            reported in your application.
          </p>
          <div className="flex items-center justify-end">
            <span className="text-xs font-medium text-slate-500">
              Ineligible for current profile
            </span>
          </div>
        </div>

        {/* Promo Banner */}
        <div className="rounded-xl bg-[#1152d4] p-4 text-white flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-bold">Need a higher amount?</p>
            <p className="text-xs opacity-90">
              Adding a co-signer might increase your eligibility for larger loan
              sums.
            </p>
          </div>
          <button className="bg-white text-[#1152d4] text-xs font-bold px-3 py-2 rounded-lg">
            Learn More
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex gap-2 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pb-6 pt-2 sticky bottom-0">
        <button className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 dark:text-slate-500">
          <span className="material-symbols-outlined">home</span>
          <p className="text-[10px] font-medium leading-none">Home</p>
        </button>
        <button className="flex flex-1 flex-col items-center justify-center gap-1 text-[#1152d4]">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            account_balance_wallet
          </span>
          <p className="text-[10px] font-bold leading-none">Loans</p>
        </button>
        <button className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 dark:text-slate-500">
          <span className="material-symbols-outlined">person</span>
          <p className="text-[10px] font-medium leading-none">Profile</p>
        </button>
      </div>
    </div>
  );
}
