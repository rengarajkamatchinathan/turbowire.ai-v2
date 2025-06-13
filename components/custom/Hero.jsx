'use client';
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import { ArrowRight, Link, Zap, Code, Cpu } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react';
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

  // Create floating particles
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      
      const container = document.querySelector('.floating-particles');
      if (container) {
        container.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 8000);
      }
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    if(userDetail?.token < 10) {
      toast("You don't have enough tokens to generate code");
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Cyber scan line */}
      <div className="cyber-scan-line"></div>
      
      {/* Floating particles */}
      <div className="floating-particles"></div>
      
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover opacity-30"
          poster="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop"
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Cyber grid background */}
      <div className="cyber-grid absolute inset-0 z-1"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <Zap className="w-12 h-12 text-blue-400 mr-3 neon-text-blue" />
            <h1 className="text-6xl font-bold hologram-text">TURBOWIRE</h1>
            <Cpu className="w-12 h-12 text-orange-400 ml-3 neon-text-orange" />
          </div>

          {/* Main heading */}
          <h2 className="text-5xl md:text-7xl font-bold mb-6 neon-text-blue">
            {Lookup.HERO_HEADING}
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 max-w-3xl mx-auto">
            {Lookup.HERO_DESC}
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center glass-panel px-4 py-2">
              <Code className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-300">AI-Powered</span>
            </div>
            <div className="flex items-center glass-panel px-4 py-2">
              <Zap className="w-5 h-5 text-orange-400 mr-2" />
              <span className="text-orange-300">Lightning Fast</span>
            </div>
            <div className="flex items-center glass-panel px-4 py-2">
              <Cpu className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-300">Next-Gen Tech</span>
            </div>
          </div>
        </div>

        {/* Input section */}
        <div className="w-full max-w-4xl">
          <div className="cyber-border p-1 mb-8">
            <div className="glass-panel p-6">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <textarea
                    placeholder={Lookup.INPUT_PLACEHOLDER}
                    className="cyber-input w-full h-32 max-h-56 resize-none p-4 text-lg"
                    onChange={(event) => setUserInput(event.target.value)}
                    value={userInput}
                  />
                </div>
                {userInput && (
                  <button
                    onClick={() => onGenerate(userInput)}
                    className="neon-btn-blue px-8 py-4 rounded-lg flex items-center gap-2 h-fit"
                  >
                    <span>Generate</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="mt-4 flex items-center text-gray-400">
                <Link className="h-5 w-5 mr-2" />
                <span className="text-sm">Powered by advanced AI technology</span>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {Lookup.SUGGSTIONS.map((suggestion, index) => (
              <button
                key={index}
                className="glass-panel px-4 py-2 text-sm text-gray-300 hover:text-blue-300 transition-all duration-300 hover:border-blue-400 cursor-pointer"
                onClick={() => onGenerate(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          <div className="glass-panel p-6 text-center">
            <div className="text-3xl font-bold neon-text-blue mb-2">10K+</div>
            <div className="text-gray-400">Projects Generated</div>
          </div>
          <div className="glass-panel p-6 text-center">
            <div className="text-3xl font-bold neon-text-orange mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
          <div className="glass-panel p-6 text-center">
            <div className="text-3xl font-bold neon-text-blue mb-2">5K+</div>
            <div className="text-gray-400">Happy Developers</div>
          </div>
        </div>
      </div>

      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </div>
  );
}

export default Hero;