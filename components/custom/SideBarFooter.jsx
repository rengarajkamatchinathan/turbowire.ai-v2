'use client';
import { HelpCircle, LogOut, Settings, Wallet, Zap } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

function SideBarFooter() {
  const router = useRouter();
  const options = [
    {
      name: 'Settings',
      icon: Settings,
    },
    {
      name: 'Help Center',
      icon: HelpCircle,
    },
    {
      name: 'My Subscription',
      icon: Wallet,
      path: '/pricing',
    },
    {
      name: 'Sign Out',
      icon: LogOut,
    },
  ];
  
  const onOptionClick = (option) => {
    console.log(option);
    if (option.path) {
      router.push(option.path);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <button
          onClick={() => onOptionClick(option)}
          key={index}
          className="glass-panel w-full p-3 flex items-center gap-3 text-left hover:border-blue-400/50 transition-all duration-300 group"
        >
          <option.icon className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
            {option.name}
          </span>
        </button>
      ))}
      
      {/* Power indicator */}
      <div className="glass-panel p-3 mt-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-green-400" />
          <span className="text-xs text-gray-400">System Online</span>
        </div>
      </div>
    </div>
  );
}

export default SideBarFooter;