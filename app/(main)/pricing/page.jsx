'use client';
import PricingModel from '@/components/custom/PricingModel';
import { UserDetailContext } from '@/context/UserDetailContext';
import Lookup from '@/data/Lookup';
import React, { useContext } from 'react';
import { Zap, Cpu } from 'lucide-react';

function Pricing() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className="mt-20 flex flex-col space-y-6 items-center p-10 md:px-32 lg:px-48 w-full ">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-8 h-8 text-blue-400 neon-text-blue" />
        <h2 className="font-bold text-5xl hologram-text">PRICING</h2>
        <Cpu className="w-6 h-6 text-orange-400 neon-text-orange" />
      </div>
      <p className="text-gray-400 max-w-xl text-center mt-4">
        {Lookup.PRICING_DESC}
      </p>
      <div className="p-5 border rounded-xl w-full flex justify-between">
        <h2 className="text-lg">
          <span className="font-bold neon-text-blue">{userDetail?.token}</span> Tokens Left
        </h2>
      </div>
      <PricingModel />
    </div>
  );
}

export default Pricing;