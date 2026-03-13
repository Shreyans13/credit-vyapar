import { useState } from "react";
import { z } from "zod";

const personalDetails = [
  { label: "Full Name", value: "John Alexander Doe" },
  { label: "Date of Birth", value: "January 01, 1990" },
  { label: "Email", value: "john.doe@example.com" },
  { label: "Gender / Age", value: "Male, 33" },
];

const professionalDetails = [
  { label: "Employment Type", value: "Salaried" },
  { label: "Monthly Income", value: "$5,000" },
  { label: "Industry", value: "Technology" },
];

const contactDetails = [
  { label: "Phone Number", value: "+1 (555) 012-3456" },
  { label: "Address", value: "123 Maple Avenue, Springfield, IL 62704" },
];

// Zod validation schema
const consentSchema = z.object({
  consentChecked: z.boolean().refine((val) => val === true, {
    message: "You must consent to the credit bureau check",
  }),
});

function DetailSection({ title, items, onEdit }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-[#1152d4] text-xs font-bold uppercase tracking-widest">
          {title}
        </h4>
        <button
          onClick={onEdit}
          className="text-[#1152d4] text-xs font-semibold flex items-center gap-0.5 hover:underline"
        >
          <span className="material-symbols-outlined text-[14px]">edit</span>{" "}
          Edit
        </button>
      </div>
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800 space-y-3">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`flex justify-between items-start ${
              i > 0
                ? "pt-3 border-t border-slate-200/60 dark:border-slate-700/60"
                : ""
            }`}
          >
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase">
              {item.label}
            </p>
            <p className="text-sm font-semibold text-right max-w-[200px]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function VerificationSummary({ onBack, onNext }) {
  const [consentChecked, setConsentChecked] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = () => {
    try {
      consentSchema.parse({ consentChecked });
      setError("");
      onNext();
    } catch (err) {
      setError(err.errors?.[0]?.message || "Consent is required");
    }
  };

  const handleConsentChange = (e) => {
    setConsentChecked(e.target.checked);
    if (error) setError("");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-slate-900 shadow-xl flex flex-col font-['Inter'] text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={onBack}
          className="text-[#1152d4] flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-[#1152d4]/10 cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Data Verification
        </h2>
        <div className="size-10" />
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-3 p-6">
        <div className="flex gap-6 justify-between items-end">
          <p className="text-base font-semibold leading-normal">
            Step 4: Verification
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal uppercase tracking-wider">
            4 of 11
          </p>
        </div>
        <div className="rounded-full bg-slate-200 dark:bg-slate-800 h-2.5 w-full overflow-hidden">
          <div
            className="h-full rounded-full bg-[#1152d4]"
            style={{ width: "36%" }}
          />
        </div>
      </div>

      {/* Section Header */}
      <div className="px-6 py-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-[#1152d4] text-xl">
            fact_check
          </span>
          <h3 className="text-xl font-bold leading-tight tracking-tight">
            Review Your Information
          </h3>
        </div>
      </div>

      {/* Summary Content */}
      <div className="px-6 py-2 space-y-6 overflow-y-auto">
        <DetailSection title="Personal Details" items={personalDetails} onEdit={() => {}} />
        <DetailSection title="Professional Details" items={professionalDetails} onEdit={() => {}} />
        <DetailSection title="Contact Details" items={contactDetails} onEdit={() => {}} />
      </div>

      {/* Consent */}
      <div className="px-6 py-6 mt-auto">
        <div className={`bg-[#1152d4]/5 dark:bg-[#1152d4]/10 border rounded-xl p-4 ${error ? "border-red-500" : "border-[#1152d4]/20"}`}>
          <label className="flex gap-x-4 cursor-pointer">
            <div className="relative flex items-start pt-0.5">
              <input
                checked={consentChecked}
                onChange={handleConsentChange}
                className="h-6 w-6 rounded border-[#1152d4]/30 text-[#1152d4] focus:ring-[#1152d4] focus:ring-offset-0 bg-white dark:bg-slate-800 transition-all cursor-pointer"
                type="checkbox"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold leading-tight">
                Bureau Consent
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                I consent to the credit bureau report check. I understand this
                may impact my credit score and is required for the application
                process.
              </p>
            </div>
          </label>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>

      {/* Action Button */}
      <div className="px-6 pb-8 pt-2">
        <button
          onClick={handleContinue}
          className="w-full bg-[#1152d4] hover:bg-[#1152d4]/90 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-[#1152d4]/20 transition-all flex items-center justify-center gap-2"
        >
          <span>Verify & Continue</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <p className="text-center text-slate-400 dark:text-slate-500 text-[10px] mt-4 uppercase tracking-widest font-medium">
          Secure 256-bit SSL Encrypted Connection
        </p>
      </div>
    </div>
  );
}
