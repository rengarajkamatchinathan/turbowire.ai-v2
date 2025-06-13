'use client';
import PricingModel from '@/components/custom/PricingModel';
import { UserDetailContext } from '@/context/UserDetailContext';
import Lookup from '@/data/Lookup';
import React, { useContext } from 'react';
import { Zap, Cpu, Star } from 'lucide-react';

function Pricing() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  
  return (
    <div className="min-h-screen relative">
      {/* Background effects */}
      <div className="cyber-grid absolute inset-0"></div>
      <div className="floating-particles"></div>
      
      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Star className="w-8 h-8 text-blue-400 mr-3 neon-text-blue" />
              <h1 className="text-5xl font-bold hologram-text">PRICING</h1>
              <Cpu className="w-8 h-8 text-orange-400 ml-3 neon-text-orange" />
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {Lookup.PRICING_DESC}
            </p>
          </div>

          {/* Token display */}
          <div className="cyber-border max-w-2xl mx-auto mb-16 p-1">
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-blue-400 neon-text-blue" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      <span className="neon-text-blue">{userDetail?.token?.toLocaleString()}</span> Tokens Remaining
                    </h3>
                    <p className="text-gray-400 text-sm">Power up your development workflow</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold neon-text-orange">⚡</div>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing cards */}
          <PricingModel />
        </div>
      </div>
    </div>
  );
}

export default Pricing;