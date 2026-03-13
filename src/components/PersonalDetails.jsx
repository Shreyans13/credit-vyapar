import { useState } from "react";
import { z } from "zod";

const TOTAL_STEPS = 11;
const CURRENT_STEP = 3;

// Zod validation schema - using coerce for number fields
const personalDetailsSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name should only contain letters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name should only contain letters"),
  email: z.string().email("Invalid email address"),
  gender: z.string().min(1, "Please select a gender"),
  age: z.coerce
    .number({ invalid_type_error: "Age must be a number" })
    .min(18, "Age must be at least 18")
    .max(120, "Age must be at most 120"),
  employmentType: z.string().min(1, "Please select employment type"),
  monthlyIncome: z.coerce
    .number({ invalid_type_error: "Income must be a number" })
    .min(1, "Income must be greater than 0"),
  employerName: z.string().min(2, "Employer name must be at least 2 characters"),
  homeOwnership: z.string().min(1, "Please select home ownership status"),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
});

export default function PersonalDetails({ onBack, onNext }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    age: "",
    employmentType: "",
    monthlyIncome: "",
    employerName: "",
    homeOwnership: "",
    industry: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, homeOwnership: value }));
    if (errors.homeOwnership) {
      setErrors((prev) => ({ ...prev, homeOwnership: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      personalDetailsSchema.parse(formData);
      setErrors({});
      onNext?.();
    } catch (error) {
      console.log("Validation errors:", error.errors);
      const formattedErrors = {};
      error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClasses = "w-full rounded-lg bg-white dark:bg-slate-800 h-14 px-4 transition-all border";
    if (errors[fieldName]) {
      return `${baseClasses} border-red-500 focus:ring-1 focus:ring-red-500 focus:border-red-500`;
    }
    return `${baseClasses} border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-[#eebd2b] focus:border-[#eebd2b]`;
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#0f172a] font-['Public_Sans'] text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-4 justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 text-[#0f172a] dark:text-slate-100"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-lg font-bold leading-tight tracking-tight text-[#0f172a] dark:text-slate-100 font-['Playfair_Display',serif]">
            Profile Data Entry
          </h2>
        </div>
        <button className="text-[#eebd2b] font-semibold text-sm uppercase tracking-wider">
          Save & Exit
        </button>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-6 sm:p-8">
        {/* Progress */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="flex w-full flex-row items-center justify-center gap-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full ${
                  i < CURRENT_STEP
                    ? "w-8 bg-[#eebd2b]"
                    : "w-2 bg-slate-200 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] font-bold text-[#0f172a] dark:text-[#eebd2b] uppercase tracking-[0.2em]">
              Step {CURRENT_STEP} of {TOTAL_STEPS}
            </span>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-1">
              Personal & Professional Details - 27% Complete
            </p>
          </div>
        </div>

        <form className="space-y-10" onSubmit={handleSubmit}>
          {/* Personal Details */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#eebd2b]/10 text-[#eebd2b]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] dark:text-slate-100 font-['Playfair_Display',serif]">
                Personal Details
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <label className="flex flex-col">
                <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider pb-2">First Name</span>
                <input className={getInputClassName("firstName")} placeholder="e.g. John" type="text" value={formData.firstName} onChange={handleChange("firstName")} />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </label>
              <label className="flex flex-col">
                <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider pb-2">Last Name</span>
                <input className={getInputClassName("lastName")} placeholder="e.g. Doe" type="text" value={formData.lastName} onChange={handleChange("lastName")} />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </label>
              <label className="flex flex-col sm:col-span-2">
                <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider pb-2">Email</span>
                <input className={getInputClassName("email")} placeholder="john.doe@example.com" type="email" value={formData.email} onChange={handleChange("email")} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </label>
              <label className="flex flex-col">
                <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider pb-2">Gender</span>
                <select className={getInputClassName("gender")} value={formData.gender} onChange={handleChange("gender")}>
                  <option disabled value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </label>
              <label className="flex flex-col">
                <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider pb-2">Age</span>
                <input className={getInputClassName("age")} min="18" max="120" placeholder="e.g. 25" type="number" value={formData.age} onChange={handleChange("age")} />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
              </label>
            </div>
          </section>

          {/* Professional Details */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#eebd2b]/10 text-[#eebd2b]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] dark:text-slate-100 font-['Playfair_Display',serif]">
                Professional Details
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <label className="flex flex-col">
                <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider pb-2">Employment Type</span>
                <select className={getInputClassName("employmentType")} value={formData.employmentType} onChange={handleChange("employmentType")}>
                  <option disabled value="">Select employment type</option>
                  <option value="salaried">Salaried</option>
                  <option value="self-employed">Self-employed</option>
                </select>
                {errors.employmentType && <p className="text-red-500 text-xs mt-1">{errors.employmentType}</p>}
              </label>
              <label className="flex flex-col">
                <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider pb-2">Monthly Income</span>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-slate-400">$</span>
                  <input className={`${getInputClassName("monthlyIncome")} pl-8`} placeholder="0.00" min="0" step="0.01" type="number" value={formData.monthlyIncome} onChange={handleChange("monthlyIncome")} />
                </div>
                {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome}</p>}
              </label>
              <label className="flex flex-col">
                <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider pb-2">Employer Name</span>
                <input className={getInputClassName("employerName")} placeholder="e.g. Acme Corp" type="text" value={formData.employerName} onChange={handleChange("employerName")} />
                {errors.employerName && <p className="text-red-500 text-xs mt-1">{errors.employerName}</p>}
              </label>
            </div>
          </section>

          {/* Additional Details */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#eebd2b]/10 text-[#eebd2b]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>more_horiz</span>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] dark:text-slate-100 font-['Playfair_Display',serif]">
                Additional Details
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <div className="flex flex-col">
                <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider pb-2">Home Ownership Status</span>
                <div className="grid grid-cols-2 gap-4">
                  {["Own House", "Rented"].map((label) => {
                    const value = label === "Own House" ? "own" : "rent";
                    const isSelected = formData.homeOwnership === value;
                    const hasError = errors.homeOwnership && !isSelected;
                    return (
                      <label key={value} className={`relative flex cursor-pointer rounded-lg border p-4 bg-white dark:bg-slate-800 transition-all hover:border-[#eebd2b]/50 ${isSelected ? "border-[#eebd2b] border-2" : hasError ? "border-red-500" : "border-slate-200 dark:border-slate-700"}`}>
                        <input className="sr-only" name="home_status" type="radio" value={value} checked={isSelected} onChange={() => handleRadioChange(value)} />
                        <div className="flex w-full items-center justify-between">
                          <span className="text-sm font-semibold">{label}</span>
                          {isSelected && (
                            <span className="material-symbols-outlined text-[#eebd2b]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
                {errors.homeOwnership && <p className="text-red-500 text-xs mt-1">{errors.homeOwnership}</p>}
              </div>
              <label className="flex flex-col">
                <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider pb-2">Industry of Work</span>
                <input className={getInputClassName("industry")} placeholder="e.g. Technology, Healthcare, Finance" type="text" value={formData.industry} onChange={handleChange("industry")} />
                {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
              </label>
            </div>
          </section>

          {/* Navigation Buttons */}
          <div className="flex flex-col gap-4 pt-6 pb-12">
            <button type="submit" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-16 px-5 bg-[#0f172a] text-white text-lg font-semibold leading-normal tracking-[0.015em] w-full shadow-xl shadow-[#0f172a]/10 active:scale-[0.98] transition-all border-b-4 border-[#eebd2b]">
              Next Step
            </button>
            <button type="button" onClick={onBack} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-transparent text-[#0f172a] dark:text-[#eebd2b] text-base font-semibold leading-normal tracking-[0.05em] uppercase w-full hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              Back
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="p-8 bg-slate-50 dark:bg-slate-900/50 text-center border-t border-slate-100 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Need help?{" "}
          <button className="text-[#eebd2b] font-semibold underline decoration-[#eebd2b]/30 underline-offset-4">
            Contact support
          </button>
        </p>
      </footer>
    </div>
  );
}
