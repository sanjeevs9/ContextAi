"use client"
import { scrollToSection } from '../../utils/scroll';
import { usePathname, useRouter } from 'next/navigation';
const navItems = [
  { label: 'Features', href: 'features' },
  { label: 'How it Works', href: 'how-it-works' },
  { label: 'Pricing', href: 'pricing' },
  { label: 'About', href: 'about' },
  { label: 'Dashboard', href: 'dashboard' },
];

export function Navigation() {
  const path=usePathname();
  const router=useRouter();
  return (
    <nav className="hidden md:flex space-x-8">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => {
            if (path === '/dashboard') {
              router.push('/')
                setTimeout(() => {
                  scrollToSection(item.href);
                }, 100);
              
            } else if (item.href === 'dashboard') {
              router.push('/dashboard');
            } else {
              scrollToSection(item.href);
            }
          }}
          className="text-gray-300 hover:text-[#00FFC8] transition-colors"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}