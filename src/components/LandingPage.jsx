import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-800 text-white rounded font-bold flex items-center justify-center text-xl">N</div>
              <span className="font-bold text-gray-800 hidden sm:block">A Whitelabel Solution from NILKAMAL</span>
            </div>
            <div className="flex items-center">
              <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">Powered by Nilkamal Plastics</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-10 sm:pt-16">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl leading-tight">
                  Increase your <br />
                  <span className="text-blue-800">Furniture Sales</span> <br />
                  Instantly
                </h1>
                <p className="mt-3 text-blue-800 text-lg sm:mt-5 sm:text-xl sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-semibold">
                  Sell More Furniture, Faster.
                </p>
                <p className="mt-1 text-sm text-gray-500 sm:max-w-xl sm:mx-auto lg:mx-0">
                 Empower your customers to buy bigger. Give them access to instant, brand-approved EMIs while you get settled upfront, zero risk attached.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button 
                      onClick={() => navigate('/signup-login')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 md:py-4 md:text-lg transition-colors"
                    >
                      GROW MY SALES
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center sm:justify-center lg:justify-start gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white"></div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Joined by 5000+ local furniture partners.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 mt-8 lg:mt-0 px-4 sm:px-6 lg:px-0">
          <div className="relative h-64 sm:h-72 md:h-96 lg:h-full rounded-2xl lg:rounded-none overflow-hidden shadow-lg lg:shadow-none">
            <img className="w-full h-full object-cover" src="/store.png" alt="Furniture Store Owner" />
            
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-8 sm:bottom-8 bg-white/95 backdrop-blur rounded-lg p-4 shadow-xl border border-gray-100 flex items-center gap-4">
              <div className="bg-green-100 p-2 rounded-full text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">NILKAMAL CUSTOMER EMI</p>
                <p className="text-sm font-bold text-gray-900">Instant approval. Sale closed.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Built for Modern Furniture Retail
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">NILKAMAL TRUSTED FINANCING</h3>
              <p className="text-sm text-gray-600">India's trust in your store. Secure and brand-backed financing adds prestige to your business.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">FASTER HIGH-VALUE SALES</h3>
              <p className="text-sm text-gray-600">Close big deals faster. Instant paperless KYC means instant sales for large furniture sets.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">MAXIMUM APPROVAL NETWORK</h3>
              <p className="text-sm text-gray-600">Access India's best banks and NBFCs directly. High approval rates for every type of customer.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-800">
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between text-center lg:text-left">
          <div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to grow your revenue?</span>
            </h2>
            <p className="mt-3 text-lg leading-6 text-blue-200">
              Join thousands of Nilkamal merchants already boosting their monthly sales.
            </p>
          </div>
          <div className="mt-8 flex justify-center lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button 
                onClick={() => navigate('/signup-login')}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-800 bg-white hover:bg-gray-50"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
