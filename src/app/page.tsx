import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden text-white">
      
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none"></div>

      <main className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center">
        
        <div className="mb-6 inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-semibold tracking-wide">
          ProTip.live is currently in Beta
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
          Next-Gen Alerts for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Independent Streamers
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
          Get tipped directly by your viewers with zero platform fees. Instantly trigger custom GIFs, sounds, and messages directly in OBS Studio.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/tip/kamal" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] flex items-center justify-center">
            View Tipping Page Demo
          </Link>
          
          <Link href="/widget/kamal" target="_blank" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold rounded-xl transition-all flex items-center justify-center">
            Open OBS Widget (Blank screen)
          </Link>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full text-left">
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <div className="text-purple-400 text-2xl mb-3">⚡</div>
            <h3 className="text-xl font-bold mb-2">Real-Time WebSockets</h3>
            <p className="text-slate-400 text-sm">Alerts fire instantly on your stream the millisecond a payment goes through.</p>
          </div>
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <div className="text-purple-400 text-2xl mb-3">🎨</div>
            <h3 className="text-xl font-bold mb-2">Custom Overlays</h3>
            <p className="text-slate-400 text-sm">Personalize your alerts with your own custom GIFs, audio files, and typography.</p>
          </div>
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <div className="text-purple-400 text-2xl mb-3">💰</div>
            <h3 className="text-xl font-bold mb-2">Keep 100% of Tips</h3>
            <p className="text-slate-400 text-sm">Connect your own payment gateway and bypass heavy platform revenue splits.</p>
          </div>
        </div>

      </main>
    </div>
  );
}
