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
import { MessageCircleCodeIcon, Zap, Cpu, Sparkles } from 'lucide-react';
import WorkspaceHistory from './WorkspaceHistory';
import SideBarFooter from './SideBarFooter';
import Link from 'next/link';

function AppSideBar() {
  return (
    <Sidebar className="border-r border-white/10">
      <SidebarHeader className="p-5 relative">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1b76ff]/10 to-[#35c5ff]/10 rounded-lg"></div>
        
        <div className="relative flex items-center gap-3 mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <Image 
              src={'/logo.gif'} 
              className='relative rounded-full p-1 group-hover:scale-110 transition-transform duration-300' 
              alt="logo" 
              width={40} 
              height={40} 
            />
          </div>
          <div className="flex items-center gap-2">
            <h1
              className='font-bold text-lg hologram-text'
              data-text="Turbowire.ai"
            >
              Turbowire.ai
            </h1>
            <Sparkles className="w-4 h-4 text-[#35c5ff] animate-pulse" />
          </div>
        </div>
        
        <Link href={'/'} className="flex items-center gap-2">
          <Button className="mt-2 neon-btn-blue w-full hover-lift group">
            <MessageCircleCodeIcon className="group-hover:scale-110 transition-transform duration-200" /> 
            <span className="ml-2">Start New Chat</span>
          </Button>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;