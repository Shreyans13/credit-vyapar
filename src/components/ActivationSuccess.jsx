import { useNavigate } from 'react-router-dom';

export function ActivationSuccess() {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate('/agreement-signing');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 shadow-2xl rounded-xl overflow-hidden flex flex-col border border-primary/10">
        {/* TopAppBar */}
        <div className="flex items-center px-6 py-4 border-b border-primary/5">
          <button 
            onClick={handleBack}
            className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold flex-1 text-center pr-6">Success!</h2>
        </div>

        <div className="flex-1 flex flex-col items-center p-8 text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-6xl font-bold">check_circle</span>
          </div>

          {/* Main Content */}
          <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight mb-3">Your Shop is Activated!</h2>
          <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed mb-10 px-4">
            You can now offer EMI and BNPL to your customers at checkout. Start growing your business today.
          </p>

          {/* QR Section */}
          <div className="w-full bg-primary/5 dark:bg-primary/10 rounded-xl p-8 border border-primary/10 flex flex-col items-center mb-10">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div 
                className="w-64 h-64 bg-center bg-no-repeat bg-cover"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCrVIWTaz6sCEuuSCEQrprJEyMaZ0NdmL_LEBJilE2FY5zc4d0lU0U0byMsMU0XvN_B065l2LqtIpDB-V_0baVFkUcQbx41cyjiYR6IWdOL7sjXphwroSdk-dP5oeOTY7jlvQX74a_5N9Yd4nXmNMLuPTtUS39sgKtHCkYC7VA7LvUBJRC7GFytDLXtimQ7x50e0F6wQziVnTnn7WPrhuo6ozSdHHUiiQwVGFKgUv5sqEsQt4dYRYb20O8tIib07IroBdIFx_7n3LL3")'}}
              ></div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-6 font-medium">Scan this QR code to access your merchant dashboard</p>
          </div>

          {/* Features Summary */}
          <div className="grid grid-cols-2 gap-4 w-full mb-4">
            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="material-symbols-outlined text-primary text-sm">payments</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Instant EMI</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="material-symbols-outlined text-primary text-sm">schedule</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">BNPL Ready</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-primary/5">
          <button 
            onClick={handleDashboard}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
          >
            Go to Dashboard
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
          <p className="text-center text-slate-400 text-xs mt-4">
            Need help?{' '}
            <button 
              onClick={() => alert('Contact Support: support@fintechpay.com')}
              className="text-primary font-semibold hover:underline"
            >
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
