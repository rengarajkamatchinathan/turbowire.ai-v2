'use client';
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import Prompt from '@/data/Prompt';
import axios from 'axios';
import { useConvex, useMutation } from 'convex/react';
import { ArrowRight, Link, Loader2Icon, Zap } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSidebar } from '../ui/sidebar';
import { toast } from 'sonner';

export const countToken = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const { toggleSidebar } = useSidebar();
  const UpdateToken = useMutation(api.users.UpdateToken);

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == 'user') {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    console.log({ PROMPT });
    const result = await axios.post('/api/ai-chat', {
      prompt: PROMPT,
    });
    console.log(result.data.result);
    const aiResp = {
      role: 'ai',
      content: result.data.result,
    };
    setMessages((prev) => [...prev, aiResp]);
    
    await UpdateMessages({
      messages: [...messages, aiResp],
      workspaceId: id,
    });
    console.log("LEN", countToken(JSON.stringify(aiResp)));
    const token = Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
    setUserDetail(prev=>( {...prev, token: token}))
    await UpdateToken({
      token: token,
      userId: userDetail?._id
    })

    setLoading(false);
  };

  const onGenerate = (input) => {
    if(userDetail?.token < 10) {
      toast("You don't have enough tokens to generate code");
      return ;
    }
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setUserInput('');
  };

  return (
    <div className="relative h-[83vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll scrollbar-hide pl-6 pr-4">
        {messages?.length > 0 && messages?.map((msg, index) => (
          <div
            key={index}
            className="chat-message p-4 rounded-lg mb-4 flex gap-3 items-start leading-7"
          >
            {msg?.role == 'user' && (
              <img
                src={userDetail?.picture}
                alt="userImage"
                className="w-8 h-8 rounded-full border-2 border-blue-400"
              />
            )}
            {msg?.role == 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-orange-400 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="flex-1">
              <ReactMarkdown className="text-gray-200 prose prose-invert max-w-none">
                {msg?.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-message p-4 rounded-lg mb-4 flex gap-3 items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-orange-400 flex items-center justify-center">
              <Loader2Icon className="w-4 h-4 text-white animate-spin" />
            </div>
            <h2 className="text-blue-300">Generating response...</h2>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="flex gap-3 items-end p-4">
        {userDetail && (
          <img
            onClick={toggleSidebar}
            src={userDetail?.picture}
            alt="userImage"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-400 hover:border-orange-400 transition-colors duration-300"
          />
        )}
        <div className="cyber-border flex-1 p-1">
          <div className="glass-panel p-4">
            <div className="flex gap-3 items-end">
              <textarea
                placeholder={Lookup.INPUT_PLACEHOLDER}
                className="cyber-input flex-1 h-24 max-h-32 resize-none"
                onChange={(event) => setUserInput(event.target.value)}
                value={userInput}
              />
              {userInput && (
                <button
                  onClick={() => onGenerate(userInput)}
                  className="neon-btn-blue px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex items-center mt-3 text-gray-400 text-sm">
              <Link className="h-4 w-4 mr-2" />
              <span>AI-powered code generation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatView;