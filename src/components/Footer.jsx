import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, MapPin, Clock, Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-white pt-20 pb-10 px-6 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Section */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 text-3xl font-bold tracking-tighter text-white">
            <Coffee className="w-8 h-8 text-amber-500" />
            <span>Lumina</span>
          </Link>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
            Crafted with passion, poured with precision. We believe every cup tells a story, from the high-altitude farms to your morning ritual.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-amber-500 hover:bg-neutral-800 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-amber-500 hover:bg-neutral-800 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-amber-500 hover:bg-neutral-800 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="space-y-3 text-neutral-400 text-sm">
            <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-amber-500 transition-colors">Our Story</Link></li>
            <li><Link to="/menu" className="hover:text-amber-500 transition-colors">The Menu</Link></li>
            <li><Link to="/order" className="hover:text-amber-500 transition-colors">Order Online</Link></li>
          </ul>
        </div>

        {/* Visit Us */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold">Visit Us</h3>
          <ul className="space-y-4 text-neutral-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
              <span>123 Artisan Avenue<br />The Coffee District<br />New York, NY 10001</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-500 shrink-0" />
              <span>(555) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-500 shrink-0" />
              <span>hello@luminacoffee.com</span>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold">Hours</h3>
          <ul className="space-y-3 text-neutral-400 text-sm">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <span className="block text-white font-medium mb-1">Monday - Friday</span>
                <span>7:00 AM - 7:00 PM</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 shrink-0"></div>
              <div>
                <span className="block text-white font-medium mb-1">Saturday - Sunday</span>
                <span>8:00 AM - 8:00 PM</span>
              </div>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-800 text-center text-neutral-500 text-xs">
        <p>&copy; {new Date().getFullYear()} Lumina Coffee Roasters. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
