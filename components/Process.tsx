
import React, { useEffect, useRef } from 'react';
import { SectionId } from '../types';

const steps = [
  { id: '01', title: 'CAD Optimization', desc: 'Vector layer separation & structural integrity verification.' },
  { id: '02', title: 'CNC Milling', desc: '7075 Aluminum Mold Carving with high-speed tooling.' },
  { id: '03', title: 'Pigment Mix', desc: 'Pantone® PMS Color Matching & chemical prep.' },
  { id: '04', title: 'Injection', desc: 'Robotic Liquid PVC Dispensing.' },
  { id: '05', title: 'Thermal Cure', desc: '180°C Baking Process & rapid cooling cycles.' },
  { id: '06', title: 'QC Inspect', desc: 'Optical verification & manual finishing.' }
];

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !containerRef.current) return;
    
    const cards = containerRef.current.querySelectorAll('.process-card');
    cards.forEach((card) => {
      window.gsap.fromTo(card, 
        { opacity: 0.3, x: 20 },
        {
          opacity: 1, x: 0, duration: 0.6,
          scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );
    });
  }, []);

  return (
    <section id={SectionId.PROCESS} ref={containerRef} className="py-24 bg-[#080808] relative border-y border-white/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
      
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">
           
           {/* Left: Sticky Title */}
           <div className="lg:col-span-4">
              <div className="sticky top-32">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="h-px w-8 bg-elastic-accent"></span>
                    <span className="text-elastic-accent font-mono text-xs uppercase tracking-[0.2em]">Protocol</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">
                    PRODUCTION<br/>SEQUENCE
                  </h2>
                  
                  <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                      From digital file to physical artifact. Our 6-stage protocol ensures zero defect manufacturing at scale.
                  </p>

                  <div className="h-px w-full bg-white/10"></div>
              </div>
           </div>

           {/* Right: Steps Stream */}
           <div className="lg:col-span-8 flex flex-col gap-4">
              {steps.map((step, idx) => (
                  <div key={idx} className="process-card group flex items-start gap-6 p-8 bg-zinc-900/30 border border-white/5 rounded-xl hover:bg-zinc-900/80 hover:border-elastic-accent/30 transition-all duration-300">
                      <div className="font-mono text-elastic-accent/50 text-sm pt-1 group-hover:text-elastic-accent transition-colors">
                          {step.id}
                      </div>
                      <div className="flex-1">
                          <h3 className="text-xl text-white font-bold mb-2 group-hover:translate-x-1 transition-transform">
                             {step.title}
                          </h3>
                          <p className="text-zinc-500 text-sm group-hover:text-zinc-400">
                             {step.desc}
                          </p>
                      </div>
                      <div className="w-1 h-1 bg-white/20 rounded-full mt-3 group-hover:bg-elastic-accent group-hover:shadow-[0_0_8px_#72C8C2] transition-all"></div>
                  </div>
              ))}
           </div>
      </div>
    </section>
  );
};
