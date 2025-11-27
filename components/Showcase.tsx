import React, { useRef, useEffect } from 'react';
import { SectionId } from '../types';

export const Showcase: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <section id={SectionId.SHOWCASE} className="relative py-40 bg-[#050505] border-y border-white/5 overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-elastic-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="flex justify-between items-end mb-16">
                <div>
                   <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-2">
                       Live_Feed
                   </h2>
                   <p className="text-zinc-500 font-mono text-xs tracking-widest">
                       OPERATIONAL SURVEILLANCE // CAM_04
                   </p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-500 font-mono text-[10px] tracking-widest uppercase">Recording</span>
                </div>
            </div>

            <div className="relative aspect-[21/9] border border-white/10 bg-black overflow-hidden group shadow-2xl">
                {/* Video Placeholder */}
                <video 
                    ref={videoRef}
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                    src="https://videos.pexels.com/video-files/2516159/2516159-hd_1920_1080_24fps.mp4"
                />

                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

                {/* Camera UI Overlay */}
                <div className="absolute inset-6 border border-white/20 flex flex-col justify-between p-6 pointer-events-none z-20">
                    <div className="flex justify-between">
                        <div className="w-4 h-4 border-l-2 border-t-2 border-elastic-accent"></div>
                        <div className="w-4 h-4 border-r-2 border-t-2 border-elastic-accent"></div>
                    </div>
                    
                    {/* Center Focus Reticle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                         <div className="w-24 h-24 border border-elastic-accent/50 rounded-full flex items-center justify-center animate-spin-slow">
                             <div className="w-1 h-1 bg-elastic-accent"></div>
                         </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="w-4 h-4 border-l-2 border-b-2 border-elastic-accent"></div>
                        <div className="w-4 h-4 border-r-2 border-b-2 border-elastic-accent"></div>
                    </div>
                </div>

                {/* Data Readout */}
                <div className="absolute bottom-10 left-10 z-20 font-mono text-[9px] text-white/70 space-y-1">
                    <div className="flex gap-4">
                        <span>ISO: 800</span>
                        <span>SHUTTER: 1/120</span>
                        <span>APERTURE: F/2.8</span>
                    </div>
                    <div className="text-elastic-accent">FOCUS_MODE: AI_TRACKING</div>
                </div>
            </div>
        </div>
    </section>
  );
};