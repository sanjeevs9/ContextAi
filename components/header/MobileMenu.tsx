"use client"
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll';

const navItems = [
  { label: 'Features', href: 'features' },
  { label: 'How it Works', href: 'how-it-works' },
  { label: 'Pricing', href: 'pricing' },
  { label: 'About', href: 'about' },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-[#00FFC8] transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#001F54] border-t border-white/10 py-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  scrollToSection(item.href);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-[#00FFC8] hover:bg-white/5 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}