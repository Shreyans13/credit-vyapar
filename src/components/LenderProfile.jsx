import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export function LenderProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sheetRef = useRef(null);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);

  // Get the eligible lender (HDFC is the only eligible one)
  const eligibleLender = {
    id: 'hdfc',
    name: 'HDFC Bank',
    subtitle: 'Pre-Approved',
    icon: 'account_balance',
    settlement: 'T+1',
    downpayment: '0% Required',
    emiOptions: '3/6/9/12 Months',
    interestRate: '12% p.a.',
    processingFee: '1.5% Fixed',
    approvalTime: 'Instant',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3trtrmR844V8MzkNQ5sphHb__kTiMWwQ14JZCc9bOzboyspVSKciGx922jvmkQlbejzGWsl9tlvV1auaCFivLW8VHaD2SVCq1t1TQTzN1ShfHA9-OMdBXOCGviNBQWWcAsvh7Y0bgFzhmdSv0_adcMMBSfeb7_H2bx1VnTbvFx3M86bwnd2UpCKERHEi6PEqQndus_i--zVjJnN5JKS4BX0J84873TpaG6yiqSFgoLzU3t7OF43-xyf2VLbdNuDrWdyqk0x48QhDv'
  };

  const handleChooseLender = () => {
    navigate('/agreement-signing');
  };

  // Touch/Mouse handlers for dragging
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
    const threshold = 50;
    
    if (diff > threshold) {
      setIsExpanded(true);
    } else if (diff < -threshold) {
      setIsExpanded(false);
    }
  };

  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleMouseDown = (e) => {
    handleStart(e.clientY);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased h-screen overflow-hidden">
      <div className="relative h-full w-full flex flex-col">
        {/* Background Content - Simple Info */}
        <div className="flex-1 p-6 space-y-6 overflow-hidden">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/eligible-lenders')}
              className="material-symbols-outlined text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors"
            >
              arrow_back
            </button>
            <h1 className="text-lg font-bold">Lender Details</h1>
            <button 
              onClick={() => alert('More information about financing options')}
              className="material-symbols-outlined text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors"
            >
              info
            </button>
          </div>

          {/* Simple Card Preview */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-emerald-500 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-white">account_balance</span>
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">{eligibleLender.name}</p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">{eligibleLender.subtitle}</p>
              </div>
              <span className="material-symbols-outlined text-emerald-500">check_circle</span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20">
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              {isExpanded ? 'Drag down to see less details' : 'Drag up to see full details'}
            </p>
          </div>
        </div>

        {/* Expandable Bottom Sheet with Full Lender Details */}
        <div 
          ref={sheetRef}
          className={`absolute left-0 right-0 bg-background-light dark:bg-background-dark rounded-t-[2rem] shadow-2xl transition-all duration-300 ease-out ${
            isExpanded ? 'top-0 h-full rounded-t-none' : 'top-[35%] h-[65%]'
          }`}
          style={{
            boxShadow: isExpanded ? 'none' : '0 -4px 20px rgba(0, 0, 0, 0.15)'
          }}
        >
          {/* Drag Handle */}
          <div 
            className="sticky top-0 bg-inherit flex flex-col items-center justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing z-10"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-600 mb-2"></div>
            <p className="text-xs text-slate-400 font-medium">
              {isExpanded ? 'Drag down to collapse' : 'Drag up to expand'}
            </p>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto h-[calc(100%-60px)] px-6">
            {/* Lender Profile Header */}
            <div className="flex flex-col gap-6 items-center pt-4 pb-6">
              <div className="flex gap-4 flex-col items-center">
                <div className="bg-primary/10 flex items-center justify-center rounded-full min-h-24 w-24 relative">
                  <img 
                    src={eligibleLender.logo}
                    alt={eligibleLender.name}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="absolute bottom-1 right-1 bg-green-500 h-6 w-6 rounded-full border-2 border-background-light dark:border-background-dark flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xs">verified</span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-tight">{eligibleLender.name}</h2>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="material-symbols-outlined text-emerald-500 text-sm">verified_user</span>
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold uppercase tracking-wider">Pre-Approved Partner</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Settlement</p>
                  <p className="text-slate-900 dark:text-white text-lg font-bold">{eligibleLender.settlement}</p>
                </div>
                <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Downpayment</p>
                  <p className="text-slate-900 dark:text-white text-lg font-bold">{eligibleLender.downpayment}</p>
                </div>
                <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">EMI Options</p>
                  <p className="text-slate-900 dark:text-white text-lg font-bold">{eligibleLender.emiOptions}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
                <div className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-lg">percent</span>
                    <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Interest Rate</p>
                  </div>
                  <p className="text-slate-900 dark:text-white text-sm font-bold">{eligibleLender.interestRate}</p>
                </div>
                <div className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-lg">receipt_long</span>
                    <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Processing Fee</p>
                  </div>
                  <p className="text-slate-900 dark:text-white text-sm font-bold">{eligibleLender.processingFee}</p>
                </div>
                <div className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-lg">schedule</span>
                    <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Approval Time</p>
                  </div>
                  <p className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">{eligibleLender.approvalTime}</p>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800 mb-6">
              <h3 className="font-semibold text-emerald-900 dark:text-emerald-400 mb-3">Why {eligibleLender.name}?</h3>
              <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-300">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm mt-0.5">check_circle</span>
                  <span>Instant approval - no waiting time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm mt-0.5">check_circle</span>
                  <span>Lowest interest rate at {eligibleLender.interestRate}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm mt-0.5">check_circle</span>
                  <span>Zero downpayment required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm mt-0.5">check_circle</span>
                  <span>Flexible EMI options up to 12 months</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm mt-0.5">check_circle</span>
                  <span>Fast T+1 settlement</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pb-8">
              <button 
                onClick={handleChooseLender}
                className="flex w-full items-center justify-center rounded-xl h-14 bg-primary text-white text-base font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
              >
                <span className="truncate">Proceed with {eligibleLender.name}</span>
              </button>
              <button 
                onClick={() => setIsExpanded(false)}
                className="flex w-full items-center justify-center rounded-xl h-14 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-base font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="truncate">Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
