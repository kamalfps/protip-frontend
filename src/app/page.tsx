"use client";

import React, { useState, useEffect } from "react";
import { 
  Tv, 
  Users, 
  ShieldAlert, 
  Layers, 
  Cpu, 
  DollarSign, 
  CheckCircle, 
  ArrowRight, 
  Globe, 
  Sparkles, 
  Activity, 
  Terminal,
  Play,
  Heart,
  ExternalLink
} from "lucide-react";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"streamer" | "moderator" | "viewer">("streamer");
  const [viewerCount, setViewerCount] = useState(1240);
  const [isLive, setIsLive] = useState(true);
  const [backendStatus, setBackendStatus] = useState<"checking" | "online" | "offline">("checking");
  const [pingTime, setPingTime] = useState<number | null>(null);
  const [simulatedSlug, setSimulatedSlug] = useState("gaming-legend");
  
  useEffect(() => {
    const checkBackend = async () => {
      const startTime = Date.now();
      try {
        const response = await fetch("https://protip-backend.onrender.com/api/health");
        if (response.ok) {
          const data = await response.json();
          if (data.database === "connected") {
            setBackendStatus("online");
            setPingTime(Date.now() - startTime);
          } else {
            setBackendStatus("offline");
          }
        } else {
          setBackendStatus("offline");
        }
      } catch (error) {
        setBackendStatus("offline");
      }
    };
    checkBackend();
  }, []);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const delta = Math.floor(Math.random() * 21) - 10; // fluctuation of +/- 10
        return Math.max(100, prev + delta);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      
      {/* Background radial glow visual design tokens */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-purple-900/10 via-blue-900/5 to-transparent blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[800px] right-0 w-[400px] h-[400px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[200px] left-0 w-[400px] h-[400px] bg-pink-900/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Tv className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              PROTIP<span className="text-purple-500">.LIVE</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition">Platform Structure</a>
            <a href="#interactive-demo" className="hover:text-white transition">Live Preview</a>
            <a href="#multi-tenancy" className="hover:text-white transition">Isolation Matrix</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Real-Time Live API Health Status Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 border border-slate-800 text-xs shadow-inner">
              <span className={`w-2 h-2 rounded-full ${
                backendStatus === "online" ? "bg-emerald-500 animate-pulse" :
                backendStatus === "offline" ? "bg-rose-500" : "bg-amber-500 animate-bounce"
              }`} />
              <span className="text-slate-400 font-mono text-[11px]">
                API: {backendStatus === "online" ? `Connected (${pingTime}ms)` : backendStatus === "offline" ? "Offline" : "Checking Cloud..."}
              </span>
            </div>
          </div>
        </div>
      </header>

      {}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs text-purple-300 font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" /> Next-Generation White Label Streaming
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight max-w-5xl mx-auto mb-6 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          The Premium Multi-Tenant Platform for Independent Streamers
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Launch isolated live streaming nodes, manage custom domains, process sub-second layout streams, and empower micro-transactions under your own unified master dashboard ecosystem.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a href="#interactive-demo" className="w-full sm:w-auto px-8 py-4 font-bold text-sm bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white rounded-xl shadow-lg shadow-purple-500/20 transform hover:-translate-y-0.5 transition active:translate-y-0 flex items-center justify-center gap-2">
            Explore Dashboard Demo <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href={`/${simulatedSlug}`} 
            className="w-full sm:w-auto px-8 py-4 font-bold text-sm bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl transition flex items-center justify-center gap-2"
          >
            Launch Tenant Sandbox <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Dynamic Multi-tenant URL Simulator */}
        <div className="max-w-xl mx-auto p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-lg flex flex-col sm:flex-row justify-between items-center gap-4 text-sm shadow-xl">
          <div className="flex items-center gap-2 font-mono text-slate-400 w-full sm:w-auto">
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>https://</span>
            <input 
              type="text" 
              value={simulatedSlug} 
              onChange={(e) => setSimulatedSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              className="text-white font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 max-w-[140px] focus:outline-none focus:border-indigo-500 text-center"
              placeholder="streamer-name"
            />
            <span>.protip.live</span>
          </div>
          <a 
            href={`/${simulatedSlug}`} 
            className="text-xs text-purple-400 font-semibold hover:text-purple-300 transition flex items-center gap-1.5"
          >
            Test Route <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {}
      <section id="interactive-demo" className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Inside the Creator Control Center</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Experience the dynamic data metrics and workspace modules dedicated to each independent creator node.</p>
        </div>

        <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md p-1.5 shadow-2xl overflow-hidden">
          {/* Mockup Header Row */}
          <div className="bg-slate-950/80 rounded-t-xl border-b border-slate-900 px-4 py-3 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-600 mx-2">|</span>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" /> protip_live_cluster_node_24
              </span>
            </div>
            
            <div className="flex gap-1.5">
              <button 
                onClick={() => setActiveTab("streamer")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === "streamer" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
              >
                Streamer Hub
              </button>
              <button 
                onClick={() => setActiveTab("moderator")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === "moderator" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
              >
                Moderation Panel
              </button>
              <button 
                onClick={() => setActiveTab("viewer")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === "viewer" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
              >
                Viewer Checkout
              </button>
            </div>
          </div>

          {/* Mockup Body Content */}
          <div className="bg-slate-950 p-6 min-h-[380px] rounded-b-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left/Middle Column (Visual stream and metrics) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Fake Video Box */}
              <div className="relative aspect-video bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                
                {/* Simulated video background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-purple-600/10 border border-purple-500/20 flex items-center justify-center animate-ping pointer-events-none" />
                  <div className="absolute w-12 h-12 rounded-full bg-purple-600/90 flex items-center justify-center shadow-lg shadow-purple-500/40 z-20 cursor-pointer hover:scale-105 transition">
                    <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                  </div>
                </div>

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wider text-white ${isLive ? "bg-rose-600" : "bg-slate-700"}`}>
                    {isLive ? "LIVE" : "OFFLINE"}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-slate-300 flex items-center gap-1 border border-slate-800">
                    <Users className="w-3 h-3 text-purple-400" /> {viewerCount.toLocaleString()} viewers
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-xs text-purple-400 font-mono font-semibold">WORKSPACE: {simulatedSlug.toUpperCase()}</p>
                  <h3 className="text-base font-bold text-white">Full-Stack Platform Architecture Coding Session</h3>
                </div>
              </div>

              {/* Instant stats grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Stream Health</span>
                  <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 mt-1">
                    <Activity className="w-4 h-4" /> Stable (99.8%)
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Tips Collected</span>
                  <span className="text-sm font-semibold text-white mt-1 block">
                    $1,452.90 USD
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">System Load</span>
                  <span className="text-sm font-semibold text-indigo-400 mt-1 block">
                    0.04% CPU
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column (Contextual layout shift depending on activeTab) */}
            <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/80 flex flex-col justify-between">
              
              {activeTab === "streamer" && (
                <div className="h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                      <Layers className="w-4 h-4" /> Streamer Control Deck
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      This is the isolated system view of the stream. Each tenant owns their unique stream key, RTMP pipeline configurations, and payout analytics logs.
                    </p>
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-500">Node Location:</span>
                        <span className="text-slate-300">us-east-2 (Render)</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-500">Database Context:</span>
                        <span className="text-slate-300">Tenant-ID: Isolated</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <button 
                      onClick={() => setIsLive(!isLive)}
                      className={`w-full py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${isLive ? "bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300" : "bg-purple-600 hover:bg-purple-500 text-white"}`}
                    >
                      {isLive ? "Terminate Stream Link" : "Establish RTMP Link"}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "moderator" && (
                <div className="h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                      <ShieldAlert className="w-4 h-4" /> Multi-Tenant Mod Matrix
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Moderation boundaries are restricted at DB-level. A moderator bound to tenant <span className="text-white font-mono font-semibold">"{simulatedSlug}"</span> has zero system permissions to cross-access other workspaces.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] bg-slate-950 p-2 rounded border border-slate-900">
                        <span className="text-slate-400 font-mono">mod_agent_01</span>
                        <span className="text-emerald-400">Authenticated</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] bg-slate-950 p-2 rounded border border-slate-900">
                        <span className="text-slate-400 font-mono">mod_agent_02</span>
                        <span className="text-emerald-400">Authenticated</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-slate-950 border border-slate-800 text-xs text-rose-400 font-bold rounded-lg hover:bg-slate-900 transition">
                    Audit Mod Logs
                  </button>
                </div>
              )}

              {activeTab === "viewer" && (
                <div className="h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                      <DollarSign className="w-4 h-4" /> Seamless Tip Settlement
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Supporters can directly dispatch dynamic financial contributions that routes immediately to your isolated creator node database schema.
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      <button className="py-2 rounded bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs text-white font-bold transition">
                        $5
                      </button>
                      <button className="py-2 rounded bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs text-white font-bold transition">
                        $10
                      </button>
                      <button className="py-2 rounded bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs text-white font-bold transition">
                        $25
                      </button>
                    </div>
                  </div>

                  <button className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-lg hover:opacity-90 transition shadow-md shadow-purple-500/10">
                    Process Custom Contribution
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 w-full relative z-10 border-t border-slate-900">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Core Architecture</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">Engineered For Multi-Tenancy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-850 hover:border-slate-800 transition">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Isolated Database Rows</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every query is scoped strictly through standard database constraints. Your streamers can rest easy knowing there is absolutely zero crossover leakage in records.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-850 hover:border-slate-800 transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Custom Domain Mapping</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dynamically map external top-level domains seamlessly to subdomains, allowing streamers to represent their own custom platforms.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-850 hover:border-slate-800 transition">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Highly Optimized Execution</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Built on robust TypeScript and lightning-fast database connectors, keeping page speeds outstanding for viewer connections.
            </p>
          </div>
        </div>
      </section>

      {/* Footer / CTA Section */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Tv className="w-4 h-4 text-white" />
            </div>
            <span className="text-md font-bold text-white font-mono">PROTIP.LIVE</span>
          </div>
          
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            Designed for high performance. Powered securely by Render & PostgreSQL. <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
          </p>

          <div className="flex gap-4 text-xs text-slate-400">
            <span className="hover:text-white cursor-pointer transition">Status Monitor</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition">GitHub Link</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
