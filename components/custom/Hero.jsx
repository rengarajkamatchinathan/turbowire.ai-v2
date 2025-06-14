'use client';
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import { ArrowRight, Link, Zap, Cpu,Sparkles } from 'lucide-react';
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
    <div className="flex flex-col items-center gap-2 my-10">
      {/* Animated Background Elements */}
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#1b76ff]/20 to-[#35c5ff]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#35c5ff]/20 to-[#1b76ff]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Logo */}
      <div className="flex items-center justify-center my-6">        
        <div>
        <h1 className="text-4xl font-bold text-white opacity-90 text-center">
          What you want to build?
        </h1>
        </div>
      </div>
      
      <div
        className="p-5 border rounded-xl max-w-lg w-full mt-3"
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}
      >
        <div className="flex gap-2">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="outline-none bg-transparent w-full h-20 max-h-56 resize-none"
            onChange={(event) => setUserInput(event.target.value)}
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 w-10 h-10 rounded-md cursor-pointer neon-btn-blue"
            />
          )}
        </div>
        <div>
          <Link className="h-5 w-5" />
        </div>
      </div>

      

      <div className="flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3">
        {Lookup.SUGGSTIONS.map((suggestion, index) => (
          <h2
            className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer hover:border-blue-400 transition-all duration-300"
            key={index}
            onClick={() => onGenerate(suggestion)}
          >
            {suggestion}
          </h2>
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