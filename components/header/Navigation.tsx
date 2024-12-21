"use client"
import { scrollToSection } from '../../utils/scroll';

const navItems = [
  { label: 'Features', href: 'features' },
  { label: 'How it Works', href: 'how-it-works' },
  { label: 'Pricing', href: 'pricing' },
  { label: 'About', href: 'about' },
];

export function Navigation() {
  return (
    <nav className="hidden md:flex space-x-8">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => scrollToSection(item.href)}
          className="text-gray-300 hover:text-[#00FFC8] transition-colors"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}