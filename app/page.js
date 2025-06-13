'use client';

import { useState } from 'react';
import Hero from '@/components/custom/Hero';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashEnd = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <video
          autoPlay
          muted
          className="w-full h-full object-cover"
          onEnded={handleSplashEnd}
        >
          <source src="/splash1.webm" type="video/webm" />
        </video>
      </div>
    );
  }

  return (
    <div className="mx-auto max-h-1vh overflow-hidden">
      <Hero />
    </div>
  );
}
