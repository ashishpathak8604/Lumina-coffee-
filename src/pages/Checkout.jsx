import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CreditCard, Lock, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate network request delay (2.5 seconds)
    setTimeout(() => {
      const newOrderNum = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
      setIsProcessing(false);
      setIsSuccess(true);
      setOrderNumber(newOrderNum);
      
      // Save order to Profile history if user is logged in
      if (user) {
        const storageKey = `lumina_orders_${user.id}`;
        const existingOrders = JSON.parse(localStorage.getItem(storageKey) || "[]");
        const newOrder = {
          orderId: newOrderNum,
          date: new Date().toISOString(),
          items: [...cart],
          total: cartTotal
        };
        localStorage.setItem(storageKey, JSON.stringify([newOrder, ...existingOrders]));
      }

      clearCart();
    }, 2500);
  };

  // Prevent accessing checkout with empty cart (unless success screen)
  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center space-y-4 px-6">
        <h2 className="text-3xl font-bold">Your cart is empty</h2>
        <p className="text-neutral-400">Add some items before proceeding to checkout.</p>
        <Link to="/menu" className="bg-amber-500 text-neutral-900 px-8 py-3 rounded-full font-bold hover:bg-amber-400 mt-4">
          Return to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-12">
          {!isSuccess && (
            <button 
              onClick={() => navigate('/order')}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm font-medium mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Cart
            </button>
          )}
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
            Secure <span className="text-amber-500">Checkout.</span>
          </h1>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="checkout-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="grid lg:grid-cols-2 gap-16"
            >
              {/* Form Section */}
              <div className="space-y-10">
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-8">
                  
                  {/* Contact Info */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold border-b border-neutral-800 pb-2">Contact Information</h2>
                    <div>
                      <input 
                        required
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email address" 
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold border-b border-neutral-800 pb-2">Shipping Address</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        required
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name" 
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                      <input 
                        required
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name" 
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <input 
                      required
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address" 
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        required
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City" 
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                      <input 
                        required
                        type="text" 
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="ZIP code" 
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="space-y-4 relative">
                    <h2 className="text-xl font-bold border-b border-neutral-800 pb-2 flex items-center gap-2">
                       Payment <Lock className="w-4 h-4 text-neutral-500" />
                    </h2>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-4 relative overflow-hidden">
                       <div className="flex items-center gap-2 text-amber-500 text-sm font-bold mb-2">
                          <CreditCard className="w-4 h-4" />
                          Credit Card (Dummy Form)
                       </div>
                       <input 
                         required
                         type="text" 
                         name="cardNumber"
                         value={formData.cardNumber}
                         onChange={handleInputChange}
                         placeholder="Card number (e.g., 4242 4242 4242 4242)" 
                         className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                       />
                       <div className="grid grid-cols-2 gap-4">
                         <input 
                           required
                           type="text" 
                           name="expiry"
                           value={formData.expiry}
                           onChange={handleInputChange}
                           placeholder="MM / YY" 
                           className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                         />
                         <input 
                           required
                           type="text" 
                           name="cvc"
                           value={formData.cvc}
                           onChange={handleInputChange}
                           placeholder="CVC" 
                           className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                         />
                       </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-amber-500 text-neutral-900 py-4 rounded-xl font-bold text-lg hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay $${cartTotal}`
                    )}
                  </button>
                  <p className="text-xs text-neutral-500 text-center">
                    This is a simulation. Do not enter real credit card information.
                  </p>
                </form>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:pl-8">
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-[2rem] p-6 lg:p-8 sticky top-32">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map((item, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-neutral-800 relative">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                          <div className="absolute -top-2 -right-2 bg-amber-500 text-neutral-950 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-white text-sm leading-tight">{item.name}</h4>
                          <p className="text-neutral-500 text-xs">{item.category}</p>
                        </div>
                        <div className="font-bold text-white shrink-0 text-sm">
                          ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-6 border-t border-neutral-800">
                    <div className="flex justify-between text-neutral-400 text-sm">
                      <span>Subtotal</span>
                      <span className="text-white font-medium">${cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400 text-sm">
                      <span>Shipping</span>
                      <span className="text-white font-medium">Free</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xl font-black text-white pt-6 border-t border-neutral-800 mt-6">
                    <span>Total</span>
                    <span className="text-amber-500">${cartTotal}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          ) : (
            // Success State
            <motion.div 
              key="success-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto bg-neutral-900/50 border border-neutral-800 rounded-[2rem] p-12 text-center flex flex-col items-center shadow-2xl"
            >
              <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 border border-green-500/20">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-4xl font-black mb-4">Payment Successful!</h2>
              <p className="text-neutral-400 text-lg mb-8 max-w-md">
                Thank you for your order. Your artisan coffee is being perfectly prepared and will be shipped shortly.
              </p>
              
              <div className="w-full bg-neutral-950 rounded-xl p-6 mb-8 border border-neutral-800 flex justify-between items-center">
                <div className="text-left">
                  <p className="text-neutral-500 text-sm mb-1">Order Number</p>
                  <p className="text-xl font-mono font-bold text-white">{orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-neutral-500 text-sm mb-1">Amount Paid</p>
                  <p className="text-xl font-bold text-amber-500">${cartTotal}</p>
                </div>
              </div>

              <Link 
                to="/"
                className="bg-amber-500 text-neutral-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-400 transition-colors w-full"
              >
                Return to Home
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Checkout;
