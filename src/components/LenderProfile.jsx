import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function LenderProfile() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [selectedLender, setSelectedLender] = useState('swift');

  const lenders = {
    global: {
      id: 'global',
      name: 'Global Finance Ltd.',
      subtitle: 'Interest from 12% p.a.',
      icon: 'account_balance',
      isSelected: false,
      settlement: 'T+2',
      downpayment: '0% Required',
      emiOptions: '3/6/9/12 Months',
      interestRate: '12% p.a.',
      processingFee: '1.5% Fixed',
      approvalTime: '4-6 Hours'
    },
    swift: {
      id: 'swift',
      name: 'Swift Capital Partners',
      subtitle: 'Instant Approval',
      icon: 'bolt',
      isSelected: true,
      settlement: 'T+1',
      downpayment: '10% Required',
      emiOptions: '3/6/9 Months',
      interestRate: '14% p.a.',
      processingFee: '2.0% Fixed',
      approvalTime: 'Instant'
    }
  };

  const handleChooseLender = () => {
    navigate('/agreement-signing');
  };

  const handleCardClick = (lenderId) => {
    setSelectedLender(lenderId);
    setShowModal(true);
  };

  const currentLender = lenders[selectedLender];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden">
        <div className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/eligible-lenders')}
              className="material-symbols-outlined text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors"
            >
              arrow_back
            </button>
            <h1 className="text-lg font-bold">Select Financing</h1>
            <button 
              onClick={() => alert('More information about financing options')}
              className="material-symbols-outlined text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors"
            >
              info
            </button>
          </div>

          <div className="space-y-4">
            {/* Global Finance Card */}
            <div 
              onClick={() => handleCardClick('global')}
              className={`p-4 rounded-xl bg-white dark:bg-slate-800 border shadow-sm cursor-pointer transition-all hover:shadow-md ${
                selectedLender === 'global' ? 'border-primary border-2' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                  selectedLender === 'global' ? 'bg-primary' : 'bg-primary/10'
                }`}>
                  <span className={`material-symbols-outlined ${selectedLender === 'global' ? 'text-white' : 'text-primary'}`}>
                    account_balance
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-bold">{lenders.global.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{lenders.global.subtitle}</p>
                </div>
                <span className={`material-symbols-outlined ${selectedLender === 'global' ? 'text-primary' : 'text-slate-400'}`}>
                  {selectedLender === 'global' ? 'check_circle' : 'chevron_right'}
                </span>
              </div>
            </div>

            {/* Swift Capital Card */}
            <div 
              onClick={() => handleCardClick('swift')}
              className={`p-4 rounded-xl bg-white dark:bg-slate-800 border shadow-sm cursor-pointer transition-all hover:shadow-md ${
                selectedLender === 'swift' ? 'border-primary border-2' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                  selectedLender === 'swift' ? 'bg-primary' : 'bg-primary/10'
                }`}>
                  <span className={`material-symbols-outlined ${selectedLender === 'swift' ? 'text-white' : 'text-primary'}`}>
                    bolt
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-bold">{lenders.swift.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{lenders.swift.subtitle}</p>
                </div>
                <span className={`material-symbols-outlined ${selectedLender === 'swift' ? 'text-primary' : 'text-slate-400'}`}>
                  {selectedLender === 'swift' ? 'check_circle' : 'chevron_right'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20">
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              Click on a lender card to view detailed terms and conditions
            </p>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-sm">
            <div className="flex flex-col items-stretch bg-background-light dark:bg-background-dark rounded-t-[2rem] shadow-2xl max-h-[75vh] overflow-y-auto">
              <div 
                onClick={() => setShowModal(false)}
                className="sticky top-0 bg-inherit flex h-8 w-full items-center justify-center pt-2 cursor-pointer"
              >
                <div className="h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-600"></div>
              </div>

              <div className="flex-1">
                <div className="flex p-6 @container">
                  <div className="flex w-full flex-col gap-6 items-center">
                    <div className="flex gap-4 flex-col items-center">
                      <div className="bg-primary/10 flex items-center justify-center rounded-full min-h-24 w-24 relative">
                        <span className="material-symbols-outlined text-primary text-5xl">shield_person</span>
                        <div className="absolute bottom-1 right-1 bg-green-500 h-6 w-6 rounded-full border-2 border-background-light dark:border-background-dark flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-xs">verified</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center">
                        <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-tight">{currentLender.name}</h2>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
                          <p className="text-primary text-sm font-semibold uppercase tracking-wider">Verified Premier Partner</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Settlement</p>
                      <p className="text-slate-900 dark:text-white text-xl font-bold">{currentLender.settlement}</p>
                    </div>
                    <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Downpayment</p>
                      <p className="text-slate-900 dark:text-white text-xl font-bold">{currentLender.downpayment}</p>
                    </div>
                    <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Supported EMIs</p>
                      <p className="text-slate-900 dark:text-white text-xl font-bold">{currentLender.emiOptions}</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
                    <div className="flex justify-between items-center py-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-lg">percent</span>
                        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Interest Rate</p>
                      </div>
                      <p className="text-slate-900 dark:text-white text-sm font-bold">{currentLender.interestRate}</p>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-lg">receipt_long</span>
                        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Processing Fee</p>
                      </div>
                      <p className="text-slate-900 dark:text-white text-sm font-bold">{currentLender.processingFee}</p>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-lg">schedule</span>
                        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Approval Time</p>
                      </div>
                      <p className="text-green-600 dark:text-green-400 text-sm font-bold">{currentLender.approvalTime}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={handleChooseLender}
                      className="flex w-full items-center justify-center rounded-xl h-14 bg-primary text-white text-base font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
                    >
                      <span className="truncate">Choose {currentLender.name}</span>
                    </button>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="flex w-full items-center justify-center rounded-xl h-14 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-base font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      <span className="truncate">Close</span>
                    </button>
                  </div>
                </div>
                <div className="h-6"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
