"use client";

import React, { useState } from 'react';

export default function TippingPage({ params }: { params: { userId: string } }) {
const [donorName, setDonorName] = useState('');
const [amount, setAmount] = useState<number | ''>('');
const [message, setMessage] = useState('');
const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

const handleTip = async (e: React.FormEvent) => {
e.preventDefault();
if (!donorName || !amount) return;

setStatus('loading');

try {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://protip-backend.onrender.com';
  
  const response = await fetch(`${backendUrl}/api/tip`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: params.userId,
      donorName,
      amount: Number(amount),
      message
    })
  });

  if (response.ok) {
    setStatus('success');
    setDonorName('');
    setAmount('');
    setMessage('');
    
    // Reset success message after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  } else {
    setStatus('error');
  }
} catch (error) {
  console.error('Failed to send tip', error);
  setStatus('error');
}


};

return (


  {/* Background glow */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

  <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
        Support the Stream!
      </h1>
      <p className="text-sm text-slate-400 mt-2">
        Your tip and message will appear live on stream.
      </p>
    </div>

    {status === 'success' ? (
      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-center animate-bounce">
        🎉 Tip sent successfully! Look at the stream!
      </div>
    ) : (
      <form onSubmit={handleTip} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Your Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Kamal"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Tip Amount ($)
          </label>
          <input
            type="number"
            required
            min="1"
            step="0.01"
            placeholder="5.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Live Message (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="Keep up the great work!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition shadow-lg shadow-purple-500/20"
        >
          {status === 'loading' ? 'Processing...' : 'Send Tip Now'}
        </button>
        
        {status === 'error' && (
          <p className="text-red-400 text-xs text-center mt-2">Failed to send tip. Is the backend running?</p>
        )}
      </form>
    )}
  </div>
</div>


);
}
