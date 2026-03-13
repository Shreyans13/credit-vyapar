import { useState } from "react";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDRxyx-1Y6V_HEoiNA6-VJrM-1tClvHL5IxcQshsxSWwT9y2_lhFEBT_EkCm1xgl2fJWPhO9vbF4CsducKlVUp6hSLF5c1GZbZwHzz_qRSQOjYq5gzBhY8iVq-EA6vct8fHPcTVl1SabJ7mlhmZ9X1_U7G4pGWDAFwq-BERMsCHEhQq6SZR40Us_4vXAgo81bLh2G1x9S_5hm4haevCX-yj6FyvKZMSUT2dZg5oX7cEppxkvGpO6t8wyLjEmpT3hGyveOTN89WUK8Ex";

const TOTAL_STEPS = 11;
const CURRENT_STEP = 1;

const features = [
  {
    icon: "speed",
    title: "Fast Approval",
    description: "Automated credit scoring for instant decisions.",
  },
  {
    icon: "security",
    title: "Secure Process",
    description: "Bank-grade encryption for all your data.",
  },
];

export default function Onboarding({ onNext }) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#101622] font-['Inter'] text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* Top Navigation */}
      <div className="flex items-center p-4 pb-2 justify-between">
        <div className="text-[#1152d4] flex size-12 shrink-0 items-center justify-start">
          <span className="material-symbols-outlined text-[32px]">account_balance</span>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          CapitalGrow
        </h2>
      </div>

      {/* Hero Image */}
      <div className="px-0 sm:px-4 sm:py-3">
        <div
          className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#1152d4]/10 sm:rounded-xl min-h-[400px] relative"
          style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#f6f6f8]/80 dark:from-[#101622]/80 to-transparent" />
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 -mt-10 bg-[#f6f6f8] dark:bg-[#101622] rounded-t-3xl px-6 pt-8 pb-10">
        <h1 className="tracking-tight text-[32px] font-bold leading-tight text-center pb-3">
          Get your loan in minutes
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed pb-8 px-4 text-center">
          Simple, fast, and secure financing to help your business grow. Access
          funds immediately upon approval.
        </p>

        {/* Progress Indicator */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="flex w-full flex-row items-center justify-center gap-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full ${
                  i < CURRENT_STEP
                    ? "w-6 bg-[#1152d4]"
                    : "w-2 bg-[#1152d4]/20 dark:bg-[#1152d4]/10"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-[#1152d4] uppercase tracking-wider">
            Step {CURRENT_STEP} of {TOTAL_STEPS}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onNext}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-[#1152d4] text-white text-lg font-bold leading-normal tracking-[0.015em] w-full shadow-lg shadow-[#1152d4]/20 active:scale-[0.98] transition-transform"
          >
            Get Started
          </button>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-transparent text-[#1152d4] text-base font-semibold leading-normal tracking-[0.015em] w-full">
            Learn more
          </button>
        </div>
      </div>

      {/* Features List */}
      <div className="px-6 pb-12 flex flex-col gap-6">
        {features.map((feature) => (
          <div key={feature.icon} className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#1152d4]/10 text-[#1152d4]">
              <span className="material-symbols-outlined">{feature.icon}</span>
            </div>
            <div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-10" />
    </div>
  );
}
