'use client';
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import Prompt from '@/data/Prompt';
import axios from 'axios';
import { useConvex, useMutation } from 'convex/react';
import { ArrowRight, Link, Loader2Icon, Send, Sparkles } from 'lucide-react';
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
      toast("You don't have enough token to generate code");
      return ;
    }
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setUserInput('');
  };

  return (
    <div className="relative h-[83vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll scrollbar-hide pl-10 space-y-4">
        {messages?.length > 0 && messages?.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl mb-3 flex gap-3 items-start leading-7 glass border border-white/10 hover-lift ${
              msg?.role === 'user' ? 'slide-in-right' : 'slide-in-left'
            }`}
          >
            {msg?.role == 'user' ? (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full blur-sm opacity-50"></div>
                <Image
                  src={userDetail?.picture}
                  alt="userImage"
                  width={35}
                  height={35}
                  className="relative rounded-full border-2 border-[#1b76ff]"
                />
              </div>
            ) : (
              <div className="p-2 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full">
                <Sparkles className="w-5 h-5 text-white" />
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
          <div className="p-4 rounded-xl mb-3 flex gap-3 items-center glass border border-white/10 scale-in">
            <div className="p-2 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full">
              <Loader2Icon className="animate-spin w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#1b76ff] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#35c5ff] rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-[#1b76ff] rounded-full animate-bounce delay-200"></div>
              </div>
              <h2 className="text-gray-300">Generating response...</h2>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Input Section */}
      <div className="flex gap-3 items-end p-4">
        {userDetail && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <Image
              onClick={toggleSidebar}
              src={userDetail?.picture}
              alt="userImage"
              width={35}
              height={35}
              className="relative rounded-full cursor-pointer border-2 border-transparent hover:border-[#1b76ff] transition-all duration-300"
            />
          </div>
        )}
        <div className="relative flex-1">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b76ff]/20 to-[#35c5ff]/20 rounded-2xl blur-xl opacity-50"></div>
          <div className="relative glass p-4 rounded-2xl border border-white/20 backdrop-blur-xl">
            <div className="flex gap-3">
              <textarea
                placeholder={Lookup.INPUT_PLACEHOLDER}
                className="outline-none bg-transparent w-full h-20 max-h-32 resize-none text-white placeholder-gray-400"
                onChange={(event) => setUserInput(event.target.value)}
                value={userInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (userInput?.trim()) {
                      onGenerate(userInput);
                    }
                  }
                }}
              />
              {userInput && (
                <button
                  onClick={() => onGenerate(userInput)}
                  className="neon-btn-blue p-3 rounded-xl hover-lift group self-end"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2 text-gray-400">
                <Link className="h-4 w-4" />
                <span className="text-xs">Press Enter to send, Shift+Enter for new line</span>
              </div>
              {userDetail?.token && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Sparkles className="h-4 w-4 text-[#35c5ff]" />
                  <span className="text-xs">{userDetail.token} tokens left</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatView;