import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Settings, BrainCircuit, Rocket, BookOpen, Calendar, Users, MessageSquare, LogIn, ChevronRight, CheckCircle2, ChevronDown, MonitorPlay, Code2, Sparkles, Mail, Phone, MapPin, Send } from 'lucide-react';
import skillForgeLogo from '../assets/image.png';


const Home = () => {
  const { scrollY } = useScroll();

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Split text animation
  const skillX = useTransform(scrollY, [0, 300], [0, -100]);
  const forgeX = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <div className="min-h-screen text-white bg-[#0B1121] overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-100">

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[30%] h-[30%] bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 pt-20 pb-10 text-center">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Logo Illustration */}
          <div className="relative mb-10 w-48 h-48">
            <img src={skillForgeLogo} alt="SkillForge Logo" className="relative z-10 w-full h-full object-contain mix-blend-screen opacity-90" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center mb-8 mt-2">
            <div className="flex items-center gap-0">
              <motion.h1 style={{ x: skillX }} className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-slate-100 mb-0 drop-shadow-2xl">
                Skill
              </motion.h1>
              <motion.h1 style={{ x: forgeX }} className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 drop-shadow-[0_0_50px_rgba(34,211,238,0.8)] mb-0 z-10 transition-transform">
                Forge
              </motion.h1>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-200 mb-8 tracking-wide">
            Build Skills <span className="text-cyan-500 mx-2">•</span> Build Projects <span className="text-cyan-500 mx-2">•</span> Build Future
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed mx-auto mb-12">
            A technical community focused on transforming students into industry-ready professionals through hands-on projects, expert mentorship, and collaborative teamwork.
          </p>

          {/* User requested removing action buttons from Hero section */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 opacity-50 text-cyan-500"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </section>

      {/* Content wrapper */}
      <div className="relative z-20 bg-[#0B1121]/90 backdrop-blur-xl border-t border-white/5 shadow-[0_-30px_60px_rgba(0,0,0,0.5)] pb-32">

        {/* ABOUT SECTION: Purpose, Vision, Mission */}
        <section id="about" className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/5 scroll-mt-20">
          <div className="mb-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">About SkillForge</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-16" />

            {/* 3 Cards: Purpose, Vision, Mission */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { title: 'Our Purpose', desc: 'To act as a bridge for students by showing them a clear path to opportunities and connecting them with like-minded individuals.', icon: '🎯' },
                { title: 'Our Vision', desc: 'To cultivate a thriving ecosystem of innovators who are empowered to build real products and solve tangible problems.', icon: '👁️' },
                { title: 'Our Mission', desc: 'To transform enthusiastic students into proven, industry-ready professionals through collaboration and mentorship.', icon: '🚀' }
              ].map((card, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300 text-left group box-border">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform origin-left">{card.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* Q&A Card */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-3xl p-8 md:p-12 text-left relative overflow-hidden group hover:border-cyan-400/50 transition-all shadow-2xl box-border">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150" />
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">What is SkillForge?</h3>
              <p className="text-lg text-cyan-50/90 leading-relaxed relative z-10">
                SkillForge is a new tech club created to help students go beyond classroom theory. We know that traditional classes don't always give you the hands-on experience needed for real-world engineering jobs. Started by the Data Science Section, our goal is to build a community where students can actually write code, launch full websites, and create smart systems that people will really use, while getting guidance from like-minded individuals who have been doing it.
              </p>
            </div>
          </div>
        </section>

        {/* 1. PROJECTS: Alternating Showcases */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 flex items-center justify-center gap-4">
              <Code2 className="w-12 h-12 text-cyan-400" /> Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="space-y-24">
            {/* Project Left */}
            <div className="flex flex-col lg:flex-row items-center gap-12 group">
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group-hover:border-cyan-500/50 transition-colors duration-500 shadow-2xl">
                  <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay group-hover:bg-transparent transition-all z-10" />
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Dashboard" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold text-sm border border-cyan-500/20">Data & AI</div>
                <h3 className="text-3xl md:text-5xl font-bold text-white">AI Resume Analyzer</h3>
                <p className="text-lg text-slate-400 leading-relaxed">
                  An intelligent parsing engine that extracts critical information from resumes, scoring them against industry benchmarks to give students actionable feedback.
                </p>
                <Link to="/projects" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-lg group-hover:translate-x-2 transition-transform">
                  View Case Study <ChevronRight />
                </Link>
              </div>
            </div>

            {/* Project Right */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 group">
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group-hover:border-purple-500/50 transition-colors duration-500 shadow-2xl">
                  <div className="absolute inset-0 bg-purple-500/20 mix-blend-overlay group-hover:bg-transparent transition-all z-10" />
                  <img src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop" alt="IoT" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 font-semibold text-sm border border-purple-500/20">Hardware / IoT</div>
                <h3 className="text-3xl md:text-5xl font-bold text-white">Smart Home Hub</h3>
                <p className="text-lg text-slate-400 leading-relaxed">
                  A centralized dashboard connecting multiple microcontrollers. Allows students to control lights, monitor temperature, and run automated routines directly from the web.
                </p>
                <Link to="/projects" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-bold text-lg group-hover:translate-x-2 transition-transform">
                  View Case Study <ChevronRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. DOMAINS: Floating Bounded Grid */}
        <section className="py-24 bg-gradient-to-b from-[#0B1121] to-[#0f172a] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Core Domains</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">Master the technologies that dictate the future. Pick your path and start building.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Web Development', 'Machine Learning', 'App Development'].map((domain, i) => (
                <div key={i} className="group relative bg-slate-900 border border-white/5 rounded-[2rem] p-8 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-8 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-all duration-300">
                      <BookOpen className="w-8 h-8 text-cyan-400 group-hover:text-slate-900 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{domain}</h3>
                    <p className="text-slate-400 mb-8 line-clamp-2 group-hover:line-clamp-none transition-all">
                      Comprehensive guidance from basics to advanced topics. Build real products that actually launch to users.
                    </p>
                    <Link to="/domains" className="text-cyan-400 font-semibold group-hover:underline flex items-center gap-1">
                      Start Learning <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. EVENTS Timeline & TEAM Preview (Side by Side on desktop) */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Events Timeline */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-blue-500/20 rounded-xl"><Calendar className="w-8 h-8 text-blue-400" /></div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Upcoming Events</h2>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                {[
                  { title: "Hackathon 2026", date: "April 15, 2026", desc: "48 hours of non-stop coding" },
                  { title: "Tech Talk Series", date: "May 02, 2026", desc: "Industry alumni sessions" },
                  { title: "UI/UX Workshop", date: "May 20, 2026", desc: "Figma masterclass" }
                ].map((event, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group box-border">
                    {/* The timeline dot */}
                    <div className="absolute left-0 md:left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#0B1121] bg-slate-800 shadow-[0_0_0_2px_rgba(255,255,255,0.1)] group-hover:bg-cyan-500 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all z-10">
                      <div className="h-3 w-3 rounded-full bg-slate-500 group-hover:bg-white transition-colors" />
                    </div>
                    {/* The content card */}
                    <div className="ml-14 md:ml-0 md:w-5/12 p-6 rounded-2xl bg-white/5 border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                      <span className="text-sm font-bold text-cyan-400 mb-1 block">{event.date}</span>
                      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-slate-400 text-sm">{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link to="/events" className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4">See full calendar</Link>
              </div>
            </div>

            {/* Team Stacked Cards */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-purple-500/20 rounded-xl"><Users className="w-8 h-8 text-purple-400" /></div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">The Forces</h2>
              </div>

              <div className="space-y-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent rounded-3xl -z-10" />
                {[
                  { title: "Core Committee", members: "12 Members", detail: "Strategists & Leaders" },
                  { title: "Technical Team", members: "35 Members", detail: "Devs & Engineers" },
                  { title: "Design Team", members: "15 Members", detail: "UI/UX & Graphics" },
                ].map((team, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-purple-500/50 hover:bg-slate-800 flex items-center justify-between group transition-all cursor-pointer" onClick={() => window.location.href = '/team'}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xl text-white group-hover:bg-purple-500 transition-colors">
                        {team.title[0]}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{team.title}</h4>
                        <p className="text-slate-400 text-sm">{team.detail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-500 hidden sm:block">{team.members}</span>
                      <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link to="/team" className="text-purple-400 hover:text-purple-300 font-bold underline underline-offset-4">Meet everyone</Link>
              </div>
            </div>

          </div>
        </section>

        {/* 4. CONTACT SECTION */}
        <section className="py-24 bg-gradient-to-t from-[#0B1121] to-[#0f172a] relative border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Get In Touch</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">Have questions or want to collaborate? Reach out to us directly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { title: 'Email Us', info: 'hello@skillforge.club', icon: <Mail className="w-8 h-8 text-cyan-400" /> },
                { title: 'Call Us', info: '+91 98765 43210', icon: <Phone className="w-8 h-8 text-purple-400" /> },
                { title: 'Visit Us', info: 'Vignan Institute, Vizag', icon: <MapPin className="w-8 h-8 text-blue-400" /> }
              ].map((contact, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {contact.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{contact.title}</h3>
                  <p className="text-cyan-100/70 font-medium">{contact.info}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-900 transition-all duration-300">
                <Send className="w-5 h-5" /> Send a Direct Message
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Action Banner: Login / Feedback */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 p-10 md:p-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -ml-32 -mb-32" />

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to forge your skills?</h2>
              <p className="text-lg text-cyan-100/70 mb-8 leading-relaxed">
                Whether you want to access the student portal to track your progress, or step up as an admin to manage events. Join the hub today. Got ideas? Drop us your feedback.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link to="/login" className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  <LogIn className="w-5 h-5" /> Portal Login
                </Link>
                <Link to="/feedback" className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/10 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Leave Feedback
                </Link>
              </div>
            </div>

            {/* Decorative Icon */}
            <div className="relative z-10 hidden lg:flex items-center justify-center w-48 h-48 bg-cyan-500/10 rounded-full border border-cyan-500/30">
              <Sparkles className="w-24 h-24 text-cyan-400" />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
