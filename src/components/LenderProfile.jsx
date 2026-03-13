import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import {
  ArrowLeft,
  Info,
  CheckCircle2,
  ShieldCheck,
  Percent,
  ReceiptText,
  Clock,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';

export function LenderProfile() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);

  const eligibleLender = {
    name: 'HDFC Bank',
    subtitle: 'Eligible',
    settlement: 'T+1',
    downpayment: '0%',
    emiOptions: '3–12 Mo.',
    interestRate: '12% p.a.',
    processingFee: '1.5% Fixed',
    approvalTime: 'Instant',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3trtrmR844V8MzkNQ5sphHb__kTiMWwQ14JZCc9bOzboyspVSKciGx922jvmkQlbejzGWsl9tlvV1auaCFivLW8VHaD2SVCq1t1TQTzN1ShfHA9-OMdBXOCGviNBQWWcAsvh7Y0bgFzhmdSv0_adcMMBSfeb7_H2bx1VnTbvFx3M86bwnd2UpCKERHEi6PEqQndus_i--zVjJnN5JKS4BX0J84873TpaG6yiqSFgoLzU3t7OF43-xyf2VLbdNuDrWdyqk0x48QhDv',
  };

  // Drag handlers
  const handleStart = (clientY) => {
    setIsDragging(true);
    startYRef.current = clientY;
    currentYRef.current = clientY;
  };
  const handleMove = (clientY) => {
    if (!isDragging) return;
    currentYRef.current = clientY;
  };
  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = startYRef.current - currentYRef.current;
    if (diff > 40) setIsExpanded(true);
    else if (diff < -40) setIsExpanded(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-100 dark:bg-slate-950 font-display text-slate-900 dark:text-slate-100">

      {/* ── Background: header + lender hero ── */}
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <button
            onClick={() => navigate('/eligible-lenders')}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-base font-bold">Lender Details</h1>
          <button
            onClick={() => alert('More information about financing options')}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <Info size={20} />
          </button>
        </div>

        {/* Lender Hero */}
        <div className="flex flex-col items-center gap-3 pt-6 pb-4 px-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center overflow-hidden">
              <img
                src={eligibleLender.logo}
                alt={eligibleLender.name}
                className="w-16 h-16 object-contain"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-emerald-500 w-7 h-7 rounded-full border-2 border-slate-100 dark:border-slate-950 flex items-center justify-center">
              <CheckCircle2 size={14} className="text-white" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">{eligibleLender.name}</h2>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                Eligible Partner
              </span>
            </div>
          </div>

          {/* Quick stat pills */}
          <div className="flex gap-2 mt-1 flex-wrap justify-center">
            {[
              { label: 'Settlement', value: eligibleLender.settlement },
              { label: 'Downpayment', value: eligibleLender.downpayment },
              { label: 'EMI', value: eligibleLender.emiOptions },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-center shadow-sm"
              >
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">{s.label}</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Sheet ── */}
      <div
        className={`absolute left-0 right-0 bottom-0 bg-white dark:bg-slate-900 rounded-t-3xl transition-all duration-300 ease-out flex flex-col ${
          isExpanded ? 'top-0 rounded-t-none' : 'top-[52%]'
        }`}
        style={{ boxShadow: '0 -4px 30px rgba(0,0,0,0.12)' }}
      >
        {/* Drag handle */}
        <div
          className="flex flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing shrink-0"
          onTouchStart={(e) => handleStart(e.touches[0].clientY)}
          onTouchMove={(e) => handleMove(e.touches[0].clientY)}
          onTouchEnd={handleEnd}
          onMouseDown={(e) => handleStart(e.clientY)}
          onMouseMove={(e) => handleMove(e.clientY)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
        >
          <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <button
            onClick={() => setIsExpanded((v) => !v)}
            className="flex items-center gap-1 mt-1.5 text-xs text-slate-400 font-medium select-none"
          >
            <ChevronUp
              size={14}
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
            {isExpanded ? 'Collapse' : 'See full details'}
          </button>
        </div>

        {/* Scrollable detail content */}
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          {/* Rates list */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700 mb-4">
            <div className="flex justify-between items-center px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <Percent size={15} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Interest Rate</span>
              </div>
              <span className="text-sm font-bold">{eligibleLender.interestRate}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <ReceiptText size={15} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Processing Fee</span>
              </div>
              <span className="text-sm font-bold">{eligibleLender.processingFee}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <Clock size={15} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Approval Time</span>
              </div>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{eligibleLender.approvalTime}</span>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-4 mb-5">
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-3">
              Why {eligibleLender.name}?
            </p>
            <ul className="space-y-2">
              {[
                'Instant approval — no waiting time',
                `Lowest interest rate at ${eligibleLender.interestRate}`,
                'Zero downpayment required',
                'Flexible EMI options up to 12 months',
                'Fast T+1 settlement',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate('/agreement-signing')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl h-14 bg-primary text-white text-base font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-[0.98] transition-all"
          >
            Proceed with {eligibleLender.name}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
