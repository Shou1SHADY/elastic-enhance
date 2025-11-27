
import React, { useEffect, useRef } from 'react';
import { SectionId } from '../types';

const features = [
    {
        title: "Material Science",
        description: "Engineered Soft PVC & Silicone blends tested for extreme durability, UV resistance, and color fidelity.",
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
    },
    {
        title: "Micro-Precision",
        description: "5-Axis CNC milling creates aluminum molds with 0.05mm tolerance for razor-sharp detailing.",
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
    },
    {
        title: "Global Logistics",
        description: "Automated fulfillment pipelines shipping 500k+ units monthly with real-time tracking.",
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    }
];

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgGradientRef = useRef<HTMLDivElement>(null);
  const radialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !sectionRef.current) return;
    
    // Cards Animation Entrance
    window.gsap.fromTo(sectionRef.current.querySelectorAll('.feature-card'), 
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      }
    );

    // Parallax Backgrounds
    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5 // Smoothing
      }
    });

    // 1. Side Gradient moves down slightly faster than scroll
    if (bgGradientRef.current) {
      tl.to(bgGradientRef.current, { yPercent: 30, ease: "none" }, 0);
    }
    
    // 2. Center Radial fade moves up (counter-movement) for depth
    if (radialRef.current) {
      tl.to(radialRef.current, { yPercent: -20, ease: "none" }, 0);
    }

  }, []);

  return (
    <section id={SectionId.ABOUT} ref={sectionRef} className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div 
        ref={radialRef}
        className="absolute inset-0 bg-radial-fade opacity-20 pointer-events-none will-change-transform"
      ></div>
      <div 
        ref={bgGradientRef} 
        className="absolute -top-[20%] right-0 w-1/3 h-[140%] bg-gradient-to-l from-white/5 to-transparent pointer-events-none will-change-transform"
      ></div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-end border-b border-white/10 pb-12">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-8 bg-elastic-accent"></span>
                    <span className="text-elastic-accent font-mono text-xs uppercase tracking-[0.2em]">Capabilities</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                    Engineering The<br/> Intangible.
                </h2>
            </div>
            <div>
                <p className="text-zinc-400 text-lg leading-relaxed font-light">
                    We sit at the intersection of heavy industry and delicate art. 
                    Using advanced production pipelines, we translate vector data into tactile, high-fidelity physical goods.
                </p>
            </div>
        </div>

        {/* Dense Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
                <div 
                    key={idx} 
                    className="feature-card group relative bg-zinc-900/40 border border-white/5 p-6 md:p-8 rounded-xl backdrop-blur-sm 
                    hover:bg-zinc-800/80 hover:border-elastic-accent/30 
                    hover:-translate-y-3 hover:scale-[1.02]
                    transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                    shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                >
                    {/* Subtle Internal Glow Gradient on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-elastic-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>

                    <div className="relative w-12 h-12 rounded-lg bg-black border border-white/10 flex items-center justify-center text-white mb-6 group-hover:text-elastic-accent group-hover:border-elastic-accent group-hover:scale-110 transition-all duration-500">
                        {feature.icon}
                    </div>
                    <h3 className="relative text-xl text-white font-bold mb-3">{feature.title}</h3>
                    <p className="relative text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors duration-300">
                        {feature.description}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};
