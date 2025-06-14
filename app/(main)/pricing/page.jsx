'use client';
import PricingModel from '@/components/custom/PricingModel';
import { UserDetailContext } from '@/context/UserDetailContext';
import Lookup from '@/data/Lookup';
import React, { useContext } from 'react';
import { Zap, Cpu, Sparkles, Crown } from 'lucide-react';

function Pricing() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  
  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#1b76ff]/20 to-[#35c5ff]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#35c5ff]/20 to-[#1b76ff]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 mt-20 flex flex-col space-y-8 items-center p-10 md:px-32 lg:px-48 w-full">
        {/* Header Section */}
        <div className="text-center space-y-6 fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full floating">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-bold text-6xl hologram-text" data-text="PRICING">
              PRICING
            </h2>
            <div className="p-3 bg-gradient-to-r from-[#35c5ff] to-[#1b76ff] rounded-full floating delay-500">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <p className="text-gray-400 max-w-2xl text-center text-lg leading-relaxed">
            {Lookup.PRICING_DESC}
          </p>
        </div>

        {/* Token Display */}
        <div className="relative w-full max-w-md scale-in">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-2xl blur-xl opacity-30 animate-pulse"></div>
          <div className="relative glass p-6 rounded-2xl border border-white/20 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Available Tokens</h3>
                  <p className="text-sm text-gray-400">Your current balance</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold neon-text-blue">
                  {userDetail?.token || 0}
                </span>
                <p className="text-sm text-gray-400">tokens</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Usage this month</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] h-2 rounded-full w-3/4 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-full blur-sm opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-12 fade-in-up">
          {[
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Generate code in seconds with our optimized AI engine'
            },
            {
              icon: Cpu,
              title: 'Smart Processing',
              description: 'Advanced algorithms for efficient token usage'
            },
            {
              icon: Sparkles,
              title: 'Premium Quality',
              description: 'Production-ready code with best practices included'
            }
          ].map((feature, index) => (
            <div key={index} className="glass p-6 rounded-xl border border-white/10 hover-lift group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gradient-to-r from-[#1b76ff] to-[#35c5ff] rounded-lg group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white text-lg">{feature.title}</h3>
              </div>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="w-full max-w-6xl">
          <PricingModel />
        </div>
      </div>
    </div>
  );
}

export default Pricing;