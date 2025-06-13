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

function AppSideBar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className='flex items-center'>
            <Image src={'/logo.png'} alt="logo" width={40} height={40} />
            <h1 className='font-semibold opacity-70 hover:opacity-100'>Turbowore.ai</h1>
            </span>
        </div>
        <Button className="mt-5 neon-btn-blue">
          <MessageCircleCodeIcon /> Start New Chat
        </Button>
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