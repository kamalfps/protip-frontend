"use client";

import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Define what an alert looks like based on our backend
interface AlertData {
donorName: string;
amount: number;
message: string | null;
image: string;
sound: string;
duration: number;
textColor: string;
}

export default function WidgetPage({ params }: { params: { userId: string } }) {
const [currentAlert, setCurrentAlert] = useState<AlertData | null>(null);
const [alertQueue, setAlertQueue] = useState<AlertData[]>([]);
const [isActive, setIsActive] = useState(false);

useEffect(() => {
// Connect to your live backend server
const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://protip-backend.onrender.com';
const socket: Socket = io(backendUrl);

// Tell the backend we are an OBS widget for this specific streamer
socket.emit('join-overlay', params.userId);

// Listen for new tips!
socket.on('new-tip-alert', (data: AlertData) => {
  console.log('🎉 New tip received!', data);
  setAlertQueue((prevQueue) => [...prevQueue, data]);
});

return () => {
  socket.disconnect();
};


}, [params.userId]);

// Handle the alert queue (show one by one)
useEffect(() => {
if (!isActive && alertQueue.length > 0) {
const nextAlert = alertQueue[0];
setIsActive(true);
setCurrentAlert(nextAlert);

  // Play the alert sound
  if (nextAlert.sound) {
    const audio = new Audio(nextAlert.sound);
    audio.play().catch(e => console.log('Audio play failed (OBS usually allows this)', e));
  }

  // Remove the alert from screen after the duration finishes
  setTimeout(() => {
    setIsActive(false);
    setCurrentAlert(null);
    setAlertQueue((prev) => prev.slice(1)); // Remove the finished alert from the queue
  }, nextAlert.duration || 5000);
}


}, [isActive, alertQueue]);

// If no alert is currently active, render a completely transparent screen
if (!isActive || !currentAlert) {
return ;
}

// When an alert IS active, show the animation, GIF, and Text!
return (



    {/* The Alert GIF */}
    {currentAlert.image && (
      <img 
        src={currentAlert.image} 
        alt="Alert Animation" 
        className="w-64 h-64 object-contain mb-4 drop-shadow-2xl"
      />
    )}
    
    {/* The Alert Text (e.g., "Kamal tipped $50!") */}
    <h1 
      className="text-4xl font-extrabold mb-2"
      style={{ 
        color: currentAlert.textColor, 
        WebkitTextStroke: '2px black' // Adds a black outline so it's readable over any stream background
      }}
    >
      {currentAlert.donorName} tipped ${currentAlert.amount}!
    </h1>
    
    {/* The Viewer's Custom Message */}
    {currentAlert.message && (
      <p 
        className="text-2xl font-bold max-w-lg break-words"
        style={{ 
          color: '#ffffff', 
          WebkitTextStroke: '1px black' 
        }}
      >
        {currentAlert.message}
      </p>
    )}
  </div>
</div>


);
}
