import React from 'react';
import { motion } from 'framer-motion';

const TeamCard = ({ name, role, domain, imageUrl }) => {
  return (
    <motion.div 
      className="group perspective"
    >
      <motion.div 
        className="w-full h-80 relative preserve-3d transition-transform duration-700 group-hover:-rotate-y-180"
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden glass-card rounded-2xl overflow-hidden flex flex-col bg-slate-800/80">
          <div className="h-2/3 bg-slate-700 overflow-hidden relative">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
            ) : (
               <div className="w-full h-full bg-gradient-to-t from-slate-900 to-slate-700 flex items-center justify-center">
                 <span className="text-5xl">👤</span>
               </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          </div>
          <div className="h-1/3 p-4 flex flex-col justify-end relative z-10 -mt-8">
            <h3 className="text-xl font-bold text-white text-center drop-shadow-md">{name}</h3>
            <p className="text-blue-400 text-sm text-center font-medium drop-shadow-md">{role}</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-2xl p-6 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/80 to-purple-900/80 border-blue-500/30">
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full mb-4 border border-white/20">{domain}</span>
          <div className="flex gap-4 mt-2">
             <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]">in</a>
             <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]">𝕏</a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamCard;
