import React from 'react';
import { Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 glass bg-slate-900/50 mt-12 py-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold text-white tracking-tighter">
              SKILL<span className="text-gradient">FORGE</span>
            </span>
          </div>
          
          <div className="text-center md:text-left text-sm text-gray-400">
            <p className="mt-1">© {new Date().getFullYear()} SkillForge. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-4">
             {/* Social mock links */}
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
