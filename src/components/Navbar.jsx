import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import logoImage from '../assets/image.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Domains', path: '/domains' },
    { name: 'Projects', path: '/projects' },
    { name: 'Events', path: '/events' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
    { name: 'Feedback', path: '/feedback' },
  ];

  const closeMenu = () => setIsOpen(false);

  // Handle cross-page hash routing scrolling
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);

  return (
    <nav className="fixed w-full z-50 glass bg-slate-900/80 !border-x-0 !border-t-0 border-b border-white/10 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center group">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <img src={logoImage} alt="SkillForge Logo" className="relative z-10 w-full h-full object-contain mix-blend-screen opacity-90" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white group-hover:text-cyan-50 transition-colors hidden sm:block">
                Skill<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">Forge</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (location.pathname === '/' && location.hash === link.path.replace('/', ''));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-white bg-white/10 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                        : 'text-gray-300 hover:text-white hover:bg-white/5 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                to="/login"
                className="ml-4 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Link>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass absolute top-16 left-0 w-full bg-slate-900/95 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (location.pathname === '/' && location.hash === link.path.replace('/', ''));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-white bg-blue-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/login"
              onClick={closeMenu}
              className="block mt-4 px-3 py-2 rounded-md text-base font-medium text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
