import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { Button } from '../ui/button';
import { MessageCircleCodeIcon, Zap, Cpu } from 'lucide-react';
import WorkspaceHistory from './WorkspaceHistory';
import SideBarFooter from './SideBarFooter';
import Link from 'next/link';
import data from '@/data/Lookup'

function AppSideBar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className='flex items-center'>
            <Image src={'/ah-logo.png'} className='' alt="logo" width={40} height={40} />
            <h1
             className='font-bold text-transparent bg-clip-text'
             style={{
               backgroundImage: "linear-gradient(to right, #1b76ff, #35c5ff)",
             }}
             >{data?.APP_NAME}</h1>
            </span>
        </div>
        
        <Link href={'/'} className="flex items-center gap-2">
          <Button className="mt-2 neon-btn-blue w-full hover-lift group">
            <MessageCircleCodeIcon className="group-hover:scale-110 transition-transform duration-200" /> 
            <span className="ml-2">Start New Chat</span>
          </Button>
        </Link>

      </SidebarHeader>
      
      <SidebarContent className="">
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SideBarFooter></SideBarFooter>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;