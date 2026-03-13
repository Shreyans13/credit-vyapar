import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { documentUploadSchema } from '../lib/validations';

export function DocumentUpload() {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(documentUploadSchema),
    mode: 'onChange',
    defaultValues: {
      businessName: '',
      ownerName: '',
      storeCategory: '',
      monthlyTurnover: 500000,
      pincode: ''
    }
  });

  const monthlyTurnover = watch('monthlyTurnover');

  const formatCurrency = (value) => {
    if (value >= 100000) {
      return `₹ ${(value / 100000).toFixed(1)}L`;
    }
    return `₹ ${value.toLocaleString()}`;
  };

  const onSubmit = () => {
    navigate('/eligible-lenders');
  };

  const handleBack = () => {
    navigate('/kyc-details');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Top App Bar */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto w-full">
          <button 
            onClick={handleBack}
            className="text-slate-900 dark:text-slate-100 flex size-10 items-center justify-center hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 ml-2">KYC - Basic Details</h2>
        </div>
        {/* Progress Bar */}
        <div className="flex flex-col gap-2 p-4 pt-0 max-w-md mx-auto w-full">
          <div className="flex gap-6 justify-between items-center">
            <p className="text-slate-900 dark:text-slate-100 text-sm font-semibold uppercase tracking-wider">Step 1: Identity</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">1 / 3</p>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{width: '33.33%'}}></div>
          </div>
        </div>
      </header>

      {/* Main Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto px-4 py-6 max-w-md mx-auto w-full pb-32">
        {/* Business Name */}
        <div className="flex flex-col gap-1.5 mb-6">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">
            Business Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input 
              {...register('businessName')}
              className={`form-input flex w-full rounded-xl text-slate-900 dark:text-slate-100 border bg-white dark:bg-slate-800 h-14 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary p-4 text-base transition-all ${
                errors.businessName ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
              }`}
              placeholder="Enter business name" 
              type="text"
            />
          </div>
          {errors.businessName && (
            <p className="text-red-500 text-xs flex items-center gap-1 ml-1">
              <span className="material-symbols-outlined text-sm">error</span>
              {errors.businessName.message}
            </p>
          )}
        </div>

        {/* Owner Name */}
        <div className="flex flex-col gap-1.5 mb-6">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">
            Owner Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input 
              {...register('ownerName')}
              className={`form-input flex w-full rounded-xl text-slate-900 dark:text-slate-100 border bg-white dark:bg-slate-800 h-14 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary p-4 text-base transition-all ${
                errors.ownerName ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
              }`}
              placeholder="Enter owner's full name" 
              type="text"
            />
          </div>
          {errors.ownerName && (
            <p className="text-red-500 text-xs flex items-center gap-1 ml-1">
              <span className="material-symbols-outlined text-sm">error</span>
              {errors.ownerName.message}
            </p>
          )}
        </div>

        {/* Store Category */}
        <div className="flex flex-col gap-1.5 mb-6">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">
            Store Category <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select 
              {...register('storeCategory')}
              className={`form-select flex w-full rounded-xl text-slate-900 dark:text-slate-100 border bg-white dark:bg-slate-800 h-14 focus:border-primary focus:ring-1 focus:ring-primary px-4 py-2 text-base transition-all appearance-none ${
                errors.storeCategory ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
              }`}
            >
              <option disabled value="">Select category</option>
              <option value="retail">Retail Store</option>
              <option value="fnb">Food & Beverages</option>
              <option value="services">Professional Services</option>
              <option value="electronics">Electronics</option>
              <option value="others">Others</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
              <span className="material-symbols-outlined">keyboard_arrow_down</span>
            </div>
          </div>
          {errors.storeCategory && (
            <p className="text-red-500 text-xs flex items-center gap-1 ml-1">
              <span className="material-symbols-outlined text-sm">error</span>
              {errors.storeCategory.message}
            </p>
          )}
        </div>

        {/* Monthly Turnover Slider */}
        <div className="flex flex-col gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mb-6">
          <div className="flex justify-between items-center">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold uppercase tracking-tight">Monthly Turnover</label>
            <span className="text-primary font-bold text-lg">{formatCurrency(monthlyTurnover)}+</span>
          </div>
          <div className="px-2">
            <input 
              type="range"
              min="0"
              max="1000000"
              step="10000"
              {...register('monthlyTurnover', { valueAsNumber: true })}
              className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-medium px-1">
            <span>₹0</span>
            <span>₹2.5L</span>
            <span>₹5L</span>
            <span>₹7.5L</span>
            <span>₹10L+</span>
          </div>
        </div>

        {/* Pincode */}
        <div className="flex flex-col gap-1.5 mb-6">
          <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">
            Business Pincode <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input 
              {...register('pincode')}
              className={`form-input flex w-full rounded-xl text-slate-900 dark:text-slate-100 border bg-white dark:bg-slate-800 h-14 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary p-4 text-base transition-all ${
                errors.pincode ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
              }`}
              placeholder="e.g. 110001" 
              type="text"
              maxLength={6}
              inputMode="numeric"
            />
            <div className="absolute inset-y-0 right-4 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-sm">location_on</span>
            </div>
          </div>
          {errors.pincode && (
            <p className="text-red-500 text-xs flex items-center gap-1 ml-1">
              <span className="material-symbols-outlined text-sm">error</span>
              {errors.pincode.message}
            </p>
          )}
        </div>

        {/* Info Card */}
        <div className="flex gap-3 p-4 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/20">
          <span className="material-symbols-outlined text-primary text-xl">info</span>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Make sure the business name matches your GST/Trade license records to avoid verification delays.
          </p>
        </div>
      </form>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto w-full">
          <button 
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span>Continue to Step 2</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
