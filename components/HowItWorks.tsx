import { Search, CheckCircle, BookOpen } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Highlight a Claim',
    description: 'Simply select any text or statement you want to verify.'
  },
  {
    icon: CheckCircle,
    title: 'Real-time Fact-check',
    description: 'Our AI instantly analyzes the claim against trusted sources.'
  },
  {
    icon: BookOpen,
    title: 'Understand Context',
    description: 'Get comprehensive insights and supporting evidence.'
  }
];

export function HowItWorks() {
  return (
    <div id="how-it-works" className="bg-gray-50 py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#001F54] mb-4">
            How Context AI Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Three simple steps to verify any information you encounter online.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#00FFC8] to-[#00FFFF]" />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center mb-6">
                  <step.icon className="w-16 h-16 text-[#001F54]" />
                </div>
                <h3 className="text-xl font-semibold text-[#001F54] mb-2">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}