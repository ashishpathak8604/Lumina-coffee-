import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

function Order() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12 relative z-10">
        
        {/* Cart Items Section */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              Your <span className="text-amber-500">Order.</span>
            </h1>
            <p className="text-neutral-400 text-lg mt-2">
              {cartCount > 0 ? `You have ${cartCount} items in your cart.` : 'Your cart is currently empty.'}
            </p>
          </motion.div>

          <div className="space-y-6">
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div 
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 group hover:border-neutral-700 transition-colors"
                >
                  <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-neutral-800">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover saturate-50 group-hover:saturate-100 transition-all duration-500" />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between h-full space-y-4 w-full">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="text-xs font-semibold text-amber-500 uppercase tracking-widest">{item.category}</div>
                        <h3 className="text-xl font-bold text-white leading-tight">{item.name}</h3>
                      </div>
                      <div className="text-xl font-black text-white shrink-0">
                        ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end w-full">
                      <button 
                        onClick={() => removeFromCart(item.name)}
                        className="text-neutral-500 hover:text-red-400 transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                      
                      <div className="flex items-center gap-4 bg-neutral-950 px-2 py-1.5 rounded-full border border-neutral-800">
                        <button 
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {cart.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 border-2 border-dashed border-neutral-800 rounded-3xl flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-neutral-700" />
                </div>
                <h3 className="text-2xl font-bold text-white">Your cup is empty</h3>
                <p className="text-neutral-500 max-w-sm">Looks like you haven't added any of our artisan roasts to your order yet.</p>
                <Link to="/menu" className="mt-4 bg-white text-neutral-900 px-8 py-3 rounded-full font-bold hover:bg-neutral-200 transition-colors">
                  Explore Menu
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* Order Summary Form Section */}
        <div className="lg:col-span-1">
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="sticky top-32 bg-neutral-900 border border-neutral-800 rounded-[2rem] p-8 shadow-2xl"
           >
             <h2 className="text-2xl font-bold mb-6 pb-6 border-b border-neutral-800">Order Summary</h2>
             
             <div className="space-y-4 mb-6">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${cartTotal}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Taxes (Included)</span>
                  <span className="text-white font-medium">$0.00</span>
                </div>
             </div>

             <div className="flex justify-between items-center text-xl font-black text-white pt-6 border-t border-neutral-800 mb-8">
               <span>Total</span>
               <span className="text-amber-500">${cartTotal}</span>
             </div>

             <button 
               onClick={() => navigate('/checkout')}
               disabled={cart.length === 0}
               className="w-full bg-amber-500 text-neutral-900 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-amber-400 transition-all disabled:opacity-50 disabled:hover:bg-amber-500 disabled:cursor-not-allowed group shadow-lg shadow-amber-500/20"
             >
               Checkout securely 
               <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
             </button>

             <p className="text-xs text-neutral-600 text-center mt-6">
               This is a demonstration. No real transactions take place.
             </p>
           </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Order;
