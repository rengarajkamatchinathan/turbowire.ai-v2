'use client';
import Image from 'next/image';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import Colors from '@/data/Colors';
import { UserDetailContext } from '@/context/UserDetailContext';
import Link from 'next/link';
import { Download, Rocket, Zap, Cpu } from 'lucide-react';
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
    <div className="relative z-20">
      <div className="glass-panel mx-4 mt-4 p-4 flex justify-between items-center">
        <Link href={'/'} className="flex items-center gap-3">
          <Zap className="w-8 h-8 text-blue-400 neon-text-blue" />
          <span className="text-2xl font-bold hologram-text">TURBOWIRE</span>
          <Cpu className="w-6 h-6 text-orange-400 neon-text-orange" />
        </Link>
        
        {!userDetail?.name ? (
          <div className="flex gap-4">
            <button className="neon-btn-blue px-6 py-2 rounded-lg">
              Sign In
            </button>
            <button className="neon-btn-orange px-6 py-2 rounded-lg">
              Get Started
            </button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            {pathname.includes('/workspace/') && (
              <>
                <button 
                  className="neon-btn-blue px-4 py-2 rounded-lg flex items-center gap-2"
                  onClick={() => onActionBtn('export')}
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button
                  onClick={() => onActionBtn('deploy')}
                  className="neon-btn-orange px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Rocket className="w-4 h-4" />
                  Deploy
                </button>
              </>
            )}
            {userDetail && (
              <div className="relative">
                <img
                  onClick={toggleSidebar}
                  src={userDetail?.picture}
                  alt="userImage"
                  className="w-10 h-10 rounded-full cursor-pointer object-cover border-2 border-blue-400 hover:border-orange-400 transition-colors duration-300"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;