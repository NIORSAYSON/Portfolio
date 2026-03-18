"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
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
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const isDark = mounted && theme === "dark";

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
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputMessage,
          chatHistory: messages.map((m) => ({
            role: m.isUser ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

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
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I encountered an error. Please try again.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
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
    <main className="w-full flex flex-col">
      {/* Messages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        ref={messagesContainerRef}
        className="flex-1 px-5 md:px-10 pt-6 pb-40">
        <div className="max-w-3xl mx-auto mt-14 md:mt-0">
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
              <div className="shrink-0">
                <Image
                  src="/profile.jpg"
                  alt="Assistant"
                  width={32}
                  height={32}
                  className="rounded-full object-cover ring-1 ring-border"
                />
              </div>
              <div
                className={`rounded-2xl px-4 py-3 border border-border ${
                  isDark ? "bg-snbackground" : "bg-snbackground"
                }`}>
                <div className="flex gap-1.5 items-center">
                  {[0, 150, 300].map((delay) => (
                    <div
                      key={delay}
                      className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </motion.div>

      {/* Input Bar */}
      <motion.div
        ref={inputContainerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="px-5 md:px-10 py-4 border-t border-border bg-sbackground z-10 fixed bottom-0 left-0 right-0 md:left-72">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-navtext transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-navtext text-white hover:opacity-90 active:scale-95">
              Send
            </button>
          </div>
          <p className="text-[11px] text-text-muted mt-2 text-center">
            Powered by Langchain, Groq API, and Supabase
          </p>
        </div>
      </motion.div>
    </main>
  );
}
