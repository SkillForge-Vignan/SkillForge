import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const upcomingEvents = [
  { id: 1, title: 'AI & Future of Tech Workshop', date: 'October 15, 2026', time: '10:00 AM - 1:00 PM', location: 'Main Auditorium', desc: 'A deep dive into how AI is reshaping industries, with hands-on prompt engineering.' },
  { id: 2, title: 'Hackathon 2026: Build for India', date: 'October 28-29, 2026', time: '48 Hours', location: 'CS Lab 1 & 2', desc: 'A two-day offline hackathon focusing on solving localized problems using technology.' },
];

const pastEvents = [
  { id: 3, title: 'Intro to Web3 & Blockchain', date: 'September 5, 2026', desc: 'A beginner-friendly session covering smart contracts and decentralized apps.' },
  { id: 4, title: 'UI/UX Design Sprint', date: 'August 20, 2026', desc: 'An interactive design challenge where participants learned Figma and Wireframing.' },
];

const EventCard = ({ event, isPast }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`glass-card p-6 rounded-2xl ${isPast ? 'opacity-80' : 'border border-blue-500/30'}`}
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-bold text-white max-w-[70%]">{event.title}</h3>
      <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-blue-300 flex items-center gap-1">
        <Calendar size={12} /> {event.date}
      </div>
    </div>
    <div className="text-gray-400 text-sm mb-6 flex-grow min-h-[60px]">
      {event.desc}
    </div>
    {!isPast && (
      <div className="mb-6 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Clock size={14} className="text-purple-400" /> {event.time}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <MapPin size={14} className="text-red-400" /> {event.location}
        </div>
      </div>
    )}
    <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
      isPast 
        ? 'bg-slate-800 text-gray-500 cursor-not-allowed' 
        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]'
    }`}>
      {isPast ? 'Completed' : 'Register Now'}
    </button>
  </motion.div>
);

const Events = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Upcoming <span className="text-purple-500">Events</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Join our workshops, hackathons, and seminars. Elevate your skills by participating in our active community events.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-blue-500 rounded-full"></span> Upcoming
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {upcomingEvents.map(event => (
            <EventCard key={event.id} event={event} isPast={false} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-400 mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-gray-600 rounded-full"></span> Past Events
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {pastEvents.map(event => (
            <EventCard key={event.id} event={event} isPast={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
