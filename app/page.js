'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/custom/Hero';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('splashShown');
    if (alreadyShown) {
      setShowSplash(false);
    } else {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('splashShown', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <img
          src="/newlog.gif"
          alt="Splash"
          className="h-96"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-h-1vh overflow-hidden">
      <Hero />
    </div>
  );
}
