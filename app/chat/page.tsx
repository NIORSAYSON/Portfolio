"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { MaterialSymbolsLightChatOutline } from "../icons";
import ChatMessage from "@/components/ChatMessage";
import Image from "next/image";
import { motion } from "framer-motion";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Nestor's AI assistant. Feel free to ask me anything about his background, skills, projects, or experience. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      // Calculate an offset so the last message sits above the sticky input container
      const inputHeight = inputContainerRef.current?.offsetHeight ?? 0;
      const maxScrollTop = container.scrollHeight - container.clientHeight;
      // Move up by inputHeight so the last message is visible above the input. Add a small buffer of 8px.
      const target = Math.max(0, maxScrollTop - inputHeight + 8);
      container.scrollTo({ top: target, behavior: "smooth" });
      return;
    }

    // fallback to the existing ref if container isn't available
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  // input should render deterministically on the server — only switch to theme-aware
  // classes after the component has mounted to avoid hydration mismatches
  const inputThemeClass = !mounted
    ? "bg-white border-gray-300 text-black placeholder-gray-400"
    : theme === "dark"
    ? "bg-[#2c2c2c] border-border text-white placeholder-gray-500"
    : "bg-white border-gray-300 text-black placeholder-gray-400";

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // TODO: Replace with your Langchain + Groq API call
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          // Add chat history for context if needed
          chatHistory: messages.map((m) => ({
            role: m.isUser ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "I'm sorry, I couldn't process that request.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    // ensure this page fills the viewport so the input can stick to the bottom on mobile
    <main className="w-full min-h-screen flex flex-col">
      {/* Header (fixed visually by using a full-height flex layout) */}
      {/* <div className="px-6 md:px-10 pt-6 md:pt-10 pb-4 border-b border-border bg-white dark:bg-[#0b0b0b] z-10 sticky top-0">
        <div className="flex items-center gap-2">
          {mounted && (
            <MaterialSymbolsLightChatOutline
              className="w-8 h-8"
              fill={theme === "dark" ? "#fff" : "#000"}
            />
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Chat with Me</h1>
            <p className="text-sm opacity-60 mt-1">
              Ask me anything about my experience, skills, or projects
            </p>
          </div>
        </div>
      </div> */}

      {/* Messages Container (fills available space and scrolls) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        ref={messagesContainerRef}
        // removed bottom padding to avoid extra whitespace below messages
        className="flex-1 overflow-y-auto px-6 md:px-10 pt-6 pb-28 hide-scrollbar">
        <div className="max-w-4xl mx-auto mt-15 md:mt-0">
          {messages.map((message, idx) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
              isLast={idx === messages.length - 1}
            />
          ))}
          {isLoading && (
            <div className="flex gap-3 mb-4">
              <div className="flex-shrink-0">
                <Image
                  src="/profile.jpg"
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              </div>
              <div
                className={`rounded-2xl px-4 py-3 ${
                  theme === "dark" ? "bg-[#2c2c2c]" : "bg-gray-100"
                }`}>
                <div className="flex gap-1">
                  <div
                    className={`w-2 h-2 rounded-full animate-bounce ${
                      theme === "dark" ? "bg-white" : "bg-gray-600"
                    }`}
                    style={{ animationDelay: "0ms" }}></div>
                  <div
                    className={`w-2 h-2 rounded-full animate-bounce ${
                      theme === "dark" ? "bg-white" : "bg-gray-600"
                    }`}
                    style={{ animationDelay: "150ms" }}></div>
                  <div
                    className={`w-2 h-2 rounded-full animate-bounce ${
                      theme === "dark" ? "bg-white" : "bg-gray-600"
                    }`}
                    style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </motion.div>

      {/* Input Container (stays at bottom) */}
      <motion.div
        ref={inputContainerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="px-6 md:px-10 py-4 border-t border-border bg-white dark:bg-[#0b0b0b] z-10 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#1B56FD] ${inputThemeClass} ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                !inputMessage.trim() || isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#1B56FD] text-white hover:bg-[#0d3fb8] active:scale-95"
              }`}>
              Send
            </button>
          </div>
          <p className="text-xs opacity-50 mt-2 text-center">
            Powered by Langchain, Groq API, and Supabase
          </p>
        </div>
      </motion.div>
    </main>
  );
}
