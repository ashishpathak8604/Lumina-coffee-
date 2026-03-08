import React from 'react';
import { Coffee, ShoppingBag, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function Navbar() {
  const location = useLocation();
  const { cartCount } = useCart();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-amber-500' : 'text-neutral-300 hover:text-amber-500';
  };

  return (
    <nav className="absolute w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-difference">
      
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-white mr-4">
        <Coffee className="w-8 h-8 text-amber-500" />
        <span>Lumina</span>
      </Link>
      
      {/* Center Links (Desktop) */}
      <div className="hidden md:flex items-center justify-center flex-grow gap-8 text-sm font-medium">
        <Link to="/" className={`transition-colors py-2 ${isActive('/')}`}>Home</Link>
        <Link to="/about" className={`transition-colors py-2 ${isActive('/about')}`}>About</Link>
        <Link to="/menu" className={`transition-colors py-2 ${isActive('/menu')}`}>Menu</Link>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 text-sm">
        
        {/* Auth Section */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="font-medium text-white hover:text-amber-500 transition-colors px-2 py-2">
              Log In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 rounded-full border border-neutral-800 hover:border-amber-500 transition-colors"
                }
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Order History"
                  labelIcon={<ShoppingBag className="w-4 h-4" />}
                  href="/profile"
                />
              </UserButton.MenuItems>
            </UserButton>
          </div>
        </SignedIn>

        {/* Order Button - Icon Only */}
        <Link 
          to="/order" 
          title="Your Cart"
          className="w-10 h-10 bg-amber-500 text-neutral-900 rounded-full flex items-center justify-center hover:bg-amber-400 transition-all hover:scale-105 active:scale-95 relative shadow-lg shadow-amber-500/20"
        >
          <ShoppingBag className="w-4 h-4" />
          
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-neutral-900 font-black shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>
        
      </div>
    </nav>
  );
}

export default Navbar;
