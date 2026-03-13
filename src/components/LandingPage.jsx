import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      {/* Top Navigation */}
      <nav className="flex items-center bg-background-light dark:bg-background-dark p-4 lg:px-8 justify-between sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-primary p-1.5 rounded-lg text-white">
            <span className="material-symbols-outlined block">account_balance_wallet</span>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">FintechPay</h2>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('features')}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Solutions
          </button>
          <button 
            onClick={() => scrollToSection('lenders')}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Lenders
          </button>
          <button 
            onClick={() => scrollToSection('cta')}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </button>
          <button 
            onClick={() => navigate('/signup-login')}
            className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            Partner Login
          </button>
        </div>
        {/* Mobile Hamburger */}
        <div className="flex md:hidden w-12 items-center justify-end">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[73px] left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-40 shadow-lg">
          <div className="flex flex-col p-4 gap-4">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-left text-sm font-medium hover:text-primary transition-colors py-2"
            >
              Solutions
            </button>
            <button 
              onClick={() => scrollToSection('lenders')}
              className="text-left text-sm font-medium hover:text-primary transition-colors py-2"
            >
              Lenders
            </button>
            <button 
              onClick={() => scrollToSection('cta')}
              className="text-left text-sm font-medium hover:text-primary transition-colors py-2"
            >
              Pricing
            </button>
            <button 
              onClick={() => { navigate('/signup-login'); setMobileMenuOpen(false); }}
              className="bg-primary text-white px-5 py-3 rounded-lg text-sm font-bold text-center"
            >
              Partner Login
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="@container">
        <div className="flex flex-col gap-8 px-4 py-10 @[864px]:px-10 @[864px]:py-20 @[864px]:flex-row @[864px]:items-center max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="flex flex-col gap-6 order-1 @[864px]:w-1/2 @[864px]:pr-10">
            <div className="flex flex-col gap-4 text-left">
              <span className="text-primary font-bold tracking-wider text-xs uppercase">B2B Credit Solutions</span>
              <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight @[480px]:text-5xl @[864px]:text-6xl">
                Empower Your Shop with Instant Customer EMI
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-relaxed @[480px]:text-xl">
                Unlock growth with seamless credit solutions for your customers. Increase your average order value by offering flexible payment plans instantly.
              </p>
            </div>
            <div className="flex flex-col @[480px]:flex-row gap-4">
              <button 
                onClick={() => navigate('/signup-login')}
                className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold transition-transform active:scale-95 hover:bg-primary/90"
              >
                Get Started
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-base font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                View Demo
              </button>
            </div>
            <div className="flex items-center gap-4 py-2">
              <div className="flex -space-x-3">
                <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-300"></div>
                <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-400"></div>
                <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-500"></div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Joined by 5000+ local merchants</p>
            </div>
          </div>
          {/* Hero Image */}
          <div className="order-2 @[864px]:w-1/2 mt-8 @[864px]:mt-0">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-200 dark:bg-slate-800">
              <img 
                alt="Happy Indian shopkeeper in their store" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8sEdbuz63o_6EGJ30jNG1C8-o01mPbF7bbJk_rNephzEDK6hkM0HvXPFo64p6vkmqojAHFqYL6738akCLPRAijXSczNL7wWOY_1nU-Iv4Ko-oRgQbZbGfsZ9Cmec8ig0rPvF3rG_WQUcfItXYPhVz_ln9q_CED0orm7x23BNwUrN-BwpxGDub3EG_-QKsXeLffzD5Zk-PcanXHyr7eZXJbm2ABls8UERZkCc2MRqK751K6RP-EglhZVdksudvfaaUVtX94JumkdPC"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl flex items-center gap-4 border border-slate-200 dark:border-slate-700">
                <div className="bg-green-500 h-10 w-10 rounded-full flex items-center justify-center text-white shrink-0">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Instant Approval</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Loan disbursed in 3 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Value Propositions */}
      <section id="features" className="py-16 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 @container">
          <div className="flex flex-col gap-4 mb-12 text-center items-center">
            <h2 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight @[480px]:text-4xl">
              Built for Modern Retail
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-2xl">
              Experience the best B2B fintech solutions designed to help retail businesses scale with confidence.
            </p>
          </div>
          <div id="lenders" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Trust Card */}
            <div className="flex flex-col gap-4 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-800/50 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">Trust</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Secure transactions you and your customers can rely on. Fully compliant with RBI guidelines.
                </p>
              </div>
            </div>
            {/* Speed Card */}
            <div className="flex flex-col gap-4 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-800/50 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">bolt</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">Speed</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Paperless digital KYC and instant approval process to close sales faster than ever before.
                </p>
              </div>
            </div>
            {/* Multiple Lenders Card */}
            <div className="flex flex-col gap-4 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-800/50 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">account_tree</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">Multiple Lenders</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Access to a wide network of leading banks and NBFCs to ensure higher approval rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="px-4 py-20 @container">
        <div className="max-w-5xl mx-auto rounded-3xl bg-primary p-8 @[480px]:p-16 text-center text-white relative overflow-hidden">
          {/* Abstract Pattern background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="currentColor"></path>
              <circle cx="20" cy="20" fill="white" r="30"></circle>
              <circle cx="80" cy="80" fill="white" r="40"></circle>
            </svg>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-8">
            <h2 className="text-3xl font-black @[480px]:text-5xl max-w-2xl leading-tight">
              Ready to grow your business revenue?
            </h2>
            <p className="text-lg @[480px]:text-xl opacity-90 max-w-xl">
              Join thousands of merchants already using our platform to boost their monthly sales.
            </p>
            <button 
              onClick={() => navigate('/signup-login')}
              className="bg-white text-primary px-10 py-4 rounded-xl text-lg font-black transition-transform hover:scale-105 active:scale-95 shadow-xl"
            >
              Register Your Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="bg-primary p-1 rounded text-white">
                <span className="material-symbols-outlined text-sm block">account_balance_wallet</span>
              </div>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold">FintechPay</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <button 
                onClick={() => alert('Privacy Policy - Coming Soon')}
                className="text-slate-500 hover:text-primary transition-colors text-sm font-medium"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => alert('Terms of Service - Coming Soon')}
                className="text-slate-500 hover:text-primary transition-colors text-sm font-medium"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => alert('Contact Us - support@fintechpay.com')}
                className="text-slate-500 hover:text-primary transition-colors text-sm font-medium"
              >
                Contact Us
              </button>
              <button 
                onClick={() => scrollToSection('lenders')}
                className="text-slate-500 hover:text-primary transition-colors text-sm font-medium"
              >
                Lending Partners
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800 gap-4">
            <p className="text-slate-400 text-sm">© 2024 B2B Fintech Platform. All rights reserved.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => alert('Website - Coming Soon')}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-lg">public</span>
              </button>
              <button 
                onClick={() => alert('Share - Coming Soon')}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-lg">share</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
