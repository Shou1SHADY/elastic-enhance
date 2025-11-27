import React, { useEffect, useRef } from 'react';

export const VideoHighlight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !containerRef.current) return;

    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Reveal Text
    if (textRef.current) {
        tl.fromTo(textRef.current.querySelectorAll('.reveal-text'), 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
        );
    }

    // Parallax Video
    if (videoWrapperRef.current) {
        window.gsap.to(videoWrapperRef.current, {
            y: "15%",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#050505] border-b border-white/5">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Video Side (70%) - Increased Height & Width */}
        <div className="w-full lg:w-[70%] relative overflow-hidden h-[80vh] lg:h-auto border-r border-white/5 bg-zinc-900 group">
           {/* Parallax Wrapper */}
           <div ref={videoWrapperRef} className="absolute inset-0 h-[120%] -top-[10%] w-full">
               <video 
                 autoPlay 
                 muted 
                 loop 
                 playsInline
                 poster="https://images.pexels.com/photos/3195394/pexels-photo-3195394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                 className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-1000 scale-105 group-hover:scale-100"
                 src="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4"
               />
               {/* Vignette & Gradient */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>
               <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none opacity-60"></div>
               
               {/* Scanline Texture */}
               <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none"></div>
           </div>

           {/* HUD Overlay Interface */}
           <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between pointer-events-none z-10">
               {/* Top Bar */}
               <div className="flex justify-between items-start border-t border-white/10 pt-4">
                   <div className="flex flex-col gap-1">
                       <div className="font-mono text-[9px] text-elastic-accent tracking-[0.2em] opacity-80 uppercase">
                           CAM_FEED_01 // LIVE
                       </div>
                       <div className="w-12 h-0.5 bg-elastic-accent"></div>
                   </div>
                   
                   <div className="text-right">
                       <div className="flex items-center gap-2 justify-end mb-1">
                           <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                           <span className="font-mono text-[9px] text-white/90 tracking-widest uppercase text-shadow">REC • 00:04:22:18</span>
                       </div>
                       <div className="font-mono text-[9px] text-white/40 uppercase">
                           4K_RAW / ISO_800 / F2.8
                       </div>
                   </div>
               </div>

               {/* Center Focus Reticle */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
                    <div className="w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] border border-white/30 rounded-full flex items-center justify-center relative">
                        {/* Crosshairs */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-white/20"></div>
                        <div className="absolute left-1/2 top-0 h-full w-px bg-white/20"></div>
                        
                        {/* Brackets */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-white/60"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-white/60"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-1 bg-white/60"></div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-1 bg-white/60"></div>
                    </div>
               </div>

               {/* Bottom Data Panel */}
               <div className="flex items-end justify-between border-b border-white/10 pb-4">
                   <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 md:p-6 w-full max-w-sm rounded-sm">
                       <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                           <span className="font-mono text-[10px] text-elastic-accent uppercase tracking-widest">Telemetry_Stream</span>
                           <div className="flex gap-1">
                               <div className="w-1 h-1 bg-elastic-accent rounded-full animate-ping"></div>
                               <div className="w-1 h-1 bg-elastic-accent rounded-full"></div>
                           </div>
                       </div>
                       <div className="grid grid-cols-2 gap-y-3 gap-x-8 font-mono text-[10px]">
                           <div className="flex justify-between text-zinc-400"><span>TORQUE</span> <span className="text-white">450 NM</span></div>
                           <div className="flex justify-between text-zinc-400"><span>TEMP</span> <span className="text-white">42°C</span></div>
                           <div className="flex justify-between text-zinc-400"><span>PSI</span> <span className="text-white">1200</span></div>
                           <div className="flex justify-between text-zinc-400"><span>CYCLE</span> <span className="text-white">0.45 S</span></div>
                       </div>
                   </div>
                   
                   {/* Timeline Simulation */}
                   <div className="hidden md:flex flex-col items-end gap-2 w-1/3">
                       <div className="w-full h-px bg-white/20 relative">
                           <div className="absolute left-0 top-0 h-full w-[65%] bg-elastic-accent"></div>
                           <div className="absolute left-[65%] top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                       </div>
                       <div className="flex justify-between w-full font-mono text-[9px] text-white/50">
                           <span>00:00</span>
                           <span>01:00</span>
                       </div>
                   </div>
               </div>
           </div>
        </div>

        {/* Text Side (30%) - Compact & Editorial */}
        <div className="w-full lg:w-[30%] flex flex-col justify-center px-8 py-24 lg:p-12 relative z-10 bg-[#050505]">
           <div ref={textRef} className="max-w-md mx-auto relative">
               
               {/* Vertical Line Decoration */}
               <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-900 -ml-4 hidden md:block"></div>

               <div className="reveal-text mb-8 flex items-center gap-4 opacity-50">
                   <div className="w-2 h-2 border border-elastic-accent rotate-45"></div>
                   <span className="text-white font-mono text-[10px] uppercase tracking-[0.2em]">Our Philosophy</span>
               </div>

               <h2 className="reveal-text text-4xl lg:text-5xl font-bold text-white leading-none tracking-tighter mb-8">
                   ATOMIC <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-elastic-accent to-elastic-secondary">CONSISTENCY</span>
               </h2>

               <p className="reveal-text text-zinc-400 text-sm leading-relaxed mb-10 font-light pl-2 border-l border-elastic-accent/30">
                   Precision is not an act, but a habit. Our automated molding lines ensure that unit #001 is identical to unit #1,000,000. 
                   <br/><br/>
                   No deviation. No compromise. Just pure, repeatable perfection.
               </p>

               <div className="reveal-text grid grid-cols-1 gap-3">
                   {[
                       { label: 'Variance', value: '< 0.01%', desc: 'TOLERANCE' },
                       { label: 'Uptime', value: '99.9%', desc: 'RELIABILITY' },
                       { label: 'Capacity', value: '24/7', desc: 'OPERATION' }
                   ].map((stat, i) => (
                       <div key={i} className="bg-zinc-900/50 border border-white/5 p-4 flex items-center justify-between group hover:border-elastic-accent/30 transition-colors">
                           <div>
                               <div className="text-zinc-600 text-[9px] uppercase tracking-wider mb-0.5 font-mono group-hover:text-elastic-accent transition-colors">{stat.desc}</div>
                               <div className="text-white text-xs font-bold uppercase">{stat.label}</div>
                           </div>
                           <div className="text-elastic-accent font-mono text-lg">{stat.value}</div>
                       </div>
                   ))}
               </div>
               
               <button className="reveal-text mt-12 w-full py-4 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all group flex justify-center items-center gap-2">
                   <span>Explore Technology</span>
                   <span className="group-hover:translate-x-1 transition-transform">→</span>
               </button>
           </div>
        </div>

      </div>
    </section>
  );
};