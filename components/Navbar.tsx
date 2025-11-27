
import React, { useState, useEffect, useRef } from 'react';
import { SectionId } from '../types';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    if (window.gsap) {
      window.gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!window.gsap || !mobileMenuRef.current) return;
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const tl = window.gsap.timeline();
      tl.to(mobileMenuRef.current, { y: '0%', duration: 0.6, ease: 'power4.inOut' })
        .fromTo(mobileMenuRef.current.querySelectorAll('.mobile-link'), 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power2.out' }
        );
    } else {
      document.body.style.overflow = '';
      window.gsap.to(mobileMenuRef.current, { y: '-100%', duration: 0.6, ease: 'power4.inOut' });
    }
  }, [mobileMenuOpen]);

  const scrollTo = (id: SectionId) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
    }
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
          scrolled || mobileMenuOpen
            ? 'bg-[#050505]/90 backdrop-blur-xl border-white/10 py-4' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-12 items-center">
          
          {/* Logo */}
          <div className="col-span-6 md:col-span-3 flex items-center">
            <div className="cursor-pointer z-50 relative hover:opacity-80 transition-opacity" onClick={() => scrollTo(SectionId.HERO)}>
               <Logo className={`transition-all duration-500 ${scrolled ? 'h-8' : 'h-10'}`} />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex col-span-6 justify-center gap-8 font-sans text-sm font-medium tracking-wide text-zinc-400">
            {[SectionId.ABOUT, SectionId.PROCESS, SectionId.PORTFOLIO].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="relative group py-2 capitalize transition-colors hover:text-white"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-elastic-accent origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </button>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="col-span-6 md:col-span-3 flex justify-end items-center gap-6">
            <button 
              onClick={() => scrollTo(SectionId.CONTACT)}
              className="hidden md:flex items-center justify-center px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 transform hover:scale-105 bg-white text-black hover:bg-elastic-accent border border-transparent shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Start Project
            </button>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden z-50 text-white w-8 h-8 flex flex-col justify-center items-end gap-1.5 group"
            >
                <span className={`h-0.5 bg-current transition-all duration-300 rounded-full ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 rounded-full ${mobileMenuOpen ? 'opacity-0' : 'w-4 group-hover:w-6'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 rounded-full ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5 group-hover:w-6'}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-[#0a0a0a] transform -translate-y-full flex flex-col justify-center items-center md:hidden"
      >
        <div className="flex flex-col gap-8 text-center">
           {[SectionId.ABOUT, SectionId.PROCESS, SectionId.PORTFOLIO, SectionId.CONTACT].map((item) => (
             <button
               key={item}
               onClick={() => scrollTo(item)}
               className="mobile-link text-4xl font-bold text-white tracking-tight hover:text-elastic-accent transition-colors capitalize"
             >
               {item}
             </button>
           ))}
        </div>
      </div>
    </>
  );
};
