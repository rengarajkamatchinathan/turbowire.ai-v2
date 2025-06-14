'use client';
import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
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
  const onOptionClock = (option) => {
    console.log(option);
    if (option.name === 'Sign Out') {
      console.log('LOGGED OUT');
      localStorage.removeItem('user');
  
      // Reload the page after logout
      window.location.reload();
      return; // Make sure to stop further execution like router.push
    }
    router.push(option.path);
  };

  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button
          onClick={() => onOptionClock(option)}
          key={index}
          variant="ghost"
          className="w-full flex justify-start my-3 hover:text-blue-300 transition-colors duration-300"
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;