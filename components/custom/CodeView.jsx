'use client';
import React, { useContext, useEffect, useState } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from '@codesandbox/sandpack-react';
import Lookup from '@/data/Lookup';
import { MessagesContext } from '@/context/MessagesContext';
import Prompt from '@/data/Prompt';
import axios from 'axios';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Download, Loader2Icon, Code, Eye, Sparkles } from 'lucide-react';
import { countToken } from './ChatView';
import { UserDetailContext } from '@/context/UserDetailContext';
import { toast } from 'sonner';
import SandpackPreviewClient from './SandpackPreviewClient';
import { ActionContext } from '@/context/ActionContext';
import { downloadZip } from '@/app/utils/createZip';
import { Button } from '../ui/button';

const debug = true;

function CodeView() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('code');
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessagesContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);

  useEffect(() => {
    (action?.actionType == 'deploy' || action?.actionType == 'export') &&
      setActiveTab('preview');
  }, [action]);

  const convex = useConvex();
  const [loading, setLoading] = useState(false);
  const UpdateToken = useMutation(api.users.UpdateToken);

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    const mergedFils = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFils);
    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == 'user') {
        GenerateAiCode();
      }
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    if(debug){
      console.log('DEBUG: Messages current view - ',messages);
    }
    if (userDetail?.token < 10) {
      toast("You don't have enough token to generate code");
      return;
    }
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + ' ' + Prompt.CODE_GEN_PROMPT;

    if(debug){
      console.log('DEBUG: Prompt - ',PROMPT);
    }

    const result = await axios.post('/api/gen-ai-code', {
      prompt: PROMPT,
    });

    if(debug){
      console.log('DEBUG: RES - ',result);
    }

    const aiResp = result.data;
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
    setFiles(mergedFiles);
    await UpdateFiles({
      workspaceId: id,
      files: aiResp?.files,
    });
    setLoading(false);
    const token =
      Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
    setUserDetail((prev) => ({ ...prev, token: token }));
    await UpdateToken({
      token: token,
      userId: userDetail?._id,
    });
  };

  const handleDownload = () => {
    console.log('DEBUG ZIP FILES:', files);
    downloadZip(files);
  };

  return (
    <div className="relative">
      {/* Enhanced Header */}
      <div className="glass-dark p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 glass p-2 rounded-full border border-white/10">
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeTab == 'code' 
                  ? 'bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Code className="w-4 h-4" />
              <span className="text-sm font-medium">Code</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeTab == 'preview' 
                  ? 'bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Preview</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400">
            <Sparkles className="w-4 h-4 text-[#35c5ff] animate-pulse" />
            <span className="text-sm">Live Development Environment</span>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="neon-btn-blue hover-lift group"
        >
          <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
          <span>Export</span>
        </button>
      </div>

      <SandpackProvider
        files={files}
        template="react"
        theme={'dark'}
        customSetup={{
          dependencies: {
            ...Lookup.DEPENDANCY,
          },
        }}
        options={{ externalResources: ['https://cdn.tailwindcss.com'] }}
      >
        <SandpackLayout>
          {activeTab == 'code' ? (
            <div className="flex h-[80vh]">
              <div className="w-64 border-r border-white/10">
                <SandpackFileExplorer className="h-full" />
              </div>
              <div className="flex-1">
                <SandpackCodeEditor className="h-full" />
              </div>
            </div>
          ) : (
            <div className="h-[80vh]">
              <SandpackPreviewClient />
            </div>
          )}
        </SandpackLayout>
      </SandpackProvider>

      {loading && (
        <div className="absolute inset-0 glass-dark flex flex-col justify-center items-center z-50">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative p-6 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full">
              <Loader2Icon className="animate-spin w-12 h-12 text-white" />
            </div>
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Generating your files...</h2>
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#1b76ff] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#35c5ff] rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-[#1b76ff] rounded-full animate-bounce delay-200"></div>
              </div>
              <span className="text-sm">AI is crafting your code...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeView;