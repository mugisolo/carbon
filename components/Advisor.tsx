
import React, { useState, useRef, useEffect } from 'react';
import { askAdvisor } from '../services/geminiService';
import { GroundingChunk } from '../types';

interface Message {
  role: 'user' | 'ai';
  content: string;
  grounding?: GroundingChunk[];
}

const Advisor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Hello! I'm your advisor. I can help with real-time research, complex financial analysis, or mapping forest reserves." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'search' | 'thinking' | 'maps'>('search');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await askAdvisor(userMsg, mode);
    setMessages(prev => [...prev, { role: 'ai', content: response.text, grounding: response.grounding }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[650px] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
      <div className="bg-slate-900 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
            mode === 'search' ? 'bg-emerald-500' : mode === 'thinking' ? 'bg-purple-500' : 'bg-blue-500'
          }`}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-widest">Gemini Impact Intel</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">Powered by Multi-Modal Agentic Workflows</p>
          </div>
        </div>
        
        {/* Mode Selector */}
        <div className="flex bg-slate-800 p-1 rounded-xl">
          {['search', 'thinking', 'maps'].map((m: any) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                mode === m ? 'bg-slate-700 text-emerald-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto space-y-6 bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] space-y-4`}>
              <div className={`p-5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white shadow-xl' 
                  : 'bg-white text-slate-700 shadow-sm border border-slate-200'
              }`}>
                {msg.content}
              </div>
              
              {/* Grounding Sources */}
              {msg.grounding && msg.grounding.length > 0 && (
                <div className="flex flex-wrap gap-2 px-1">
                  {msg.grounding.map((chunk, idx) => {
                    const source = chunk.web || chunk.maps;
                    if (!source) return null;
                    return (
                      <a 
                        key={idx} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center space-x-2 bg-white/80 border border-slate-200 px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-600 hover:bg-white transition-all shadow-sm"
                      >
                        <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 100-2H5z"></path></svg>
                        <span className="truncate max-w-[150px]">{source.title}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-center space-x-2 p-5">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {mode === 'thinking' ? 'Deep Reasoning Active...' : 'Polling Global Data...'}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={mode === 'search' ? 'Search market data...' : mode === 'thinking' ? 'Complex analysis...' : 'Find a location...'}
            className="flex-grow px-6 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-sm outline-none"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className={`px-8 py-4 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest transition-all ${
              isLoading ? 'bg-slate-300' : 'bg-slate-900 hover:bg-slate-800 shadow-xl'
            }`}
          >
            Execute
          </button>
        </div>
      </div>
    </div>
  );
};

export default Advisor;
