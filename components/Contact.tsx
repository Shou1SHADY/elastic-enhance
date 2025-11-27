import React, { useState, useEffect, useRef } from 'react';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', details: '' });
  const sectionRef = useRef<HTMLElement>(null);
  const gradientsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !sectionRef.current) return;

    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5
      }
    });

    // 1. Gradients Move Slow (Deep Background)
    if (gradientsRef.current) {
        tl.to(gradientsRef.current, { yPercent: 15, ease: "none" }, 0);
    }

    // 2. Grid Moves Faster (Mid-ground texture)
    if (gridRef.current) {
        tl.to(gridRef.current, { yPercent: 40, ease: "none" }, 0);
    }

  }, []);

  return (
    <section id={SectionId.CONTACT} ref={sectionRef} className="py-24 bg-[#050505] relative border-t border-white/5 overflow-hidden">
       
       {/* --- Animated Background Layer --- */}
       <div className="absolute inset-0 pointer-events-none overflow-hidden">
          
          {/* Layer 1: Gradients (Slow) */}
          <div ref={gradientsRef} className="absolute inset-0 will-change-transform">
             {/* Base darker gradient to set mood */}
             <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]"></div>

             {/* Slow Moving Aurora Gradient (Accent to Secondary) */}
             <div 
               className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-10 blur-[100px] animate-spin-slow"
               style={{ 
                   background: 'conic-gradient(from 0deg at 50% 50%, #050505 0deg, #72C8C2 100deg, #050505 180deg, #5D9CC9 280deg, #050505 360deg)',
                   animationDuration: '60s'
               }}
             ></div>

             {/* Secondary drifting pool for depth */}
             <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-elastic-secondary/5 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen"></div>
          </div>

          {/* Layer 2: Grid (Fast) */}
          <div ref={gridRef} className="absolute inset-0 will-change-transform">
              {/* Subtle Grid Texture Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:50px_50px] opacity-20"></div>
          </div>
       </div>

       {/* --- Content Container --- */}
       <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-zinc-900/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
             
             {/* Left: Info Console */}
             <div className="lg:col-span-5 p-8 lg:p-12 bg-zinc-900/60 border-r border-white/5 flex flex-col justify-between relative overflow-hidden">
                {/* Top Shine Decoration */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-elastic-accent/50 to-transparent"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-2 border border-elastic-accent rotate-45"></div>
                        <span className="text-elastic-accent font-mono text-xs uppercase tracking-widest">Initialize</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">Start Project</h2>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                        Secure terminal for project initiation. Our engineering team reviews all specifications within 24 hours.
                    </p>
                </div>
                
                <div className="space-y-6 font-mono text-xs text-zinc-300 relative z-10">
                    <div className="flex items-center gap-3 p-3 bg-black/40 border border-white/5 rounded-xl">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-500 tracking-wider">SYSTEM ONLINE</span>
                    </div>
                    
                    <div className="border-l border-white/10 pl-4 space-y-4">
                        <div>
                            <p className="mb-1 text-zinc-500 text-[10px] uppercase tracking-widest">Inquiries</p>
                            <a href="mailto:hello@elastic-mfg.com" className="text-white hover:text-elastic-accent transition-colors cursor-pointer text-sm">hello@elastic-mfg.com</a>
                        </div>
                        <div>
                            <p className="mb-1 text-zinc-500 text-[10px] uppercase tracking-widest">Coordinates</p>
                            <p className="text-white text-sm">Cairo, Egypt // Global Logistics</p>
                        </div>
                    </div>
                </div>

                {/* Subtle sheen interaction */}
                <div className="absolute -inset-full bg-gradient-to-br from-transparent via-white/5 to-transparent rotate-45 pointer-events-none transition-transform duration-1000 group-hover:translate-x-full"></div>
             </div>

             {/* Right: Input Terminal */}
             <div className="lg:col-span-7 p-8 lg:p-12 bg-[#0a0a0a]/60 relative">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Input */}
                        <div className="relative group">
                            <input 
                                type="text" 
                                id="name"
                                className="peer w-full bg-zinc-900/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-elastic-secondary focus:ring-1 focus:ring-elastic-secondary focus:shadow-[0_0_20px_rgba(93,156,201,0.2)] outline-none transition-all placeholder-transparent"
                                placeholder="Name"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                            <label 
                                htmlFor="name"
                                className="absolute left-5 top-4 text-zinc-500 text-xs transition-all 
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-4 
                                peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-elastic-secondary peer-focus:uppercase peer-focus:tracking-wider peer-focus:bg-[#0a0a0a] peer-focus:px-1
                                pointer-events-none 
                                peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-zinc-400 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:bg-[#0a0a0a] peer-[:not(:placeholder-shown)]:px-1"
                            >
                                Full Name
                            </label>
                        </div>

                        {/* Company Input */}
                        <div className="relative group">
                             <input 
                                type="text" 
                                id="company"
                                className="peer w-full bg-zinc-900/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-elastic-secondary focus:ring-1 focus:ring-elastic-secondary focus:shadow-[0_0_20px_rgba(93,156,201,0.2)] outline-none transition-all placeholder-transparent"
                                placeholder="Company"
                                value={formData.company}
                                onChange={e => setFormData({...formData, company: e.target.value})}
                            />
                            <label 
                                htmlFor="company"
                                className="absolute left-5 top-4 text-zinc-500 text-xs transition-all 
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-4 
                                peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-elastic-secondary peer-focus:uppercase peer-focus:tracking-wider peer-focus:bg-[#0a0a0a] peer-focus:px-1
                                pointer-events-none 
                                peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-zinc-400 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:bg-[#0a0a0a] peer-[:not(:placeholder-shown)]:px-1"
                            >
                                Company / Org
                            </label>
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="relative group">
                        <input 
                            type="email" 
                            id="email"
                            className="peer w-full bg-zinc-900/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-elastic-secondary focus:ring-1 focus:ring-elastic-secondary focus:shadow-[0_0_20px_rgba(93,156,201,0.2)] outline-none transition-all placeholder-transparent"
                            placeholder="Email"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                         <label 
                                htmlFor="email"
                                className="absolute left-5 top-4 text-zinc-500 text-xs transition-all 
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-4 
                                peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-elastic-secondary peer-focus:uppercase peer-focus:tracking-wider peer-focus:bg-[#0a0a0a] peer-focus:px-1
                                pointer-events-none 
                                peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-zinc-400 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:bg-[#0a0a0a] peer-[:not(:placeholder-shown)]:px-1"
                            >
                                Email Address
                            </label>
                    </div>

                    {/* Details Textarea */}
                    <div className="relative group">
                        <textarea 
                            id="details"
                            className="peer w-full bg-zinc-900/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-elastic-secondary focus:ring-1 focus:ring-elastic-secondary focus:shadow-[0_0_20px_rgba(93,156,201,0.2)] outline-none transition-all placeholder-transparent h-32 resize-none"
                            placeholder="Details"
                            value={formData.details}
                            onChange={e => setFormData({...formData, details: e.target.value})}
                        ></textarea>
                         <label 
                                htmlFor="details"
                                className="absolute left-5 top-4 text-zinc-500 text-xs transition-all 
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-4 
                                peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-elastic-secondary peer-focus:uppercase peer-focus:tracking-wider peer-focus:bg-[#0a0a0a] peer-focus:px-1
                                pointer-events-none 
                                peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-zinc-400 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:bg-[#0a0a0a] peer-[:not(:placeholder-shown)]:px-1"
                            >
                                Project Parameters
                            </label>
                    </div>

                    <div className="pt-2">
                        <button className="w-full py-4 bg-elastic-accent text-black font-bold text-sm uppercase tracking-[0.2em] rounded-xl shadow-[0_0_20px_rgba(114,200,194,0.3)] hover:bg-white hover:shadow-[0_0_30px_rgba(114,200,194,0.6)] hover:scale-105 transition-all duration-300 ease-out transform active:scale-95 relative overflow-hidden group">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Transmit Data <span className="text-[10px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">→</span>
                            </span>
                        </button>
                    </div>
                </form>
             </div>
          </div>
       </div>
    </section>
  );
};