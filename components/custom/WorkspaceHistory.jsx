'use client';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useSidebar } from '../ui/sidebar';
import { MessageSquare, Clock } from 'lucide-react';

function WorkspaceHistory() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [workspaceList, setWorkSpaceList] = useState();
  const convex = useConvex();
  const { toggleSidebar } = useSidebar();
  
  useEffect(() => {
    userDetail && GetAllWorkspace();
  }, [userDetail]);

  const GetAllWorkspace = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userDetail?._id,
    });
    setWorkSpaceList(result);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-2">
        {/* <MessageSquare className="w-5 h-5 text-[#1b76ff]" /> */}
        <h2 className="font-semibold text-sm opacity-90">Your Chats</h2>
      </div>
      
      <div className="space-y-2">
        {workspaceList && workspaceList?.length > 0 ? (
          workspaceList?.map((workspace, index) => (
            <Link key={index} href={'/workspace/' + workspace?._id}>
              <div 
                onClick={toggleSidebar} 
                className="group p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-all duration-300 hover-lift border border-transparent hover:border-white/10"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-3 bg-gradient-to-r from-[#1b76ff]/20 to-[#35c5ff]/20 rounded-md group-hover:from-[#1b76ff]/30 group-hover:to-[#35c5ff]/30 transition-all duration-200">
                    <MessageSquare className="w-3 h-3 text-[#35c5ff]" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200 line-clamp-2">
                      {workspace?.messages[0]?.content}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">
                        {new Date(workspace._creationTime).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-4 text-center">
            <MessageSquare className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No chats yet</p>
            <p className="text-xs text-gray-600 mt-1">Start a new conversation to see your history</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkspaceHistory;