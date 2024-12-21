import { Brain, Shield, Zap, Globe } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced algorithms process information in real-time to provide accurate fact-checking.'
  },
  {
    icon: Shield,
    title: 'Trusted Sources',
    description: 'Access a vast network of verified sources and expert opinions for comprehensive context.'
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get immediate insights and fact-checks while browsing content online.'
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Analyze content across multiple languages and regions for worldwide accuracy.'
  }
];

export function Features() {
  return (
    <div id="features" className="bg-white py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#001F54] mb-4">
            Powered by Advanced Technology
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our cutting-edge features combine AI intelligence with human expertise to deliver unparalleled accuracy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl border border-gray-200 hover:border-[#00FFC8] transition-all group">
              <feature.icon className="w-12 h-12 text-[#001F54] mb-4 group-hover:text-[#00FFC8] transition-colors" />
              <h3 className="text-xl font-semibold text-[#001F54] mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}