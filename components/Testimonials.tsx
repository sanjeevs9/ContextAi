import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Context AI has completely transformed how I verify information online. It's like having a fact-checking expert by my side.",
    author: "Sarah Chen",
    role: "Digital Journalist"
  },
  {
    quote: "The speed and accuracy of Context AI's analysis is remarkable. It's become an essential tool for our research team.",
    author: "Dr. Michael Roberts",
    role: "Research Director"
  },
  {
    quote: "Finally, a tool that helps me navigate through the sea of information with confidence. Absolutely game-changing.",
    author: "James Wilson",
    role: "Content Creator"
  }
];

export function Testimonials() {
  return (
    <div id="about" className="bg-[#001F54] py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted by Professionals
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join thousands of users who rely on Context AI for accurate information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10">
              <Quote className="w-8 h-8 text-[#00FFC8] mb-4" />
              <p className="text-gray-300 mb-6">{testimonial.quote}</p>
              <div>
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-[#00FFC8]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}