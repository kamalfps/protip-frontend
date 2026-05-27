"use client";

import React, { useState } from 'react';

export default function TipPage({ params }: { params: { userId: string } }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(5);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendTip = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending tip...');

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://protip-backend.onrender.com';
      
      const res = await fetch(`${backendUrl}/api/tip`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: params.userId,
          donorName: name || 'Anonymous',
          amount: Number(amount),
          message: message
        })
      });

      if (res.ok) {
        setStatus('Tip sent successfully! Watch the OBS widget!');
        setName('');
        setMessage('');
      } else {
        setStatus('Failed to send tip. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error connecting to the server.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Tip {params.userId}</h1>
          <p className="text-slate-400">Support your favorite streamer!</p>
        </div>

        <form onSubmit={sendTip} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Your Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" 
              placeholder="e.g. John Doe" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Amount ($)</label>
            <input 
              type="number" 
              min="1" 
              value={amount} 
              onChange={e => setAmount(Number(e.target.value))} 
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
            <textarea 
              value={message} 
              onChange={e => setMessage(e.target.value)} 
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" 
              placeholder="Say something nice..." 
              rows={3}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Send Tip
          </button>

          {status && (
            <p className="text-center mt-4 text-purple-400 font-medium">
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
