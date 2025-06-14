'use client';
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import { ArrowRight, Link, Zap, Cpu, Sparkles } from 'lucide-react';
import React, { useContext, useState } from 'react';
import SignInDialog from './SignInDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function Hero() {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    if(userDetail?.token < 10) {
      toast("You don't have enough token to generate code");
      return
    }
    const msg = {
      role: 'user',
      content: input,
    };
    setMessages(msg);

    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [msg],
    });
    console.log(workspaceId);
    router.push('/workspace/' + workspaceId);
  };

  return (
    <div className="flex flex-col items-center gap-2 min-h-screen justify-center px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#1b76ff]/20 to-[#35c5ff]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#35c5ff]/20 to-[#1b76ff]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Logo and Title */}
      <div className="flex flex-col items-center justify-center mb-8 relative z-10">
        <div className="floating mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] p-4 rounded-full">
              <Zap className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
        
        <div className="text-center fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 hologram-text" data-text="TURBOWIRE">
            TURBOWIRE
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-[#35c5ff] animate-pulse" />
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              What do you want to build?
            </p>
            <Sparkles className="w-6 h-6 text-[#1b76ff] animate-pulse delay-500" />
          </div>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="relative w-full max-w-2xl scale-in">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-2xl blur-xl opacity-30 animate-pulse"></div>
        <div
          className="relative glass p-6 rounded-2xl border border-white/20 backdrop-blur-xl"
        >
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                placeholder={Lookup.INPUT_PLACEHOLDER}
                className="outline-none bg-transparent w-full h-20 max-h-56 resize-none text-white placeholder-gray-400 text-lg"
                onChange={(event) => setUserInput(event.target.value)}
                value={userInput}
              />
              {userInput && (
                <div className="absolute bottom-2 right-2">
                  <button
                    onClick={() => onGenerate(userInput)}
                    className="neon-btn-blue p-3 rounded-xl hover-lift group"
                  >
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-gray-400">
              <Link className="h-4 w-4" />
              <span className="text-sm">Powered by AI</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Cpu className="h-4 w-4" />
              <span className="text-sm">Real-time generation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex mt-12 flex-wrap max-w-4xl items-center justify-center gap-4 fade-in-up">
        {Lookup.SUGGSTIONS.map((suggestion, index) => (
          <button
            key={index}
            className="group relative px-6 py-3 glass rounded-full text-sm text-gray-300 hover:text-white cursor-pointer transition-all duration-300 hover-lift border border-white/10 hover:border-[#1b76ff]/50"
            onClick={() => onGenerate(suggestion)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#1b76ff]/0 to-[#35c5ff]/0 group-hover:from-[#1b76ff]/20 group-hover:to-[#35c5ff]/20 rounded-full transition-all duration-300"></div>
            <span className="relative">{suggestion}</span>
          </button>
        ))}
      </div>

      {/* Features */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full fade-in-up">
        {[
          {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Generate code in seconds with AI-powered assistance'
          },
          {
            icon: Cpu,
            title: 'Smart Generation',
            description: 'Intelligent code structure and best practices'
          },
          {
            icon: Sparkles,
            title: 'Production Ready',
            description: 'Clean, maintainable code ready for deployment'
          }
        ].map((feature, index) => (
          <div key={index} className="glass p-6 rounded-xl border border-white/10 hover-lift group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-lg group-hover:scale-110 transition-transform duration-200">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white">{feature.title}</h3>
            </div>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </div>
  );
}

export default Hero;