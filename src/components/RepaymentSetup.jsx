const AUTOPAY_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBK2jGvp42hUJCM4rBXgbmJGuDtQQpniJR9ko5UzSN8ixuvQVtwrNuZxKrHuGsptj4IvNB9_yeSFyTiFhAxSkyGvBxts4m5Et61GP0RPLzZLqd2FVR7jj9GVjcInfFTSIq6IVpIaX3CMGGSvH8H6-j0EnUSeBIyI7RueTrQaF1YzDsENVm-HVYs5DSS93ssVpKqXZ5A2mn0J7Qrb8ChL2Pp2qDVu_f5BSe40TsrPdhfY114wgl3TQ9YpQKBYMINP9mwTvacoH2n1GSA";

const features = [
  {
    icon: "verified_user",
    title: "Secure Authentication",
    description: "Bank-grade security protocols",
  },
  {
    icon: "calendar_today",
    title: "Automated Schedule",
    description: "No more manual payment tracking",
  },
  {
    icon: "notifications_active",
    title: "Instant Notifications",
    description: "Alerts before every transaction",
  },
];

export default function RepaymentSetup({ onBack, onNext }) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#101622] overflow-x-hidden max-w-md mx-auto shadow-xl font-['Inter'] text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between border-b border-[#1152d4]/10">
        <button
          onClick={onBack}
          className="flex size-12 shrink-0 items-center justify-start cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">
            arrow_back
          </span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1">
          Repayment Setup
        </h2>
        <div className="size-12" />
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-3 p-6">
        <div className="flex gap-6 justify-between">
          <p className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal uppercase tracking-wider">
            Setup Progress
          </p>
          <p className="text-[#1152d4] text-sm font-bold leading-normal">
            8 of 11
          </p>
        </div>
        <div className="rounded-full bg-[#1152d4]/10 h-2.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#1152d4] transition-all duration-500"
            style={{ width: "72.7%" }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-8">
        <div className="w-24 h-24 bg-[#1152d4]/10 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[#1152d4] text-5xl">
            account_balance
          </span>
        </div>
        <h2 className="tracking-tight text-3xl font-bold leading-tight text-center pb-4">
          Set up Autopay
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed text-center pb-8">
          Enable e-mandate to ensure timely repayments and avoid late fees.
          Secure, automated, and hassle-free payments directly from your bank
          account.
        </p>

        {/* Feature List */}
        <div className="w-full space-y-4 mb-10">
          {features.map((feature) => (
            <div
              key={feature.icon}
              className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-[#1152d4]/5"
            >
              <span className="material-symbols-outlined text-[#1152d4]">
                {feature.icon}
              </span>
              <div>
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual */}
        <div
          className="w-full h-48 bg-center bg-no-repeat bg-cover rounded-xl mb-10 shadow-lg border-2 border-white dark:border-slate-700"
          style={{ backgroundImage: `url("${AUTOPAY_IMAGE}")` }}
        />
      </div>

      {/* Footer Action */}
      <div className="p-6 bg-white dark:bg-slate-900 border-t border-[#1152d4]/10 mt-auto">
        <button
          onClick={onNext}
          className="w-full bg-[#1152d4] hover:bg-[#1152d4]/90 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-[#1152d4]/20 transition-all flex items-center justify-center gap-2"
        >
          <span>Setup Repayment</span>
          <span className="material-symbols-outlined text-lg">
            arrow_forward
          </span>
        </button>
        <p className="text-slate-400 dark:text-slate-500 text-center text-xs mt-4">
          By clicking setup, you agree to our{" "}
          <button className="text-[#1152d4] underline">
            e-mandate terms
          </button>
        </p>
      </div>
    </div>
  );
}
