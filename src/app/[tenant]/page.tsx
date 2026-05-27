"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Tv,
  Users,
  MessageSquare,
  DollarSign,
  Send,
  Heart,
  Share2,
  AlertCircle,
  Activity,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Volume2,
  VolumeX,
  Play
} from "lucide-react";

interface StreamData {
  id: string;
  title: string;
  description: string | null;
  status: "LIVE" | "OFFLINE" | "PAUSED";
  viewerCount: number;
}

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  isBadge?: boolean;
  tipAmount?: number;
}

export default function App({ params }: { params: { tenant: string } }) {
  const tenantSlug = params.tenant || "streamer";

  // State Management
  const [stream, setStream] = useState<StreamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customTip, setCustomTip] = useState("");
  const [tipSuccess, setTipSuccess] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Chat State
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "1", user: "Mod_Alpha", text: "Welcome to the workspace! Keep it civil.", isBadge: true },
    { id: "2", user: "PixelKnight", text: "That setup is clean! What backend framework is this?" },
    { id: "3", user: "SaaS_Founder", text: "Insane latency speeds here. ProTip is wild." },
  ]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch Stream Info and Register Viewer Heartbeat
  useEffect(() => {
    let activeStreamId: string | null = null;

    const fetchStreamState = async () => {
      try {
        const res = await fetch(`https://protip-backend.onrender.com/api/streams/active`, {
          headers: {
            "x-tenant-slug": tenantSlug,
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to locate workspace database node.");
        }

        const data: StreamData = await res.json();
        
        if (data.status === "LIVE") {
          setStream(data);
          activeStreamId = data.id;
          // Trigger initial join heartbeat
          sendHeartbeat(data.id, "join");
        } else {
          setStream(null);
        }
        setError(null);
      } catch (err: any) {
        setError(err.message || "Unable to synchronize with Render API cluster.");
      } finally {
        setLoading(false);
      }
    };

    const sendHeartbeat = async (streamId: string, action: "join" | "leave") => {
      try {
        await fetch(`https://protip-backend.onrender.com/api/streams/viewer-heartbeat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-tenant-slug": tenantSlug,
          },
          body: JSON.stringify({ streamId, action }),
        });
      } catch (e) {
        console.error("Heartbeat sync error:", e);
      }
    };

    fetchStreamState();

    // Clean up: Trigger leave heartbeat when closing or shifting tabs
    return () => {
      if (activeStreamId) {
        sendHeartbeat(activeStreamId, "leave");
      }
    };
  }, [tenantSlug]);

  // Handle Auto-Scrolling in Simulated Chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Simulate Random Incoming Chat Messages (Engaged Audience Simulation)
  useEffect(() => {
    const mockUsers = ["GamerPro99", "DevOps_Guru", "NextJS_Fanatic", "TechLead_Live", "CryptoKing", "StreamWatcher"];
    const mockComments = [
      "Let's goooo! 🔥",
      "Is the database connection PostgreSQL?",
      "Highly responsive player elements here.",
      "Just dropped a sub-second tip, did it clear?",
      "Prisma ORM implementation is looking incredibly tidy.",
      "Loving this dynamic color scheme!",
      "How is the multi-tenant routing built?"
    ];

    const interval = setInterval(() => {
      if (stream) {
        const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        const randomComment = mockComments[Math.floor(Math.random() * mockComments.length)];
        setChatMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), user: randomUser, text: randomComment }
        ]);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [stream]);

  // Chat message submit handler
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), user: "You (Viewer)", text: chatInput.trim() }
    ]);
    setChatInput("");
  };

  // Tipping Portal handler
  const handleProcessTip = (amount: number) => {
    setTipSuccess(true);
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        user: "You (Viewer)",
        text: `Sent a premium tip support package!`,
        tipAmount: amount,
      }
    ]);
    setTimeout(() => setTipSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      
      {/* Top Tenant Custom Brand Banner */}
      <header className="sticky top-0 z-50 bg-slate-900/85 backdrop-blur-md border-b border-slate-800/85 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <a href="/" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </a>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold font-mono shadow-md shadow-purple-500/10 text-white">
            {tenantSlug.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-wide uppercase font-mono text-white flex items-center gap-1.5">
              {tenantSlug}
              <span className="text-[10px] lowercase px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                protip.live space
              </span>
            </h1>
            <p className="text-[10px] text-slate-400">Secured Database-Row Isolation Mode</p>
          </div>
        </div>

        {/* Workspace Quick-States */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-850 text-xs text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Workspace: OK</span>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-600 text-white flex items-center gap-1.5 shadow-lg shadow-purple-500/10">
            <Sparkles className="w-3.5 h-3.5" /> Support Streamer
          </span>
        </div>
      </header>

      {/* Main Tenant Page Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Stream Player & Video Hub Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Dynamic Video Element Mock */}
          <div className="relative aspect-video bg-slate-900 rounded-2xl border border-slate-850 overflow-hidden shadow-2xl group">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950">
                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-slate-400 font-mono">Synchronizing workspace feeds...</p>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950">
                <AlertCircle className="w-12 h-12 text-rose-500 mb-3 animate-pulse" />
                <h3 className="text-base font-bold text-slate-200">Database Connection Timeout</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg transition"
                >
                  Attempt Reconnect
                </button>
              </div>
            ) : !stream ? (
              /* Offline Showcase Display */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-slate-500">
                  <Tv className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-200 uppercase tracking-wide">Stream Offline</h3>
                <p className="text-xs text-slate-400 max-w-md text-center mt-2 leading-relaxed">
                  Welcome to <span className="text-purple-400 font-mono">"{tenantSlug}"</span> workspace hub. The creator is not broadcasting right now. Support this stream below to trigger notification signals!
                </p>
                <div className="mt-6 flex gap-3">
                  <button className="px-4 py-2 text-xs font-bold bg-purple-600 rounded-xl hover:bg-purple-500 transition shadow-lg shadow-purple-500/15">
                    Follow Workspace
                  </button>
                  <button className="px-4 py-2 text-xs font-bold bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl transition">
                    Audit Archive
                  </button>
                </div>
              </div>
            ) : (
              /* Active Stream Player Simulation */
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
                
                {/* Simulated Stream Stream Animation Visualizer */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {!isPlaying ? (
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-2xl shadow-purple-500/30 transform hover:scale-105 active:scale-95 transition z-20"
                    >
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </button>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-40">
                      <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center animate-ping" />
                    </div>
                  )}
                </div>

                {/* Player Interface Overlay */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-rose-600 text-[10px] font-bold tracking-wider text-white animate-pulse">
                    LIVE
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-slate-300 flex items-center gap-1.5 border border-slate-800">
                    <Users className="w-3.5 h-3.5 text-purple-400" /> {stream.viewerCount.toLocaleString()} viewers
                  </span>
                </div>

                {/* Player Controls Bar */}
                <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-white transition"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 z-20 max-w-[80%]">
                  <p className="text-[10px] text-purple-400 font-mono font-bold uppercase tracking-wider">ACTIVE RTMP INGEST FEED</p>
                  <h3 className="text-base md:text-lg font-bold text-white mt-1 leading-tight">{stream.title}</h3>
                </div>
              </>
            )}
          </div>

          {/* Broadcast Description / Platform Stats Card */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-850">
            <h2 className="text-lg font-bold text-white mb-2">About the Creator Node</h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {stream?.description || `This workspace handles streaming data flow using isolated multi-tenant records. Every tip sent, chat posted, and stream key initialized routes through secure PostgreSQL index constraints.`}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
              <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-850">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Engine Protocol</span>
                <span className="text-xs font-bold text-purple-400 mt-1 block">HLS / RTMP Node</span>
              </div>
              <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-850">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Workspace Slug</span>
                <span className="text-xs font-bold text-white mt-1 block font-mono">{tenantSlug}</span>
              </div>
              <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-850">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Isolation State</span>
                <span className="text-xs font-bold text-emerald-400 mt-1 block">Full-Active DB</span>
              </div>
              <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-850">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Payout Method</span>
                <span className="text-xs font-bold text-indigo-400 mt-1 block">Direct Settled</span>
              </div>
            </div>
          </div>

          {/* Seamless Micro-Transaction Tip Portal */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-850 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-4">
              <DollarSign className="w-5 h-5" /> Direct Support Core Settlement
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Empower {tenantSlug} directly! Tip funds are routed to your isolated table logs on our secure Postgres engine.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[5, 10, 20, 50].map((amt) => (
                <button 
                  key={amt}
                  onClick={() => handleProcessTip(amt)}
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-white transition hover:-translate-y-0.5"
                >
                  ${amt} USD
                </button>
              ))}
            </div>

            {/* Custom Amount Form */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold font-mono">$</span>
                <input 
                  type="number"
                  placeholder="Custom Tip Amount"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-3 pl-8 pr-4 text-xs font-mono text-white focus:outline-none focus:border-purple-500 transition"
                />
              </div>
              <button 
                onClick={() => {
                  const val = parseFloat(customTip);
                  if (val > 0) {
                    handleProcessTip(val);
                    setCustomTip("");
                  }
                }}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 font-bold text-xs rounded-xl transition shadow-lg shadow-purple-500/10 flex items-center gap-1.5"
              >
                Send Support
              </button>
            </div>

            {/* Tip Transaction Confirmation Modal/Popup */}
            {tipSuccess && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2 animate-fadeIn">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Tip transaction registered successfully! Isolated database row synced.</span>
              </div>
            )}
          </div>

        </div>

        {/* Live Chat Column */}
        <div className="flex flex-col h-[650px] lg:h-auto rounded-2xl border border-slate-850 bg-slate-900/30 overflow-hidden">
          
          {/* Live Chat Title Bar */}
          <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Interactive Chat</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Feed
            </div>
          </div>

          {/* Chat Messages Log Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`text-xs p-2.5 rounded-lg border transition ${
                  msg.tipAmount 
                    ? "bg-purple-600/15 border-purple-500/30 text-purple-100" 
                    : "bg-slate-950/60 border-slate-900 text-slate-300"
                }`}
              >
                {msg.tipAmount ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-purple-300 font-bold font-mono">
                      <DollarSign className="w-3.5 h-3.5" /> SUPPORTED STREAMER WITH ${msg.tipAmount}
                    </div>
                    <div className="text-slate-200">{msg.text}</div>
                    <div className="text-[9px] text-purple-400/80 font-mono">User: {msg.user}</div>
                  </div>
                ) : (
                  <div>
                    <span className={`font-mono font-bold mr-1.5 ${msg.isBadge ? "text-purple-400" : "text-slate-400"}`}>
                      {msg.user}:
                    </span>
                    <span className="leading-relaxed">{msg.text}</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Form Entry */}
          <form onSubmit={handleSendChat} className="p-4 bg-slate-900/60 border-t border-slate-800 flex gap-2">
            <input 
              type="text"
              placeholder="Send live workspace feedback..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
            />
            <button 
              type="submit"
              className="p-3 bg-purple-600 hover:bg-purple-500 rounded-xl transition shadow-lg shadow-purple-500/15 text-white flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </main>

      {/* Mini System Status Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-4 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-2">
        <p>© 2026 ProTip.live - Dedicated Workspace Environment.</p>
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <Activity className="w-3.5 h-3.5 text-purple-500" />
          <span>Active Ingest Socket: TLS 1.3 / Isolated</span>
        </div>
      </footer>

    </div>
  );
}
