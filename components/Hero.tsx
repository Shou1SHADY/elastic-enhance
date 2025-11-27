
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { SectionId } from '../types';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Constants
  const frameCount = 147;
  const currentFrame = (index: number) => (
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`
  );

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const sequence = useRef({ frame: 0 });

  // Renderer
  const render = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[sequence.current.frame];
    const activeImg = img && img.complete ? img : imagesRef.current.slice(0, sequence.current.frame).reverse().find(i => i && i.complete);

    if (activeImg) {
      const canvas = canvasRef.current;
      const scale = Math.max(canvas.width / activeImg.width, canvas.height / activeImg.height);
      const x = (canvas.width - activeImg.width * scale) / 2;
      const y = (canvas.height - activeImg.height * scale) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(activeImg, 0, 0, activeImg.width, activeImg.height, x, y, activeImg.width * scale, activeImg.height * scale);
    }
  };

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    window.gsap.registerPlugin(window.ScrollTrigger);

    const resize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render();
      }
    };
    window.addEventListener('resize', resize);
    resize();

    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => { if (i === 0) render(); };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    return () => window.removeEventListener('resize', resize);
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ctx = window.gsap.context(() => {
        window.gsap.to(sequence.current, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=300%", 
                scrub: 0.5,
                pin: true,
                onUpdate: () => render()
            }
        });

        // Parallax Text
        window.gsap.to('.hero-text-container', {
            y: -150,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=100%",
                scrub: true
            }
        });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
      document.getElementById(SectionId.ABOUT)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} id={SectionId.HERO} className="relative w-full h-screen bg-[#050505] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-10 block" />
      
      {/* Gradients for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-radial-fade opacity-30 z-10 pointer-events-none"></div>

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="hero-text-container max-w-[1200px] w-full px-6 flex flex-col items-center text-center">
            
            <div className="mb-6 flex items-center gap-4 animate-fade-in-up">
               <div className="h-[1px] w-12 bg-white/30"></div>
               <span className="font-mono text-xs text-white/60 tracking-[0.3em] uppercase">Precision Manufacturing</span>
               <div className="h-[1px] w-12 bg-white/30"></div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95] drop-shadow-2xl mb-8">
                MOLDING IDEAS<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-400 to-zinc-700">INTO REALITY</span>
            </h1>
            
            <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-10 font-light border-l border-white/10 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                Advanced polymer engineering for the modern industrial age. 
                We bridge the gap between digital concepts and tangible high-fidelity products.
            </p>

            <button 
                onClick={scrollToAbout}
                className="group relative px-8 py-3 bg-white text-black font-bold text-sm tracking-widest uppercase rounded-sm overflow-hidden transition-transform hover:scale-105"
            >
                <span className="relative z-10">Discover System</span>
                <div className="absolute inset-0 bg-elastic-accent transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
            </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 mix-blend-difference">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
            <div className="w-full h-1/2 bg-white animate-scan"></div>
          </div>
      </div>
    </section>
  );
};
