'use client';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useSidebar } from '../ui/sidebar';
import { MessageCircle, Clock } from 'lucide-react';

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
      <h2 className="font-semibold text-lg text-blue-300 neon-text-blue flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        Your Chats
      </h2>
      <div className="space-y-2">
        {workspaceList &&
          workspaceList?.map((workspace, index) => (
            <Link key={index} href={'/workspace/' + workspace?._id}>
              <div 
                onClick={toggleSidebar} 
                className="glass-panel p-3 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gray-400 mt-1 group-hover:text-blue-400 transition-colors" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors line-clamp-2">
                      {workspace?.messages[0]?.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(workspace._creationTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        {(!workspaceList || workspaceList.length === 0) && (
          <div className="glass-panel p-4 text-center">
            <p className="text-gray-400 text-sm">No chats yet</p>
            <p className="text-gray-500 text-xs mt-1">Start a new conversation to see it here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkspaceHistory;