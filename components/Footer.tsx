import {  Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#001F54] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-bold text-xl mb-4">Context AI</h3>
            <p className="text-gray-300 mb-6">
              Empowering users with AI-driven fact-checking and contextual insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#00FFC8]">
                {/* <Twitter className="w-5 h-5" /> */}
              </a>
              <a href="#" className="text-gray-300 hover:text-[#00FFC8]">
                {/* <Github className="w-5 h-5" /> */}
              </a>
              <a href="#" className="text-gray-300 hover:text-[#00FFC8]">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#00FFC8]">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-[#00FFC8]">Features</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#00FFC8]">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#00FFC8]">API</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#00FFC8]">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-[#00FFC8]">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#00FFC8]">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#00FFC8]">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#00FFC8]">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-300 text-sm text-center">
            © {new Date().getFullYear()} Context AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}