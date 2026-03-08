import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-6 bg-neutral-950">
      <div className="absolute inset-0 z-0 bg-neutral-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(217,119,6,0.1),_rgba(0,0,0,0))]"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-semibold tracking-wider uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            New Signature Roasts
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tighter text-white">
            Artisan<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">
              Brewing.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-md font-light leading-relaxed">
            Experience the perfect balance of flavor and craft. Every cup tells a story of passion, origin, and precision roasting.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link to="/menu" className="bg-white text-neutral-900 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95">
              Explore Menu <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/about" className="px-8 py-4 rounded-full font-bold border border-neutral-700 text-white hover:border-neutral-500 transition-colors">
              Our Story
            </Link>
          </div>
          
          <div className="flex items-center gap-6 pt-12 border-t border-neutral-800">
            <div className="flex -space-x-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-xs font-medium text-neutral-500" />
              ))}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current"/>
                <Star className="w-4 h-4 fill-current"/>
                <Star className="w-4 h-4 fill-current"/>
                <Star className="w-4 h-4 fill-current"/>
                <Star className="w-4 h-4 fill-current"/>
                <span className="text-white font-bold ml-1">4.9</span>
              </div>
              <div className="text-sm font-medium text-neutral-500">Over 10,000+ happy customers</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:flex justify-center"
        >
          <div className="absolute inset-0 bg-amber-500/20 blur-[120px] rounded-full mix-blend-screen scale-75"></div>
          
          <div className="relative w-full aspect-square max-w-[500px] border border-neutral-800/50 rounded-full p-8 group">
            <div className="w-full h-full border border-neutral-800 rounded-full p-8">
               <div className="w-full h-full rounded-full bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay z-10"></div>
                  <img 
                    src="/hero-element.png" 
                    alt="Artisan Coffee Beans"
                    className="w-full h-full object-cover saturate-150 animate-[spin_30s_linear_infinite] transition-all duration-700 z-0"
                  />
               </div>
            </div>
            
            {/* Floating badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-1/4 -right-4 bg-neutral-900 border border-neutral-800 p-4 rounded-2xl shadow-xl glass"
            >
              <div className="text-amber-500 font-black text-xl">100%</div>
              <div className="text-xs text-neutral-400 font-medium text-white">Arabica Beans</div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 -left-8 bg-neutral-900 border border-neutral-800 p-4 rounded-2xl shadow-xl glass z-20"
            >
              <div className="flex gap-2 items-center">
                 <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                   <Coffee className="w-4 h-4 text-amber-500" />
                 </div>
                 <div>
                   <div className="text-sm font-bold text-white">Freshly Brewed</div>
                   <div className="text-xs text-neutral-400">Every single day</div>
                 </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Home;
