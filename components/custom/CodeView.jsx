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
import { Loader2Icon, Code, Eye } from 'lucide-react';
import { countToken } from './ChatView';
import { UserDetailContext } from '@/context/UserDetailContext';
import { toast } from 'sonner';
import SandpackPreviewClient from './SandpackPreviewClient';
import { ActionContext } from '@/context/ActionContext';

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
      toast("You don't have enough tokens to generate code");
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

  return (
    <div className="relative h-full">
      {/* Header */}
      <div className="glass-panel mx-4 mb-4 p-3">
        <div className="flex items-center justify-center">
          <div className="flex items-center bg-black/50 p-1 rounded-full border border-blue-400/30">
            <button
              onClick={() => setActiveTab('code')}
              className={`code-tab px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                activeTab === 'code' ? 'active' : ''
              }`}
            >
              <Code className="w-4 h-4" />
              Code
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`code-tab px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                activeTab === 'preview' ? 'active' : ''
              }`}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="code-panel mx-4 h-[calc(100%-80px)]">
        <SandpackProvider
          files={files}
          template="react"
          theme={{
            colors: {
              surface1: '#0a0a0f',
              surface2: '#151520',
              surface3: '#1a1a25',
              clickable: '#00d4ff',
              base: '#e0e6ed',
              disabled: '#666',
              hover: '#ff6b00',
              accent: '#00d4ff',
              error: '#ff4757',
              errorSurface: '#2d1b1b',
            },
            syntax: {
              plain: '#e0e6ed',
              comment: '#666',
              keyword: '#00d4ff',
              tag: '#ff6b00',
              punctuation: '#e0e6ed',
              definition: '#00d4ff',
              property: '#ff6b00',
              static: '#00d4ff',
              string: '#a8e6cf',
            },
            font: {
              body: '"Rajdhani", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
              mono: '"Fira Code", "DejaVu Sans Mono", Menlo, Consolas, monospace',
              size: '14px',
              lineHeight: '1.6',
            },
          }}
          customSetup={{
            dependencies: {
              ...Lookup.DEPENDANCY,
            },
          }}
          options={{ 
            externalResources: ['https://cdn.tailwindcss.com'],
            editorHeight: '100%',
            editorWidthPercentage: 50,
          }}
        >
          <SandpackLayout style={{ height: '100%', borderRadius: '12px', overflow: 'hidden' }}>
            {activeTab === 'code' ? (
              <>
                <SandpackFileExplorer 
                  style={{ 
                    height: '100%',
                    background: 'rgba(10, 10, 15, 0.9)',
                    borderRight: '1px solid rgba(0, 212, 255, 0.3)'
                  }} 
                />
                <SandpackCodeEditor 
                  style={{ 
                    height: '100%',
                    background: 'rgba(10, 10, 15, 0.9)'
                  }} 
                  showTabs
                  showLineNumbers
                  showInlineErrors
                  wrapContent
                />
              </>
            ) : (
              <SandpackPreviewClient />
            )}
          </SandpackLayout>
        </SandpackProvider>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="glass-panel p-8 text-center">
            <Loader2Icon className="animate-spin w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-xl text-blue-300 neon-text-blue">Generating your files...</h2>
            <p className="text-gray-400 mt-2">AI is crafting your code...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeView;