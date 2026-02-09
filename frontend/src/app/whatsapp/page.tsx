"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { post } from "../../lib/api";
import { getSession } from "../../lib/session";

export default function WhatsAppPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getSession("whatsapp").then(async (sid) => {
      setSessionId(sid);
      const res = await post("/chat/message", {
        sessionId: sid,
        message: ""
      });
      setMessages([res.reply]);
    });
  }, []);

  async function send() {
    if (!sessionId || !input) return;

    const res = await post("/chat/message", {
      sessionId,
      message: input
    });

    setMessages((m) => [...m, input, res.reply]);
    setInput("");
  }

  return (
    <>
      <Navbar mode="whatsapp" showBack />
      <div className="page surface">
        {messages.map((m, i) => (
          <div key={i} className="chat-bubble">
            {m}
          </div>
        ))}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="WhatsApp style chat"
        />
        <button onClick={send}>Send</button>
      </div>
    </>
  );
}
