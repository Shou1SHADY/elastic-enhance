
import React, { useEffect, useRef } from 'react';

export const VideoHighlight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

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
    if (textContentRef.current) {
        tl.fromTo(textContentRef.current.querySelectorAll('.reveal-text'), 
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
    <section ref={containerRef} className="relative bg-[#050505] border-b border-white/5 overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Video Side (65%) */}
        <div className="w-full lg:w-[65%] relative overflow-hidden h-[60vh] lg:h-auto border-r border-white/5 bg-zinc-900 group order-1 lg:order-1">
           {/* Parallax Wrapper */}
           <div ref={videoWrapperRef} className="absolute inset-0 h-[120%] -top-[10%] w-full">
               <video 
                 autoPlay 
                 muted 
                 loop 
                 playsInline
                 poster="https://images.pexels.com/photos/3195394/pexels-photo-3195394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                 className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-1000 scale-105 group-hover:scale-100 filter contrast-125 grayscale"
                 src="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4"
               />
               {/* Vignette & Art Overlays */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)] pointer-events-none"></div>
               <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none"></div>
               <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoNHYxSDB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-20 pointer-events-none"></div>
           </div>

           {/* Artistic HUD Elements */}
           <div className="absolute inset-0 p-6 md:p-10 pointer-events-none z-10 flex flex-col justify-between">
               {/* Crosshair Top-Left */}
               <div className="w-8 h-8 border-l border-t border-white/30"></div>
               {/* Crosshair Bottom-Right */}
               <div className="w-8 h-8 border-r border-b border-white/30 self-end"></div>
               
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
           </div>
        </div>

        {/* Text Side (35%) */}
        <div className="w-full lg:w-[35%] flex flex-col justify-center relative z-10 bg-[#050505] order-2 lg:order-2 border-t lg:border-t-0 border-white/5">
           
           {/* Decorative Background */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(114,200,194,0.05),transparent_40%)] pointer-events-none"></div>

           {/* Content Wrapper - STRICT 1200px Alignment Logic (Calculated via padding) */}
           <div ref={textRef} className="w-full h-full flex flex-col justify-center p-8 md:p-12 lg:p-16 xl:p-20 relative">
               
               <div ref={textContentRef}>
                   <div className="reveal-text mb-8 flex items-center gap-4">
                       <div className="w-2 h-2 bg-elastic-accent rounded-full animate-pulse"></div>
                       <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">Core Philosophy</span>
                   </div>

                   <h2 className="reveal-text text-4xl lg:text-5xl font-bold text-white leading-[0.9] tracking-tighter mb-8">
                       ATOMIC <br/>
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-elastic-accent via-white to-elastic-secondary">CONSISTENCY</span>
                   </h2>

                   <div className="reveal-text w-12 h-1 bg-gradient-to-r from-elastic-accent to-transparent mb-8"></div>

                   <p className="reveal-text text-zinc-400 text-sm leading-relaxed mb-10 font-light">
                       In a world of variance, we offer absolute certainty. 
                       Our automated lines utilize real-time optical grading to ensure that unit #001 is microscopically identical to unit #1,000,000.
                   </p>

                   <div className="reveal-text grid grid-cols-1 gap-4 border-t border-white/10 pt-8">
                       {[
                           { label: 'Precision', value: '99.99%', desc: 'OPTICAL GRADE' },
                           { label: 'Throughput', value: '24/7', desc: 'NON-STOP' }
                       ].map((stat, i) => (
                           <div key={i} className="flex items-center justify-between group">
                               <div>
                                   <div className="text-zinc-600 text-[9px] uppercase tracking-widest mb-1 group-hover:text-elastic-accent transition-colors">{stat.desc}</div>
                                   <div className="text-white text-lg font-bold font-mono">{stat.value}</div>
                               </div>
                               <div className="w-2 h-2 rounded-full border border-zinc-700 group-hover:bg-elastic-accent group-hover:border-elastic-accent transition-all"></div>
                           </div>
                       ))}
                   </div>
               </div>
               
           </div>
        </div>

      </div>
    </section>
  );
};
