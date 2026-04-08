'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  role: 'aria' | 'user';
  text: string;
}

export default function AriaChatModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'aria',
      text: "Hi, I'm Aria — the AI that runs mortgage pipelines. I call every lead in 60 seconds, qualify borrowers across voice, SMS, and email, and transfer hot prospects live to your loan officer. Ask me anything.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  // Escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  const sendMessage = useCallback(async (overrideText?: string) => {
    const text = (overrideText || input).trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const conversationHistory = messages.map((m) => ({
        role: m.role === 'aria' ? 'assistant' : 'user',
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversation_history: conversationHistory,
          session_id: sessionId,
        }),
      });

      const data = await res.json();
      const ariaText =
        data.response ||
        data.message ||
        "I'm here to help! Could you rephrase that?";

      setMessages((prev) => [...prev, { role: 'aria', text: ariaText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'aria',
          text: "I'm having trouble connecting right now. Try again in a moment, or start a free trial at app.perenniaai.com to see me in action with your own pipeline.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, sessionId]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200] transition-opacity duration-300"
        style={{ background: 'rgba(4,5,8,0.85)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
        <div
          className="w-full max-w-lg rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(24px)',
            maxHeight: 'min(680px, 85vh)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 flex-shrink-0"
            style={{ borderBottom: '1px solid var(--glass-border)' }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(77,163,255,0.2), rgba(24,160,166,0.2))', border: '1px solid rgba(77,163,255,0.2)' }}
                >
                  <span className="text-sm font-bold" style={{ color: '#4DA3FF' }}>A</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#3DFFA0] border-2" style={{ borderColor: 'var(--bg-0)' }} />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Aria</div>
                <div className="text-[10px] uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>AI Loan Officer Assistant</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors hover:bg-white/5"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" style={{ color: 'var(--text-dim)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-6 py-5 space-y-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
              >
                {msg.role === 'aria' && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(77,163,255,0.12)' }}
                  >
                    <span className="text-[10px] font-bold" style={{ color: '#4DA3FF' }}>A</span>
                  </div>
                )}
                <div
                  className="max-w-[80%] rounded-2xl px-4 py-3"
                  style={{
                    background: msg.role === 'aria' ? 'rgba(255,255,255,0.04)' : 'rgba(77,163,255,0.1)',
                    borderTopLeftRadius: msg.role === 'aria' ? '4px' : undefined,
                    borderTopRightRadius: msg.role === 'user' ? '4px' : undefined,
                  }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {msg.text}
                  </p>
                </div>
                {msg.role === 'user' && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(24,160,166,0.12)' }}
                  >
                    <span className="text-[10px] font-bold text-[#18a0a6]">You</span>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(77,163,255,0.12)' }}
                >
                  <span className="text-[10px] font-bold" style={{ color: '#4DA3FF' }}>A</span>
                </div>
                <div
                  className="rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF]/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF]/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF]/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Suggested prompts (show only when few messages) */}
          {messages.length <= 2 && !loading && (
            <div className="px-6 pb-3 flex flex-wrap gap-2">
              {[
                'How does Aria work?',
                'What channels does Aria use?',
                'Tell me about the 22 agents',
                'How does live transfer work?',
              ].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => {
                    setInput('');
                    sendMessage(prompt);
                  }}
                  className="px-3 py-1.5 rounded-full text-xs transition-all duration-200 hover:brightness-125"
                  style={{ background: 'rgba(77,163,255,0.06)', border: '1px solid rgba(77,163,255,0.15)', color: '#4DA3FF', fontFamily: 'var(--font-body)' }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            className="flex items-center gap-3 px-6 py-4 flex-shrink-0"
            style={{ borderTop: '1px solid var(--glass-border)' }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask Aria anything about the platform..."
              disabled={loading}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-600"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-full transition-all duration-200 disabled:opacity-30 hover:brightness-125"
              style={{ background: 'linear-gradient(135deg, rgba(77,163,255,0.9), rgba(120,200,255,0.8))' }}
              aria-label="Send message"
            >
              <svg className="w-4 h-4" style={{ color: '#040508' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
