"use client";

import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

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
const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://protip-backend.onrender.com";
const socket: Socket = io(backendUrl);

socket.emit("join-overlay", params.userId);

socket.on("new-tip-alert", (data: AlertData) => {
  setAlertQueue((prevQueue) => [...prevQueue, data]);
});

return () => {
  socket.disconnect();
};


}, [params.userId]);

useEffect(() => {
if (!isActive && alertQueue.length > 0) {
const nextAlert = alertQueue[0];
setIsActive(true);
setCurrentAlert(nextAlert);

  if (nextAlert.sound) {
    const audio = new Audio(nextAlert.sound);
    audio.play().catch((e) => console.log("Audio play failed", e));
  }

  setTimeout(() => {
    setIsActive(false);
    setCurrentAlert(null);
    setAlertQueue((prev) => prev.slice(1));
  }, nextAlert.duration || 5000);
}


}, [isActive, alertQueue]);

if (!isActive || !currentAlert) {
return ;
}

return (


{currentAlert.image && (

)}
<h1
className="text-4xl font-extrabold mb-2"
style={{
color: currentAlert.textColor,
WebkitTextStroke: "2px black"
}}
>
{currentAlert.donorName} tipped ${currentAlert.amount}!

{currentAlert.message && (
<p
className="text-2xl font-bold max-w-lg break-words"
style={{
color: "#ffffff",
WebkitTextStroke: "1px black"
}}
>
{currentAlert.message}

)}


);
}
