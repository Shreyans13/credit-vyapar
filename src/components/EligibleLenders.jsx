import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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
      selectedLenders: ['hdfc']
    }
  });

  const selectedLenders = watch('selectedLenders');

  const lendersData = {
    hdfc: {
      name: 'HDFC Bank',
      status: 'Pre-Approved',
      mdr: '1.2%',
      interestRate: '12% p.a.',
      processingFee: '1.5% Fixed',
      approvalTime: 'Instant',
      settlement: 'T+1',
      downpayment: '0% Required',
      emiOptions: '3/6/9/12 Months',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3trtrmR844V8MzkNQ5sphHb__kTiMWwQ14JZCc9bOzboyspVSKciGx922jvmkQlbejzGWsl9tlvV1auaCFivLW8VHaD2SVCq1t1TQTzN1ShfHA9-OMdBXOCGviNBQWWcAsvh7Y0bgFzhmdSv0_adcMMBSfeb7_H2bx1VnTbvFx3M86bwnd2UpCKERHEi6PEqQndus_i--zVjJnN5JKS4BX0J84873TpaG6yiqSFgoLzU3t7OF43-xyf2VLbdNuDrWdyqk0x48QhDv'
    },
    bajaj: {
      name: 'Bajaj Finserv',
      status: 'Pre-Approved',
      mdr: '1.5%',
      interestRate: '14% p.a.',
      processingFee: '2.0% Fixed',
      approvalTime: 'Instant',
      settlement: 'T+1',
      downpayment: '5% Required',
      emiOptions: '3/6/9 Months',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxJ-JLKSBrs7CKZ9238ONk45tW9pqCeXtur_ADLf0AetUljwnsXCg-AlGFZu3yttqygV1Q3rVSG9ufNjqHp7JXqIKy_PKGyESZdEmWcaj1X1ZfvKqbadE0m7uUear6zOgJgYbzJFuCOjJIFFpSZRCH4miyuD8IvGAykJsXMuPf3njGYI6NiDhbKDa6BqxE-QJvjqufHLcK9Bwu1MhLoH7gPxaudc1NczKU8sCfysGLwBGNd6bRs2wzoxqXPZdZnM8l4a0_9pA3ryfO'
    },
    icici: {
      name: 'ICICI Bank',
      status: 'Eligible',
      mdr: '1.4%',
      interestRate: '13% p.a.',
      processingFee: '1.8% Fixed',
      approvalTime: '2-4 Hours',
      settlement: 'T+2',
      downpayment: '0% Required',
      emiOptions: '3/6/9/12/18 Months',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALnxTRUkxnIV7S2sBx399XpcQbr0hPw5oSNSruuxcRX-_4uMP_I1b1_SY4nOUhw2WV0d2toPzYgQ87ns2UlJtCnASP9UYIdHeElA0hadl_BLyCgwfiVYwsTTsK4D2OB0VnguvkQ1eiuRCExAtDgMID2lRgI7uucLGxY2W8BuBPQv6hH-d9bKfVE1z9hXLWXKc_r-JKNkgTvsCLLl2x2ys2UkkDW9TjxkjGDD5JM5JRNshd4uMdMU3Yw8IEvHjK1T1wyecRFWr6zKhd'
    }
  };

  const toggleLender = (lenderId) => {
    const current = selectedLenders || [];
    const updated = current.includes(lenderId) 
      ? current.filter(id => id !== lenderId)
      : [...current, lenderId];
    setValue('selectedLenders', updated, { shouldValidate: true });
  };

  const onSubmit = () => {
    navigate('/lender-profile');
  };

  const handleViewDetails = (lenderId) => {
    setViewingLender(lenderId);
  };

  const closeDetails = () => {
    setViewingLender(null);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4">
          <button 
            onClick={() => navigate('/document-upload')}
            className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined block">arrow_back</span>
          </button>
          <h1 className="flex-1 text-center text-lg font-bold mr-10">Eligible Lenders</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto pb-24">
        {/* Success Banner */}
        <div className="p-4">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 text-white rounded-full p-1 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">check</span>
              </div>
              <p className="text-emerald-900 dark:text-emerald-400 text-base font-bold leading-tight">You are eligible!</p>
            </div>
            <p className="text-emerald-800 dark:text-emerald-500 text-sm font-normal leading-relaxed">
              Based on your business profile, we've found these highly compatible partners.
            </p>
          </div>
        </div>

        <div className="px-4 py-2">
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight">Select Partners</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Choose the lenders you'd like to proceed with</p>
        </div>

        {/* Lender List */}
        <div className="px-4 space-y-4 py-2">
          {Object.entries(lendersData).map(([id, lender]) => (
            <label key={id} className="relative block cursor-pointer group">
              <input 
                checked={selectedLenders?.includes(id) || false}
                onChange={() => toggleLender(id)}
                className="peer absolute right-4 top-4 h-5 w-5 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary z-10" 
                type="checkbox"
              />
              <div className={`bg-white dark:bg-slate-900 border-2 rounded-xl p-4 transition-all hover:shadow-md ${
                selectedLenders?.includes(id) ? 'border-primary' : 'border-slate-100 dark:border-slate-800'
              }`}>
                <div className="flex gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg size-16 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700">
                    <img 
                      className="w-full h-full object-cover" 
                      alt={`${lender.name} Logo`}
                      src={lender.logo}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-900 dark:text-slate-100">{lender.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                        lender.status === 'Pre-Approved' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}>
                        {lender.status}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-400">
                        MDR: {lender.mdr}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => { e.preventDefault(); handleViewDetails(id); }}
                      className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                    >
                      View Details
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </button>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>

        {errors.selectedLenders && (
          <div className="px-4 mt-4">
            <p className="text-red-500 text-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">error</span>
              {errors.selectedLenders.message}
            </p>
          </div>
        )}

        <div className="p-6 mt-4 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Lenders are sorted based on your business matching score. Selecting multiple partners increases your chances of successful disbursement.
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
                      <img 
                        src={lendersData[viewingLender].logo}
                        alt={lendersData[viewingLender].name}
                        className="w-16 h-16 object-contain"
                      />
                      <div className="absolute bottom-1 right-1 bg-green-500 h-6 w-6 rounded-full border-2 border-background-light dark:border-background-dark flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-xs">verified</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                      <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-tight">{lendersData[viewingLender].name}</h2>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
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
                      <span className="material-symbols-outlined text-slate-400 text-lg">percent</span>
                      <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Interest Rate</p>
                    </div>
                    <p className="text-slate-900 dark:text-white text-sm font-bold">{lendersData[viewingLender].interestRate}</p>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-lg">receipt_long</span>
                      <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Processing Fee</p>
                    </div>
                    <p className="text-slate-900 dark:text-white text-sm font-bold">{lendersData[viewingLender].processingFee}</p>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-lg">schedule</span>
                      <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Approval Time</p>
                    </div>
                    <p className="text-green-600 dark:text-green-400 text-sm font-bold">{lendersData[viewingLender].approvalTime}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => { closeDetails(); toggleLender(viewingLender); }}
                    className={`flex w-full items-center justify-center rounded-xl h-14 text-base font-bold shadow-lg transition-colors ${
                      selectedLenders?.includes(viewingLender)
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                        : 'bg-primary text-white shadow-primary/25 hover:bg-primary/90'
                    }`}
                  >
                    <span className="truncate">
                      {selectedLenders?.includes(viewingLender) ? 'Remove Selection' : 'Select Lender'}
                    </span>
                  </button>
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
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            Partner with Selected ({selectedLenders?.length || 0})
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
