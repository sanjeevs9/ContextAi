"use client"
import { useEffect, useState } from 'react';
import { User, LogIn, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface MenuItem {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
}

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      label: 'Settings',
      icon: Settings,
      onClick: () => console.log('Settings clicked'),
    },
    {
      label: 'Help',
      icon: HelpCircle,
      onClick: () => console.log('Help clicked'),
    },
    {
      label: 'Sign Out',
      icon: LogOut,
      onClick: async () => {
        await logout();
        setIsOpen(false);
      },
    },
  ];

  useEffect(()=>{
    console.log({user})
  },[user])

  if (!user) {
    return (
      <button
        onClick={() => router.push('/login')}
        className="flex items-center space-x-2 bg-[#001F54] hover:bg-[#002a75] text-white px-4 py-2 rounded-lg transition-colors"
      >
        <LogIn className="w-5 h-5" />
        <span className="hidden sm:inline">Sign In</span>
      </button>
    );
  }
  

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-[#001F54] hover:bg-[#002a75] text-white px-4 py-2 rounded-lg transition-colors"
      >
        <User className="w-5 h-5" />
        <span className="hidden sm:inline">{user.email || 'Account'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}