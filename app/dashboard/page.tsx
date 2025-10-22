'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Calendar, Zap, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { useDataContext } from '../context/DataContext';

export default function LandingPage() {
  const router = useRouter();
  const { ticker, quarter, year, setTicker, setQuarter, setYear } = useDataContext();
  
  const [localTicker, setLocalTicker] = useState(ticker);
  const [localQuarter, setLocalQuarter] = useState(quarter);
  const [localYear, setLocalYear] = useState(year);

  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const years = ['2023', '2024', '2025', '2026'];

  const handleGo = () => {
    // Update context
    setTicker(localTicker.toUpperCase());
    setQuarter(localQuarter);
    setYear(localYear);
    
    // Navigate to transcript by default
    router.push('/transcript');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003378] via-[#002959] to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Earnings Call Analysis
            <br />
            <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Automate insights. Save time. Execute on opportunities.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20">
              <Zap size={18} className="text-yellow-300" />
              <span className="text-sm font-medium">Instant Analysis</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20">
              <Clock size={18} className="text-green-300" />
              <span className="text-sm font-medium">Hours to Minutes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20">
              <TrendingUp size={18} className="text-blue-300" />
              <span className="text-sm font-medium">Actionable Insights</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 backdrop-blur-lg border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Get Started
            </h2>

            {/* Input Grid */}
            <div className="space-y-6 mb-8">
              {/* Ticker Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Building2 size={18} className="text-primary" />
                  Company Ticker
                </label>
                <input
                  type="text"
                  value={localTicker}
                  onChange={(e) => setLocalTicker(e.target.value.toUpperCase())}
                  placeholder="e.g., PNR, AAPL, MSFT"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-lg font-semibold uppercase transition-all hover:border-gray-300"
                  maxLength={5}
                />
              </div>

              {/* Year and Quarter */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    Year
                  </label>
                  <select
                    value={localYear}
                    onChange={(e) => setLocalYear(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-lg font-semibold transition-all hover:border-gray-300 cursor-pointer"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Quarter
                  </label>
                  <select
                    value={localQuarter}
                    onChange={(e) => setLocalQuarter(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-lg font-semibold transition-all hover:border-gray-300 cursor-pointer"
                  >
                    {quarters.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Go Button */}
            <button
              onClick={handleGo}
              className="w-full py-5 bg-gradient-to-r from-primary to-primary-700 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3 group"
            >
              <span>Start Analysis</span>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl w-14 h-14 flex items-center justify-center mb-4">
              <Zap className="text-white" size={28} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-white">AI-Powered Extraction</h3>
            <p className="text-blue-100">
              Automatically identify consulting opportunities and key insights from earnings calls
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl w-14 h-14 flex items-center justify-center mb-4">
              <Clock className="text-white" size={28} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-white">Save Hours of Work</h3>
            <p className="text-blue-100">
              Turn days of manual analysis into minutes with intelligent automation
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
            <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl w-14 h-14 flex items-center justify-center mb-4">
              <TrendingUp className="text-white" size={28} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-white">Execute Faster</h3>
            <p className="text-blue-100">
              Get actionable insights with urgency levels and recommended approaches
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
