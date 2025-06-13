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
          <Zap className="w-6 h-6 text-blue-400 neon-text-blue" />
          <span className="text-lg font-bold hologram-text">TURBOWIRE</span>
          <Cpu className="w-5 h-5 text-orange-400 neon-text-orange" />
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