import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneSchema } from '../lib/validations';

export function SignupLogin() {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm({
    resolver: zodResolver(phoneSchema),
    mode: 'onChange',
    defaultValues: {
      phoneNumber: ''
    }
  });

  const phoneNumber = watch('phoneNumber');

  const onSubmit = () => {
    navigate('/kyc-details');
  };

  const handleRegister = () => {
    if (!isValid) {
      return;
    }
    navigate('/kyc-details');
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden max-w-md mx-auto shadow-2xl">
      {/* Top Navigation */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 justify-between border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => navigate('/')}
          className="text-slate-900 dark:text-slate-100 flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Merchant Access</h2>
      </div>

      {/* Hero Branding Section */}
      <div className="flex flex-col items-center px-6 pt-12 pb-8">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-primary text-5xl">storefront</span>
        </div>
        <h1 className="text-slate-900 dark:text-slate-100 tracking-tight text-3xl font-extrabold leading-tight text-center">Grow your business</h1>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal mt-2 text-center">Enter your mobile number to receive a secure login OTP</p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 px-6 space-y-6">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col w-full">
            <p className="text-slate-900 dark:text-slate-100 text-sm font-semibold leading-normal pb-2">Phone Number</p>
            <div className="flex gap-2">
              {/* Country Code Input */}
              <div className="relative flex items-center w-24">
                <span className="absolute left-3 text-slate-500 dark:text-slate-400 font-medium">+91</span>
                <input 
                  className="flex w-full rounded-lg text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 pl-12 pr-2 text-base font-medium focus:ring-2 focus:ring-primary/20 transition-all cursor-not-allowed" 
                  readOnly 
                  value="India"
                />
              </div>
              {/* Main Number Input */}
              <div className="flex-1 relative">
                <input 
                  {...register('phoneNumber')}
                  className={`flex w-full rounded-lg text-slate-900 dark:text-slate-100 border bg-white dark:bg-slate-900 h-14 px-4 text-lg font-medium tracking-wider placeholder:text-slate-400 focus:outline-0 focus:ring-2 transition-all ${
                    errors.phoneNumber 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-slate-300 dark:border-slate-700 focus:ring-primary'
                  }`}
                  placeholder="98765 43210" 
                  type="tel"
                  maxLength={10}
                />
              </div>
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">error</span>
                {errors.phoneNumber.message}
              </p>
            )}
          </label>
        </div>

        {/* Action Button */}
        <button 
          type="submit"
          disabled={!isValid}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-400 text-white font-bold text-lg h-14 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Send OTP
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>

        {/* Secondary Options */}
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-sm">New to us?</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>
        <button 
          type="button"
          onClick={handleRegister}
          className="w-full border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary font-semibold text-base h-12 rounded-lg transition-all"
        >
          Register as a New Merchant
        </button>
      </form>

      {/* Background Accent Decorative */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}
