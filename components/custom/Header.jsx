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
    <div className="p-4 flex justify-between items-center">
      <Link href={'/'} className="flex items-center gap-2">
        <Zap className="w-8 h-8 text-blue-400 neon-text-blue" />
        <span className="text-2xl font-bold hologram-text">TURBOWIRE</span>
        <Cpu className="w-6 h-6 text-orange-400 neon-text-orange" />
      </Link>
      
      {!userDetail?.name ? (
        <div className="flex gap-5">
          <Button variant="ghost">Sign In</Button>
          <Button
            className="neon-btn-orange text-white"
          >
            Get Started
          </Button>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          {pathname.includes('/workspace/') && (
            <>
              <Button variant="ghost" onClick={() => onActionBtn('export')} className="neon-btn-blue">
                <Download /> Export
              </Button>
              <Button
                onClick={() => onActionBtn('deploy')}
                className="neon-btn-orange text-white"
              >
                <Rocket /> Deploy
              </Button>
            </>
          )}
          {userDetail && (
            <Image
              onClick={toggleSidebar}
              src={userDetail?.picture}
              alt="userImage"
              width={40}
              height={40}
              className="rounded-full cursor-pointer object-cover border-2 border-blue-400 hover:border-orange-400 transition-colors duration-300"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Header;