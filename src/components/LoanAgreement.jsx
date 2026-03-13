import { useState } from "react";
import { z } from "zod";

const agreementSections = [
  {
    title: "1. LOAN AMOUNT & INTEREST",
    content:
      "The Lender agrees to provide a loan of $15,000.00 to the Borrower. The Annual Percentage Rate (APR) is fixed at 5.9%. Interest begins to accrue from the date of disbursement.",
  },
  {
    title: "2. REPAYMENT SCHEDULE",
    content:
      "Monthly installments of $455.00 shall be due on the 1st of each calendar month for a period of 36 months. Payments should be made through the authorized digital portal.",
  },
  {
    title: "3. LATE FEES & PENALTIES",
    content:
      "A grace period of five (5) days is allowed. Any payment received after the 5th of the month will incur a late fee of $25.00 or 5% of the overdue balance, whichever is greater.",
  },
  {
    title: "4. PREPAYMENT",
    content:
      "The Borrower has the right to prepay the whole or any part of the loan amount at any time without penalty. All prepayments will be applied first to accrued interest and then to the principal balance.",
  },
  {
    title: "5. DATA PRIVACY",
    content:
      "By signing this agreement, the borrower acknowledges our data protection policy. Financial data is encrypted using industry-standard protocols and shared only with verified credit bureaus.",
  },
  {
    title: "6. DEFAULT",
    content:
      "Failure to make two consecutive payments constitutes a default. In the event of default, the Lender may declare the entire unpaid principal balance and accrued interest immediately due.",
  },
];

// Zod validation schema
const agreementSchema = z.object({
  agreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export default function LoanAgreement({ onBack, onNext }) {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const handleSign = () => {
    try {
      agreementSchema.parse({ agreed });
      setError("");
      onNext();
    } catch (err) {
      setError(err.errors?.[0]?.message || "You must agree to the terms");
    }
  };

  const handleAgreeChange = (e) => {
    setAgreed(e.target.checked);
    if (error) setError("");
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-900 min-h-screen flex flex-col shadow-xl font-['Inter'] text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="flex items-center p-4 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">
          Loan Agreement
        </h2>
      </header>

      {/* Progress */}
      <div className="p-6">
        <div className="flex justify-between items-end mb-2">
          <span className="font-semibold text-sm uppercase tracking-wider">
            Application Progress
          </span>
          <span className="text-[#1152d4] font-bold text-sm">
            Step 9 of 11
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#1152d4] h-full transition-all duration-500"
            style={{ width: "81.8%" }}
          />
        </div>
      </div>

      <main className="flex-1 px-6 pb-24 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Review & Sign Agreement</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Please read the following terms and conditions carefully. This
            document is a legally binding contract regarding your personal loan.
          </p>
        </div>

        {/* Agreement Container */}
        <div className="relative bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-6">
          <div className="h-80 overflow-y-scroll pr-2 text-slate-700 dark:text-slate-300 text-sm space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
            {agreementSections.map((section) => (
              <section key={section.title}>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {section.title}
                </h4>
                <p>{section.content}</p>
              </section>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-50 dark:from-slate-800/80 to-transparent pointer-events-none rounded-b-xl" />
        </div>

        {/* Consent Checkbox */}
        <div className={`rounded-xl p-4 border ${error ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-[#1152d4]/20 bg-[#1152d4]/5 dark:bg-[#1152d4]/10"}`}>
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="pt-0.5">
              <input
                checked={agreed}
                onChange={handleAgreeChange}
                className="w-5 h-5 rounded border-slate-300 text-[#1152d4] focus:ring-[#1152d4] dark:border-slate-600 dark:bg-slate-700"
                type="checkbox"
              />
            </div>
            <span className="text-sm font-medium leading-tight">
              I have read and agree to the Terms of Service, Loan Disclosure
              Statement, and Privacy Policy.
            </span>
          </label>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </main>

      {/* Fixed Footer */}
      <footer className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky bottom-0">
        <button
          onClick={handleSign}
          className="w-full bg-[#1152d4] hover:bg-[#1152d4]/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#1152d4]/20 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">draw</span>
          Sign Agreement
        </button>
        <p className="text-center text-slate-500 dark:text-slate-400 text-xs mt-4">
          This will create a legally binding electronic signature.
        </p>
      </footer>
    </div>
  );
}
