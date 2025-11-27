
import React, { useState, useRef, useEffect } from 'react';
import { SectionId, Product } from '../types';

const products: Product[] = [
  { id: 'TAC-001', title: 'OPS_PATCH_V1', category: 'MORALE', description: 'Standard issue morale patch with hook backing.', imageUrl: 'https://images.unsplash.com/photo-1620310214309-906927d627b4?q=80&w=1000&auto=format&fit=crop', details: ['3.5mm PVC', 'VELCRO HOOK', 'IR COMPATIBLE'] },
  { id: 'KEY-092', title: 'HEX_CHAIN_L2', category: 'EDC', description: 'Rubberized keychain with hexagonal pattern.', imageUrl: 'https://images.unsplash.com/photo-1622445275576-721325763afe?q=80&w=1000&auto=format&fit=crop', details: ['PANTONE 802C', 'MATTE FINISH', 'BLK SPLIT RING'] },
  { id: 'IND-442', title: 'CORP_BRAND', category: 'PROMO', description: 'Flat corporate branding asset, soft touch.', imageUrl: 'https://images.unsplash.com/photo-1616401776146-236b23d9df6d?q=80&w=1000&auto=format&fit=crop', details: ['2D MOLD', '4 COLOR', 'POLYBAG'] },
  { id: 'FIG-X01', title: 'UNIT_CREST', category: 'MIL-SPEC', description: 'Heavy duty unit crest patch.', imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop', details: ['HAND PAINTED', 'SILICONE', 'HEAVY BASE'] },
  { id: 'FSH-882', title: 'STREET_TAG', category: 'FASHION', description: 'High-detail garment label for streetwear.', imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop', details: ['SEW-ON CHANNEL', 'MATTE', 'EMBOSSED'] },
  { id: 'MED-119', title: 'MEDIC_CROSS', category: 'MORALE', description: 'Glow in the dark medical identifier.', imageUrl: 'https://images.unsplash.com/photo-1550534882-628d61183c51?q=80&w=1000&auto=format&fit=crop', details: ['GITD PIGMENT', 'RED/WHITE', 'WASHABLE'] },
];

export const Portfolio: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState('ALL');
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const filteredProducts = filter === 'ALL' ? products : products.filter(p => p.category === filter);
  const categories = ['ALL', 'MORALE', 'EDC', 'PROMO', 'FASHION'];

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !sectionRef.current || !glowRef.current) return;

    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // 1. Glow moves down slowly
    tl.to(glowRef.current, {
      y: 150,
      ease: "none",
    }, 0);

    // 2. Grid moves up (counter parallax)
    if (gridRef.current) {
        tl.to(gridRef.current, {
            y: -50,
            ease: "none"
        }, 0);
    }
  }, []);

  return (
    <section ref={sectionRef} id={SectionId.PORTFOLIO} className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Layers */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-elastic-secondary/5 blur-[100px] rounded-full pointer-events-none will-change-transform"
      ></div>
      <div 
        ref={gridRef}
        className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none will-change-transform scale-[1.2]"
      ></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
           <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="h-px w-6 bg-elastic-accent"></span>
                <span className="text-elastic-accent font-mono text-xs uppercase tracking-widest">Archive</span>
              </div>
              <h2 className="text-4xl font-bold text-white tracking-tight">Selected Works</h2>
           </div>
           
           <div className="flex gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border transition-all ${
                    filter === cat 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent border-white/10 text-zinc-500 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* Dense Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer relative bg-zinc-900 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                  />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-elastic-accent font-mono text-[9px] mb-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      {product.category}
                  </div>
                  <h3 className="text-white font-bold text-lg uppercase tracking-wide">{product.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compact Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={() => setSelectedProduct(null)}>
          <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <div className="md:w-1/2 relative h-64 md:h-auto bg-zinc-800">
                <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" alt={selectedProduct.title} />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tight">{selectedProduct.title}</h2>
                    <button onClick={() => setSelectedProduct(null)} className="text-zinc-500 hover:text-white">✕</button>
                </div>
                <div className="text-xs font-mono text-elastic-accent mb-6">{selectedProduct.id} // {selectedProduct.category}</div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">{selectedProduct.description}</p>
                <div className="bg-zinc-900/50 p-4 rounded border border-white/5 mb-6">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Specs</div>
                    {selectedProduct.details?.map((d, i) => (
                        <div key={i} className="text-xs text-zinc-300 font-mono py-0.5 border-b border-white/5 last:border-0">{d}</div>
                    ))}
                </div>
                <button className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-zinc-200 transition-colors">
                    Inquire
                </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
