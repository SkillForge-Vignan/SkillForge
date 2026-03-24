import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardGrid from '../components/CardGrid';
import ProjectCard from '../components/ProjectCard';

const projectsData = [
  { id: 1, title: 'SkillForge Portal', description: 'The main website for SkillForge club built with React and Tailwind CSS.', domain: 'Web Dev', githubLink: '#' },
  { id: 2, title: 'AI Resume Analyzer', description: 'An AI-powered tool that parses resumes and gives ATS scores using Gemini API.', domain: 'AI/ML', githubLink: '#' },
  { id: 3, title: 'Campus Connect App', description: 'Mobile app for students to network and share resources locally.', domain: 'App Dev', githubLink: '#' },
  { id: 4, title: 'E-Commerce Dashboard', description: 'A fully functional dashboard for managing products, built with React.', domain: 'Web Dev', githubLink: '#' },
  { id: 5, title: 'Data Visualizer UI', description: 'A highly interactive UI prototype for big data visualization.', domain: 'UI/UX', githubLink: '#' },
  { id: 6, title: 'Network Scanner', description: 'A python-based tool to scan network vulnerabilities and open ports.', domain: 'Cyber Security', githubLink: '#' },
];

const categories = ['All', 'Web Dev', 'AI/ML', 'App Dev', 'UI/UX', 'Cyber Security'];

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.domain === filter);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Our <span className="text-blue-500">Projects</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Discover the amazing products and tools built by our community members.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              filter === cat 
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] border border-blue-500' 
                : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700 border border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.id}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Projects;
