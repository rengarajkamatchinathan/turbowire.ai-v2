'use client';
import Image from 'next/image';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import Colors from '@/data/Colors';
import { UserDetailContext } from '@/context/UserDetailContext';
import Link from 'next/link';
import { Download, Rocket, Zap, Cpu, Sparkles } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';
import { usePathname } from 'next/navigation';
import { ActionContext } from '@/context/ActionContext';

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  
  const onActionBtn = (actn) => {
    setAction({
      actionType: actn,
      timeStamp: Date.now()
    })
  }

  return (
    <div className="p-4 flex justify-between items-center relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1b76ff]/5 to-transparent opacity-50"></div>
      
      <Link href={'/'} className="flex items-center gap-3 relative z-10 group">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          <Image 
            src={'/logo.gif'} 
            alt="logo" 
            width={40} 
            height={40} 
            className="relative rounded-full group-hover:scale-110 transition-transform duration-300" 
          />
        </div>
        <div className="flex items-center gap-2">
          <h1 
            className='font-bold text-2xl hologram-text group-hover:scale-105 transition-transform duration-300'
            data-text="Turbowire.ai"
          >
            Turbowire.ai
          </h1>
          <Sparkles className="w-5 h-5 text-[#35c5ff] animate-pulse" />
        </div>
      </Link>
      
      {!userDetail?.name ? (
        <div className="flex gap-4 relative z-10">
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 hover-lift"
          >
            Sign In
          </Button>
          <Button className="neon-btn-blue hover-lift">
            <Zap className="w-4 h-4 mr-2" />
            Get Started
          </Button>
        </div>
      ) : (
        <div className="flex gap-4 items-center relative z-10">
          {pathname.includes('/workspace/') && (
            <div className="flex gap-3">
              {/* <Button 
                variant="ghost" 
                onClick={() => onActionBtn('export')} 
                className="neon-btn-blue hover-lift group"
              >
                <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" /> 
                Export
              </Button>
              <Button
                onClick={() => onActionBtn('deploy')}
                className="neon-btn-orange hover-lift group"
              >
                <Rocket className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" /> 
                Deploy
              </Button> */}
            </div>
          )}
          {userDetail && (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <Image
                onClick={toggleSidebar}
                src={userDetail?.picture}
                alt="userImage"
                width={40}
                height={40}
                className="relative rounded-full cursor-pointer object-cover border-2 border-transparent hover:border-[#1b76ff] transition-all duration-300 hover:scale-110"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;