import React from 'react';
import CardGrid from '../components/CardGrid';
import TeamCard from '../components/TeamCard';

const coreTeam = [
  { id: 1, name: 'Alex Johnson', role: 'President', domain: 'Management', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
  { id: 2, name: 'Sarah Williams', role: 'Vice President', domain: 'Operations', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop' },
  { id: 3, name: 'David Lee', role: 'Tech Lead', domain: 'Web Dev', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
];

const mentors = [
  { id: 4, name: 'Dr. Emily Chen', role: 'Faculty Advisor', domain: 'AI/ML', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop' },
  { id: 5, name: 'Michael Brown', role: 'Alumni Mentor', domain: 'Cyber Security', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop' },
];

const Team = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Meet The <span className="text-gradient">Team</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          The passionate individuals who drive SkillForge forward. We are dedicated to building a culture of learning and innovation.
        </p>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Core Team</h2>
        <CardGrid columns={3}>
          {coreTeam.map(member => (
            <TeamCard key={member.id} {...member} />
          ))}
        </CardGrid>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center text-white mb-10">Mentors & Advisors</h2>
        <CardGrid columns={3}>
          <div className="hidden md:block"></div> {/* Spacer for centering the two mentors visually in 3 col layout if desired, but 3 cols will flex nicely. Let's just use grid */}
          {mentors.map(member => (
            <TeamCard key={member.id} {...member} />
          ))}
        </CardGrid>
      </div>
    </div>
  );
};

export default Team;
