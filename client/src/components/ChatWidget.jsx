import { useState } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { api } from '../api/http';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Ask me about the portfolio, work style, or technical stack.' }
  ]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!prompt.trim() || loading) {
      return;
    }
    const nextPrompt = prompt.trim();
    setMessages((current) => [...current, { role: 'user', text: nextPrompt }]);
    setPrompt('');
    setLoading(true);
    try {
      const response = await api.post('/ai/chat', { prompt: nextPrompt });
      setMessages((current) => [...current, { role: 'assistant', text: response.data.text }]);
    } catch (error) {
      setMessages((current) => [...current, { role: 'assistant', text: 'AI service unavailable right now.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-[min(92vw,380px)] overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/90 shadow-glass backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Bot size={16} className="text-cyan-300" /> AI Assistant
            </div>
            <button className="rounded-full p-2 hover:bg-white/10" onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-4 text-sm">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[82%] rounded-2xl px-3 py-2 ${message.role === 'user' ? 'bg-primary text-white' : 'bg-white/10 text-slate-200'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-white/10 p-3">
            <input
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && send()}
              placeholder="Ask something..."
              className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-500"
            />
            <button className="neo-button px-4" onClick={send} disabled={loading}>
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : null}
      <button onClick={() => setOpen(true)} className="neo-button mt-3 inline-flex items-center gap-2 rounded-full px-5 py-4">
        <Bot size={16} /> AI Chat
      </button>
    </div>
  );
}
