import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  Wallet, 
  Menu, 
  X, 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  Network,
  Globe,
  Share2
} from 'lucide-react';

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
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      {/* Top Navigation */}
      <nav className="flex items-center bg-background-light dark:bg-background-dark px-4 py-3 lg:px-8 justify-between sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-primary p-2 rounded-lg text-white">
            <Wallet className="w-5 h-5" />
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight">CreditVyapar</h2>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="flex flex-col gap-8 px-4 py-8 md:py-16 lg:flex-row lg:items-center max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="flex flex-col gap-5 order-1 lg:w-1/2 lg:pr-8">
            <div className="flex flex-col gap-3 text-left">
              <h1 className="text-slate-900 dark:text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                Empower Your Shop with Instant Customer EMI
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-normal leading-relaxed">
                Unlock growth with seamless credit solutions for your customers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => navigate('/signup-login')}
                className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-base font-bold transition-transform active:scale-95 hover:bg-primary/90"
              >
                Get Started
              </button>
            </div>
            <div className="flex items-center gap-3 py-2">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-300"></div>
                <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-400"></div>
                <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-500"></div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Joined by 5000+ local merchants</p>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="order-2 lg:w-1/2 mt-6 lg:mt-0">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-200 dark:bg-slate-800">
              <img 
                alt="Happy Indian shopkeeper in their store" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8sEdbuz63o_6EGJ30jNG1C8-o01mPbF7bbJk_rNephzEDK6hkM0HvXPFo64p6vkmqojAHFqYL6738akCLPRAijXSczNL7wWOY_1nU-Iv4Ko-oRgQbZbGfsZ9Cmec8ig0rPvF3rG_WQUcfItXYPhVz_ln9q_CED0orm7x23BNwUrN-BwpxGDub3EG_-QKsXeLffzD5Zk-PcanXHyr7eZXJbm2ABls8UERZkCc2MRqK751K6RP-EglhZVdksudvfaaUVtX94JumkdPC"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-xl flex items-center gap-3 border border-slate-200 dark:border-slate-700">
                <div className="bg-green-500 h-9 w-9 rounded-full flex items-center justify-center text-white shrink-0">
                  <CheckCircle className="w-5 h-5" />
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
      <section id="features" className="py-12 sm:py-16 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-3 mb-10 text-center items-center">
            <h2 className="text-slate-900 dark:text-white text-2xl sm:text-3xl font-bold tracking-tight">
              Built for Modern Retail
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
              Experience the best B2B fintech solutions designed to help retail businesses scale with confidence.
            </p>
          </div>
          <div id="lenders" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Trust Card */}
            <div className="flex flex-col gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-800/50 hover:border-primary transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Trust</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Secure transactions you and your customers can rely on. Fully compliant with RBI guidelines.
                </p>
              </div>
            </div>
            {/* Speed Card */}
            <div className="flex flex-col gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-800/50 hover:border-primary transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Speed</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Paperless digital KYC and instant approval process to close sales faster than ever before.
                </p>
              </div>
            </div>
            {/* Multiple Lenders Card */}
            <div className="flex flex-col gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-800/50 hover:border-primary transition-colors sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Network className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Multiple Lenders</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Access to a wide network of leading banks and NBFCs to ensure higher approval rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto rounded-3xl bg-primary p-6 sm:p-10 lg:p-12 text-center text-white relative overflow-hidden">
          {/* Abstract Pattern background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="currentColor"></path>
              <circle cx="20" cy="20" fill="white" r="30"></circle>
              <circle cx="80" cy="80" fill="white" r="40"></circle>
            </svg>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black max-w-2xl leading-tight">
              Ready to grow your business revenue?
            </h2>
            <p className="text-base sm:text-lg opacity-90 max-w-lg">
              Join thousands of merchants already using our platform to boost their monthly sales.
            </p>
            <button 
              onClick={() => navigate('/signup-login')}
              className="bg-white text-primary px-8 py-3 rounded-xl text-base font-black transition-transform hover:scale-105 active:scale-95 shadow-xl"
            >
              Register Your Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="bg-primary p-1.5 rounded-lg text-white">
                <Wallet className="w-5 h-5" />
              </div>
              <h2 className="text-slate-900 dark:text-white text-base font-bold">CreditVyapar</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
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
                onClick={() => alert('Contact Us - support@creditvyapar.com')}
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
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 gap-4">
            <p className="text-slate-400 text-xs sm:text-sm">© 2026 CreditVyapar. All rights reserved.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => alert('Website - Coming Soon')}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4" />
              </button>
              <button 
                onClick={() => alert('Share - Coming Soon')}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
