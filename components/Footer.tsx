
import React from 'react';
import { Logo } from './Logo';
import { SectionId } from '../types';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-zinc-900 relative overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoNHYxSDB6IiBmaWxsPSIjMzMzIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
           <div className="lg:col-span-2">
              <Logo className="h-8 w-auto mb-8" />
              <p className="text-zinc-500 text-xs leading-relaxed max-w-sm font-mono">
                 Elastic Manufacturing Unit.<br/>
                 Precision rubber fabrication for industrial applications.<br/>
                 Est. 2023 // Cairo, Egypt.
              </p>
           </div>

           <div>
              <h4 className="text-white font-mono text-[10px] uppercase tracking-[0.2em] mb-6 text-elastic-accent">System</h4>
              <ul className="space-y-3 font-mono text-xs text-zinc-500 uppercase tracking-wide">
                 <li><a href={`#${SectionId.ABOUT}`} className="hover:text-white transition-colors block">Philosophy</a></li>
                 <li><a href={`#${SectionId.PROCESS}`} className="hover:text-white transition-colors block">Protocol</a></li>
                 <li><a href={`#${SectionId.PORTFOLIO}`} className="hover:text-white transition-colors block">Archive</a></li>
              </ul>
           </div>

           <div>
              <h4 className="text-white font-mono text-[10px] uppercase tracking-[0.2em] mb-6 text-elastic-accent">Network</h4>
              <ul className="space-y-3 font-mono text-xs text-zinc-500 uppercase tracking-wide">
                 <li><a href="#" className="hover:text-white transition-colors block">Instagram</a></li>
                 <li><a href="#" className="hover:text-white transition-colors block">LinkedIn</a></li>
                 <li><a href="#" className="hover:text-white transition-colors block">Twitter / X</a></li>
              </ul>
           </div>
        </div>

        <div className="border-t border-zinc-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-[12vw] md:text-8xl font-bold text-zinc-900 tracking-tighter select-none leading-none">
                ELASTIC
            </h1>
            <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest text-right">
                <p>© {new Date().getFullYear()} Elastic MFG.</p>
                <p>All Systems Operational</p>
            </div>
        </div>

      </div>
    </footer>
  );
};
