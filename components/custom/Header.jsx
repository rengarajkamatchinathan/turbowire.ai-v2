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
import data from '@/data/Lookup'

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
        <span className='flex items-center'>
          <Image src={'/logo.gif'} alt="logo" width={40} height={40} />
          <h1 
          className='font-bold text-transparent bg-clip-text'
          style={{
            backgroundImage: "linear-gradient(to right, #1b76ff, #35c5ff)",
          }}
          >{data?.APP_NAME}</h1>
          </span>
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