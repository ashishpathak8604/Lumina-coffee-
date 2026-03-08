import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

// High-quality placeholder images via Unsplash since generative AI quota was reached
const menuItems = [
  { name: "Ethiopian Yirgacheffe", price: "$6.50", desc: "Light roast with floral notes and bright citrus acidity.", category: "Single Origin", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600" },
  { name: "Guatemalan Antigua", price: "$6.00", desc: "Medium roast, full-bodied with a rich chocolate nuance and subtle spice.", category: "Single Origin", img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=600" },
  { name: "Lumina Signature Blend", price: "$5.50", desc: "Our house blend. Smooth, balanced, with hints of caramel and toasted nuts.", category: "Blends", img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600" },
  { name: "Midnight Espresso", price: "$4.50", desc: "Intense, syrupy sweet, and highly aromatic. Perfect crema.", category: "Espresso", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600" },
  { name: "Oat Milk Flat White", price: "$5.50", desc: "Silky microfoam poured over our signature espresso.", category: "Milk Based", img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=600" },
  { name: "Cold Brew Reserve", price: "$6.00", desc: "Steeped for 24 hours. Exceptionally smooth and highly caffeinated.", category: "Cold", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600" },
];

function Menu() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { addToCart } = useCart();

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="min-h-screen bg-neutral-950 text-white pt-32 pb-20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      
      {/* Floating Image Cursor Effect */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            className="pointer-events-none fixed z-50 w-64 h-80 rounded-[2rem] p-2 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 bg-white/5 backdrop-blur-xl"
            style={{
              left: mousePos.x + 24,
              top: mousePos.y - 160,
            }}
          >
             <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
               <div className="absolute inset-0 bg-neutral-900/10 mix-blend-overlay z-10 transition-colors duration-500"></div>
               <img 
                 src={menuItems[hoveredIndex].img} 
                 alt={menuItems[hoveredIndex].name} 
                 className="w-full h-full object-cover"
               />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 px-6"
        >
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter">
            The <span className="text-amber-500">Menu.</span>
          </h1>
          <p className="text-neutral-400 text-lg">Hover to preview our selections.</p>
        </motion.div>

        {/* Auto-scrolling images "scroll show" */}
        <div className="w-full overflow-hidden py-12 relative flex select-none">
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-neutral-950 via-neutral-950/80 to-transparent z-10 pointer-events-none"></div>
          
          <motion.div 
            className="flex gap-8 whitespace-nowrap px-8 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          >
             {/* Duplicate array to create pure seamless loop */}
             {[...menuItems, ...menuItems].map((item, idx) => (
                <div key={idx} className="w-72 h-[400px] shrink-0 rounded-[2rem] overflow-hidden relative group shadow-2xl">
                   <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent z-10 pointer-events-none group-hover:opacity-60 transition-opacity duration-500"></div>
                   <img src={item.img} className="w-full h-full object-cover saturate-50 group-hover:saturate-100 group-hover:scale-105 transition-all duration-700 ease-out" alt={item.name} />
                   <div className="absolute bottom-8 left-8 right-8 z-20 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                     <p className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.category}</p>
                     <h3 className="font-bold text-white text-xl whitespace-normal leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-lg">{item.name}</h3>
                   </div>
                </div>
             ))}
          </motion.div>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto px-6">
          {menuItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden bg-neutral-900/20 hover:bg-neutral-900/80 border border-transparent hover:border-neutral-800 rounded-2xl p-6 transition-all duration-300 flex flex-col md:flex-row justify-between md:items-center gap-4"
            >
              <div className="space-y-2 z-10 relative">
                <div className="text-xs font-semibold text-amber-500 uppercase tracking-widest">{item.category}</div>
                <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">{item.name}</h3>
                <p className="text-neutral-500 font-light max-w-lg transition-colors group-hover:text-neutral-300">{item.desc}</p>
              </div>
              <div className="flex items-center gap-6 shrink-0 z-10 relative">
                <div className="text-2xl font-black text-white">
                  {item.price}
                </div>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-amber-500 hover:text-neutral-900 flex items-center justify-center transition-colors shadow-lg active:scale-90"
                  aria-label="Add to order"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Menu;
