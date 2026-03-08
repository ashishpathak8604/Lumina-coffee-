import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useUser, RedirectToSignIn } from '@clerk/clerk-react';
import { Package, Calendar, Clock, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

function Profile() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Only attempt to fetch orders if the user is fully loaded and signed in
    if (isLoaded && isSignedIn && user) {
      const storageKey = `lumina_orders_${user.id}`;
      const savedOrders = localStorage.getItem(storageKey);
      if (savedOrders) {
        setOrderHistory(JSON.parse(savedOrders));
      }
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-amber-500">
        <Coffee className="w-8 h-8 animate-bounce" />
      </div>
    );
  }

  // Protect the route
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 mb-12 flex flex-col sm:flex-row items-center sm:items-start gap-8 relative overflow-hidden"
        >
          {/* Decorative Background Blur */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-500 shrink-0 shadow-lg shadow-amber-500/20 relative z-10">
            <img src={user.imageUrl} alt={user.fullName} className="w-full h-full object-cover" />
          </div>
          <div className="flex-grow text-center sm:text-left relative z-10">
            <h1 className="text-3xl font-black mb-1">{user.fullName || "Coffee Lover"}</h1>
            <p className="text-neutral-400">{user.primaryEmailAddress?.emailAddress}</p>
          </div>

          <div className="hidden sm:flex flex-col items-end justify-center h-full space-y-2">
            <div className="text-sm text-neutral-500 uppercase tracking-widest font-semibold">Member Since</div>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </motion.div>

        {/* Order History Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-neutral-800">
            <Package className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-bold">Order History</h2>
          </div>

          {orderHistory.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-neutral-800 rounded-3xl bg-neutral-900/20">
              <Coffee className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
              <p className="text-neutral-500 mb-6 max-w-sm mx-auto">
                Looks like you haven't placed any orders with us yet. Explore our artisan menu to get started.
              </p>
              <Link to="/menu" className="bg-amber-500 text-neutral-950 px-8 py-3 rounded-full font-bold hover:bg-amber-400 transition-colors inline-block">
                Explore Menu
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orderHistory.map((order) => (
                <div key={order.orderId} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-4 border-b border-neutral-800/50">
                    <div>
                      <div className="text-sm text-amber-500 font-mono mb-1">{order.orderId}</div>
                      <div className="flex items-center gap-2 text-neutral-400 text-sm">
                        <Clock className="w-4 h-4" />
                        {new Date(order.date).toLocaleDateString('en-US', { 
                          year: 'numeric', month: 'long', day: 'numeric', 
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-sm text-neutral-500 mb-1">Total Amount</div>
                      <div className="text-xl font-bold text-white">${order.total}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-neutral-500 font-medium w-4">{item.quantity}x</span>
                          <span className="text-neutral-300">{item.name}</span>
                        </div>
                        <span className="text-neutral-400">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}

export default Profile;
