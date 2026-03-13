import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  ExternalLink, 
  BadgeCheck, 
  Badge, 
  Percent, 
  Receipt, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { lenderSelectionSchema } from '../lib/validations';

export function EligibleLenders() {
  const navigate = useNavigate();
  const [viewingLender, setViewingLender] = useState(null);

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(lenderSelectionSchema),
    mode: 'onChange',
    defaultValues: {
      selectedLenders: ['dmi']
    }
  });

  const selectedLenders = watch('selectedLenders');

  // Only DMI is eligible/pre-approved
  const lendersData = {
    dmi: {
      id: 'dmi',
      name: 'DMI Finance',
      status: 'Eligible',
      statusColor: 'emerald',
      mdr: '1.2%',
      interestRate: '12% p.a.',
      processingFee: '1.5% Fixed',
      approvalTime: 'Instant',
      settlement: 'T+1',
      downpayment: '0% Required',
      emiOptions: '3/6/9/12 Months',
      logo: 'https://dmifinance.in/assets/images/logo.png',
      eligible: true
    },
    fibe: {
      id: 'fibe',
      name: 'Fibe',
      status: 'Not Eligible',
      statusColor: 'slate',
      mdr: '1.5%',
      interestRate: '14% p.a.',
      processingFee: '2.0% Fixed',
      approvalTime: 'N/A',
      settlement: 'T+1',
      downpayment: '5% Required',
      emiOptions: '3/6/9 Months',
      logo: 'https://www.fibe.in/wp-content/uploads/2023/06/fibe-logo.svg',
      eligible: false,
      reason: 'Business vintage requirement not met'
    },
    tvscredit: {
      id: 'tvscredit',
      name: 'TVS Credit',
      status: 'Not Eligible',
      statusColor: 'slate',
      mdr: '1.4%',
      interestRate: '13% p.a.',
      processingFee: '1.8% Fixed',
      approvalTime: 'N/A',
      settlement: 'T+2',
      downpayment: '0% Required',
      emiOptions: '3/6/9/12/18 Months',
      logo: 'https://www.tvscredit.com/images/tvs-credit-logo.png',
      eligible: false,
      reason: 'Monthly turnover below minimum threshold'
    }
  };

  const eligibleLender = Object.values(lendersData).find(l => l.eligible);

  const handleContinue = () => {
    // Navigate to lender profile with the eligible lender pre-selected
    navigate('/lender-profile', { state: { selectedLender: eligibleLender.id } });
  };

  const handleViewDetails = (lenderId) => {
    setViewingLender(lenderId);
  };

  const closeDetails = () => {
    setViewingLender(null);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4">
          <button 
            onClick={() => navigate('/document-upload')}
            className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold mr-10">Eligible Lenders</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto pb-24">
        {/* Success Banner - Only 1 eligible */}
        <div className="p-4">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 text-white rounded-full p-1 flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <p className="text-emerald-900 dark:text-emerald-400 text-base font-bold leading-tight">1 lender match found!</p>
            </div>
            <p className="text-emerald-800 dark:text-emerald-500 text-sm font-normal leading-relaxed">
              Based on your business profile, we found 1 highly compatible partner for you.
            </p>
          </div>
        </div>

        <div className="px-4 py-2">
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight">Your Match</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">This lender is pre-approved for your business</p>
        </div>

        {/* Eligible Lender Card */}
        <div className="px-4 py-2">
          <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-xl p-4 shadow-md">
            <div className="flex gap-4">
              <div className="bg-primary/10 rounded-lg size-16 flex items-center justify-center border border-primary/20">
                <span className="text-primary text-2xl font-extrabold">{eligibleLender.name[0]}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">{eligibleLender.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    {eligibleLender.status}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-400">
                    MDR: {eligibleLender.mdr}
                  </span>
                </div>
                <button 
                  onClick={() => handleViewDetails(eligibleLender.id)}
                  className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                >
                  View Details
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Other Lenders Section */}
        <div className="px-4 py-6">
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight mb-2">Other Lenders</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">These lenders are not eligible for your profile</p>
          
          <div className="space-y-3">
            {Object.values(lendersData).filter(l => !l.eligible).map((lender) => (
              <div key={lender.id} className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 opacity-75">
                <div className="flex gap-4">
                  <div className="bg-slate-200 dark:bg-slate-700 rounded-lg size-16 flex items-center justify-center border border-slate-300 dark:border-slate-600">
                    <span className="text-slate-400 dark:text-slate-500 text-2xl font-extrabold">{lender.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-600 dark:text-slate-400">{lender.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400 border border-slate-300 dark:border-slate-600">
                        {lender.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-500">{lender.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 mt-4 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Your business profile matches best with {eligibleLender.name}. Proceed to view detailed terms.
          </p>
        </div>
      </main>

      {/* Lender Details Modal */}
      {viewingLender && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-sm">
          <div className="flex flex-col items-stretch bg-background-light dark:bg-background-dark rounded-t-[2rem] shadow-2xl max-h-[75vh] overflow-y-auto">
            <div className="sticky top-0 bg-inherit flex h-8 w-full items-center justify-center pt-2">
              <div className="h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-600"></div>
            </div>

            <div className="flex-1">
              <div className="flex p-6 @container">
                <div className="flex w-full flex-col gap-6 items-center">
                  <div className="flex gap-4 flex-col items-center">
                    <div className="bg-primary/10 flex items-center justify-center rounded-full min-h-24 w-24 relative">
                      <span className="text-primary text-4xl font-extrabold">{lendersData[viewingLender].name[0]}</span>
                      <div className="absolute bottom-1 right-1 bg-green-500 h-6 w-6 rounded-full border-2 border-background-light dark:border-background-dark flex items-center justify-center">
                        <BadgeCheck className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                      <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-tight">{lendersData[viewingLender].name}</h2>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Badge className="w-4 h-4 text-primary" />
                        <p className="text-primary text-sm font-semibold uppercase tracking-wider">Verified Premier Partner</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Settlement</p>
                    <p className="text-slate-900 dark:text-white text-xl font-bold">{lendersData[viewingLender].settlement}</p>
                  </div>
                  <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Downpayment</p>
                    <p className="text-slate-900 dark:text-white text-xl font-bold">{lendersData[viewingLender].downpayment}</p>
                  </div>
                  <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Supported EMIs</p>
                    <p className="text-slate-900 dark:text-white text-xl font-bold">{lendersData[viewingLender].emiOptions}</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
                  <div className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-2">
                      <Percent className="w-5 h-5 text-slate-400" />
                      <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Interest Rate</p>
                    </div>
                    <p className="text-slate-900 dark:text-white text-sm font-bold">{lendersData[viewingLender].interestRate}</p>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-5 h-5 text-slate-400" />
                      <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Processing Fee</p>
                    </div>
                    <p className="text-slate-900 dark:text-white text-sm font-bold">{lendersData[viewingLender].processingFee}</p>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-slate-400" />
                      <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Approval Time</p>
                    </div>
                    <p className="text-green-600 dark:text-green-400 text-sm font-bold">{lendersData[viewingLender].approvalTime}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col gap-3">
                  {lendersData[viewingLender].eligible ? (
                    <button 
                      onClick={() => { closeDetails(); handleContinue(); }}
                      className="flex w-full items-center justify-center rounded-xl h-14 bg-primary text-white text-base font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
                    >
                      <span className="truncate">Proceed with {lendersData[viewingLender].name}</span>
                    </button>
                  ) : (
                    <div className="flex w-full items-center justify-center rounded-xl h-14 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-base font-bold">
                      <span className="truncate">Not Eligible</span>
                    </div>
                  )}
                  <button 
                    onClick={closeDetails}
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

      {/* Sticky Bottom CTA */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-40">
        <div className="max-w-md mx-auto">
          <button 
            onClick={handleContinue}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            View {eligibleLender.name} Details
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
