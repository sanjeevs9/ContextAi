import { Sparkles, Shield, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#001F54] to-[#000B1D] overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-32 sm:pb-32">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#FFD700]/10 mb-8">
            <Sparkles className="w-4 h-4 text-[#FFD700] mr-2" />
            <span className="text-[#FFD700] text-sm font-medium">AI-Powered Truth Detection</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Unveil the Facts Behind
            <span className="block bg-gradient-to-r from-[#00FFC8] to-[#00FFFF] text-transparent bg-clip-text">
              Every Claim
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Your AI-powered guide to truth, clarity, and credibility. Navigate through information with confidence using Context AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#001F54] rounded-lg font-semibold flex items-center transition-all">
              Get the Extension
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="px-8 py-4 border-2 border-[#00FFC8] text-[#00FFC8] hover:bg-[#00FFC8]/10 rounded-lg font-semibold transition-all">
              Try Context AI Now
            </button>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-8">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-[#00FFC8] mr-2" />
              <span className="text-gray-300">100% Privacy-First</span>
            </div>
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 text-[#00FFC8] mr-2" />
              <span className="text-gray-300">Real-time Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}