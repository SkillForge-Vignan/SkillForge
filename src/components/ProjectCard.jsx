import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ title, description, domain, githubLink }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card flex flex-col h-full rounded-2xl overflow-hidden group hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300"
    >
      <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-900 border-b border-white/5 relative overflow-hidden group-hover:from-slate-700 group-hover:to-slate-800 transition-colors">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
        {/* Placeholder image representation */}
        <div className="w-full h-full flex items-center justify-center">
            <span className="text-slate-500 font-bold opacity-30 text-2xl tracking-widest uppercase">{title}</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className="text-xs font-semibold px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md border border-purple-500/30">
            {domain}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-6 flex-grow">{description}</p>
        <div className="flex gap-3">
          {githubLink && (
            <a href={githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors border border-white/5">
              <Github size={16} /> Code
            </a>
          )}
          <a href="#" className="flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200 bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-lg transition-colors border border-blue-500/20">
             <ExternalLink size={16} /> Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
