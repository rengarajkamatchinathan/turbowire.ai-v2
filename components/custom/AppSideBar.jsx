import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Button } from '../ui/button';
import { MessageCircleCodeIcon, Zap, Cpu } from 'lucide-react';
import WorkspaceHistory from './WorkspaceHistory';
import SideBarFooter from './SideBarFooter';

function AppSideBar() {
  return (
    <Sidebar className="sidebar-futuristic">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-8 h-8 text-blue-400 neon-text-blue" />
          <span className="text-xl font-bold hologram-text">TURBOWIRE</span>
          <Cpu className="w-6 h-6 text-orange-400 neon-text-orange" />
        </div>
        <button className="neon-btn-blue w-full py-3 rounded-lg flex items-center justify-center gap-2">
          <MessageCircleCodeIcon className="w-5 h-5" />
          Start New Chat
        </button>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;