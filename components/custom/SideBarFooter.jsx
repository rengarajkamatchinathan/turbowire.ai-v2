'use client';
import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import SettingsModal from './SettingsModal';

function SideBarFooter() {
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const options = [
    {
      name: 'Settings',
      icon: Settings,
      action: () => setIsSettingsOpen(true),
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
    if (option.action) {
      option.action();
    } else if (option.path) {
      router.push(option.path);
    }
  };

  return (
    <>
      <div className="p-2 mb-10">
        {options.map((option, index) => (
          <Button
            onClick={() => onOptionClick(option)}
            key={index}
            variant="ghost"
            className="w-full flex justify-start my-3 hover:text-blue-300 transition-all duration-300 hover:bg-white/5 hover-lift group"
          >
            <option.icon className="group-hover:scale-110 transition-transform duration-200" />
            {option.name}
          </Button>
        ))}
      </div>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}

export default SideBarFooter;