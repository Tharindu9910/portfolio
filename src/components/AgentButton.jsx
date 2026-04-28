"use client";
import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import {
  Send,
  X,
  Minimize2,
  MessageCircle,
  Sparkles,
  Paperclip,
  File,
  SendHorizontal,
  Mic
} from 'lucide-react';

import axios from 'axios';
import Image from 'next/image';
import VoiceText from '../utils/VoiceText';
import { sendMessage } from '../services/api';

const DEEPGRAM_API_KEY = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
const DEEPGRAM_URL = process.env.NEXT_VITE_DEEPGRAM_V_OUT_URL;

const AgentButton = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([
    { text: `Hi there! I'm Tharindu, What would you like to know about me?`, success: true, sender: 'bot', msgId: 1, actions: [] }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [textState, setTextState] = useState("");
  const [micStatus, setMicStatus] = useState("idle");

  const messagesEndRef = useRef(null);
  const quickReplies = ['Can I get your CV?', "What technologies do you specialize in?"];

  const handleMessageSend = async () => {
    setLoading(true);
    if (!message.trim()) return;
    const formattedMsg = message.trim();
    setMessage('');
    setMessageList((prevMessages) => [
      ...prevMessages,
      { text: formattedMsg, sender: 'me', msgId: prevMessages.length + 1 }
    ]);

    try {
      const response = await sendMessage(formattedMsg);
      // console.log(response)
      // console.log(response.answer)
      // console.log(response.actions)
      // if (response.actions != []){
      //     setActions(response.actions)
      // } 
      setLoading(false);
      console.log("response:", response)
      setMessageList((prevMessages) => [
        ...prevMessages,
        { text: response.answer, success: response?.success ?? true, sender: 'bot', msgId: prevMessages.length + 1, actions: response.actions }
      ]);

    } catch (err) {
      setMessageList((prevMessages) => [
        ...prevMessages,
        { text: err.message, sender: 'bot', msgId: prevMessages.length + 1 }
      ]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleMessageSend();
    }
  };
  const handleTextStateSend = async () => {
    setLoading(true);
    if (!textState.trim()) return;
    const formattedMsg = textState.trim();
    setTextState('');
    setMessageList((prevMessages) => [
      ...prevMessages,
      { text: formattedMsg, sender: 'me', msgId: prevMessages.length + 1 }
    ]);

    try {
      const response = await sendMessage(formattedMsg);
      await handleSend(response)
      setLoading(false);
      setMessageList((prevMessages) => [
        ...prevMessages,
        { text: response.answer, sender: 'bot', msgId: prevMessages.length + 1, actions: response.actions }
      ]);

    } catch (err) {
      setMessageList((prevMessages) => [
        ...prevMessages,
        { text: err.message, sender: 'bot', msgId: prevMessages.length + 1 }
      ]);
    }
  };


  const handleSend = async (response) => {

    try {
      const res = await axios.post(
        DEEPGRAM_URL,
        { text: response.answer }, // Deepgram expects a JSON body with a 'text' field
        {
          headers: {
            'Authorization': `Token ${DEEPGRAM_API_KEY}`,
            'Content-Type': 'application/json',
          },
          responseType: 'blob', // Crucial for receiving audio/binary data
          timeout: 30000,
        }
      );

      // 1. Create a URL for the blob data
      const audioBlob = new Blob([res.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);

      // 2. Play the audio
      const audio = new Audio(audioUrl);
      audio.play();

      // 3. Clean up the URL object memory later
      audio.onended = () => URL.revokeObjectURL(audioUrl);

    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error(`Deepgram Error: ${error.response.status}`, error.response.data);
      } else {
        console.error("Network or Setup Error:", error.message);
      }
    }
  };
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat Portal */}
      {open && (
        <div className="relative flex flex-col z-50 w-[100vw]  sm:w-[40vw] max-w-[90vw] h-[85vh] sm:h-[95vh] max-h-[80vh] overflow-hidden bg-[#242424] font-mono animate-in slide-in-from-bottom-5 duration-300">

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background:
                "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
            }}
          />

          {/* ── Header ── */}
          <div className="relative z-10 flex items-center justify-between  border-b border-gray-600 !px-4 !mb-2 !py-2.5 flex-shrink-0">
            <div className="flex flex-col gap-0.5 ">
              <span className="text-yellow-400 text-[13px] font-bold tracking-widest uppercase">
                INTEL_AGENT V2.0
              </span>
              <span className="text-neutral-500 text-[10px] tracking-widest uppercase">
                STATUS: SYNCHRONIZED
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Blinking status dot */}
              <span className={`w-2 h-2 rounded-full ${micStatus === "connecting"? "bg-red-500":"bg-yellow-400"} shadow-[0_0_6px_#f5c400] animate-pulse`} />

              <button
                onClick={() => setOpen(false)}
                className="text-neutral-500 hover:text-yellow-400 !p-1.5 transition-colors duration-150"
                aria-label="Minimize"
              >
                <Minimize2 size={15} />
              </button>
              <button
                onClick={() => {
                  setOpen(false)
                  setMessageList([
                    { text: `Hi there! I'm Tharindu, What would you like to know about me?`, success: true, sender: 'bot', msgId: 1, actions: [] }
                  ]);
                }}
                className="text-neutral-500 hover:text-yellow-400 !p-1.5 transition-colors duration-150"
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* ── Messages area ── */}
          <div
            className="relative z-10 flex-1 overflow-y-auto !px-3.5 py-4 flex flex-col gap-3.5 "
            style={{ scrollbarWidth: "thin", scrollbarColor: "#2a2a2a #0e0e0e" }}
          >
            {messageList.map((msg, index) => (
              <div
                key={msg.msgId}
                className={`flex flex-col gap-1 max-w-[88%] animate-in slide-in-from-bottom-2 duration-300 ${msg.sender === "me" ? "self-end" : "self-start"
                  }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* ── Bot message ── */}
                {msg.sender === "bot" && (
                  <>
                    <span className="text-yellow-400 text-[10px] tracking-widest uppercase">
                      AGENT
                    </span>
                    <div className={`bg-[#1a1a1a] border border-neutral-700 border-l-[3px] border-l-yellow-400 !px-3.5 !py-3 ${msg.success == true ? "text-neutral-300" : "text-red-500"}  text-xs leading-relaxed tracking-wide`}>
                      <p>{msg.text}</p>
                      {msg.actions?.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {msg.actions.map((action, idx) =>
                            action.type === "link" ? (
                              <a
                                key={idx}
                                href={action.url}
                                download
                                className="text-[#111] bg-yellow-400 !px-2.5 !py-1 text-[11px] tracking-wider uppercase hover:bg-[#0e0e0e] hover:text-yellow-400 border border-transparent hover:border-yellow-400 transition-all duration-150"
                              >
                                {action.label}
                              </a>
                            ) : null
                          )}
                        </div>
                      )}
                    </div>
                    {msg.timestamp && (
                      <span className="text-[10px] text-neutral-600 tracking-wider">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        AST
                      </span>
                    )}
                  </>
                )}

                {/* ── User message ── */}
                {msg.sender === "me" && (
                  <>
                    <span className="text-neutral-500 text-[10px] tracking-widest uppercase text-right">
                      GUEST_USER
                    </span>
                    <div className="bg-[#1a1a1a] border border-yellow-400 !px-3.5 !py-2.5 text-yellow-400 text-xs leading-relaxed tracking-wide">
                      <p>{msg.text}</p>
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* ── Typing indicator ── */}
            {loading && (
              <div className="flex flex-col gap-1 max-w-[88%] self-start animate-in slide-in-from-bottom-2 duration-300">
                <span className="text-yellow-400 text-[10px] tracking-widest uppercase">
                  AGENT
                </span>
                <div className="bg-[#1a1a1a] border border-neutral-700 border-l-[3px] border-l-yellow-400 !px-4 !py-3">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-yellow-400 block animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-yellow-400 block animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-yellow-400 block animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            {/* ── Quick replies ── */}
            {messageList.length === 1 && !loading && (
              <div className="flex flex-wrap gap-1.5 mt-1 animate-in fade-in duration-500 delay-300">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMessage(reply)}
                    className="bg-transparent border border-yellow-400 text-yellow-400 font-mono text-[10px] tracking-widest uppercase !px-3 !py-1.5 hover:bg-yellow-400 hover:text-[#111] transition-all duration-150"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input area ── */}
          <div className="relative z-10 flex items-center gap-2  border-t border-neutral-700 !px-3 !py-3 flex-shrink-0">

            {/* Mic button */}
            <button
              type="button"
              onClick={() => setIsRecording(!isRecording)}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
              className={`relative flex-shrink-0 border bg-[#1a1a1a] !p-2 transition-all duration-200 flex items-center justify-center
                     ${isRecording
                  ? "border-red-500 text-yellow-400 animate-pulse"
                  : "border-neutral-700 text-yellow-400 hover:border-yellow-400"
                }`}
            >
              {micStatus === "connecting" ? (
                <span className="flex gap-0.5 items-center h-4">
                  <span className="w-0.5 h-2 bg-yellow-400 animate-bounce [animation-delay:0ms]" />
                  <span className="w-0.5 h-3.5 bg-yellow-400 animate-bounce [animation-delay:150ms]" />
                  <span className="w-0.5 h-1.5 bg-yellow-400 animate-bounce [animation-delay:300ms]" />
                </span>
              ) : (
                <Mic size={15} />
              )}

              {/* Recording ping dot */}
              {isRecording && (
                <span className="absolute top-0.5 right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
                </span>
              )}
            </button>

            {/* Hidden file input */}
            <input
              type="file"
              multiple
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.txt"
            />

            <div>
              <VoiceText setText={setTextState} isRecording={isRecording} onStatusChange={setMicStatus} />

            </div>

            {/* Text input — switches when recording */}
            {isRecording ? (
              micStatus === "connecting" ? (
                <input
                  type="text"
                  placeholder="CONNECTING..."
                  value={textState}
                  readOnly
                  className="flex-1 bg-[#111] border border-neutral-700 text-neutral-500 font-mono text-xs !px-3 !py-2 outline-none tracking-wider placeholder:text-neutral-600 placeholder:uppercase cursor-default"
                />
              ) : (<input
                type="text"
                placeholder="LISTENING..."
                value={textState}
                readOnly
                className="flex-1 bg-[#111] border border-neutral-700 text-neutral-500 font-mono text-xs !px-3 !py-2 outline-none tracking-wider placeholder:text-neutral-600 placeholder:uppercase cursor-default"
              />)

            ) : (
              <input
                type="text"
                placeholder="INITIALIZE INPUT..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-[#111] border border-neutral-700 text-neutral-300 font-mono text-xs !px-3 !py-2 outline-none tracking-wider placeholder:text-neutral-600 placeholder:uppercase focus:border-yellow-400 transition-colors duration-150"
              />
            )}

            {/* Send button */}
            <button
              type="button"
              onClick={() => {
                if (textState === "") {
                  handleMessageSend();
                } else {
                  handleTextStateSend();
                }
              }}
              className="bg-yellow-400 text-[#111] !px-3.5 !py-2 flex items-center justify-center hover:bg-yellow-300 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Send message"
            >
              <SendHorizontal size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(!open)}
          aria-label="Open Chat"
          className="group relative w-14 h-14 bg-color1 border border-yellow-400 text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-color1 focus:ring-offset-2"
        >
          {/* Glow Effect Layer */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />

          <div className="relative w-10 h-10 ">
            <Image
              src="/my-agent.svg"
              alt="Chat Agent"
              width={40}
              height={40}
              priority
              className="brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </button>
      )}
    </div>
  )
}

export default AgentButton