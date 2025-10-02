import React, { useState, useEffect } from "react";
import { Mail, Linkedin, Github, Send, Sparkles } from "lucide-react";

export default function AlienSignal() {
  const [activated, setActivated] = useState(false);
  const [stars, setStars] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const socials = [
    { name: "Email", url: "mailto:you@example.com", icon: Mail, color: "from-purple-500 to-pink-500" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourprofile", icon: Linkedin, color: "from-blue-500 to-cyan-500" },
    { name: "GitHub", url: "https://github.com/yourprofile", icon: Github, color: "from-gray-600 to-gray-800" },
  ];

  const handleSpaceshipClick = () => {
    setActivated(!activated);
  };

  useEffect(() => {
    const newStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 3
    }));
    setStars(newStars);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Animated Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}

      {/* Nebula Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent opacity-50"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-12 px-4">
        
        {/* Floating Particles around spaceship */}
        <div className="relative">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float-particle"
              style={{
                left: `${Math.cos((i * Math.PI * 2) / 8) * 80}px`,
                top: `${Math.sin((i * Math.PI * 2) / 8) * 80}px`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}

          {/* Alien Spaceship with parallax */}
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300"
            onClick={handleSpaceshipClick}
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px) ${activated ? 'scale(1.1)' : 'scale(1)'}`
            }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className={`absolute inset-0 ${activated ? 'bg-cyan-400/50' : 'bg-cyan-400/30'} rounded-full blur-2xl animate-pulse`}></div>
              
              {/* Spaceship SVG replacement with CSS */}
              <div className="relative w-48 h-32 animate-float">
                {/* Main body */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-16 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-2xl">
                  {/* Dome */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-12 bg-gradient-to-b from-cyan-300/60 to-cyan-500/40 rounded-full backdrop-blur-sm"></div>
                  {/* Lights */}
                  <div className="absolute bottom-2 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-blink"></div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-blink" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-2 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-blink" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-gray-400 animate-bounce-subtle">
              <Sparkles className="w-4 h-4" />
              <p className="text-sm">{activated ? 'Signal Active - Click to deactivate' : 'Click to initiate contact sequence'}</p>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Enhanced Beam */}
        {activated && (
          <div className="relative flex flex-col items-center animate-fade-in">
            {/* Multi-layered beam */}
            <div className="relative w-20">
              <div className="absolute left-1/2 -translate-x-1/2 w-1 h-40 bg-gradient-to-b from-cyan-400 to-transparent rounded-full animate-pulse-beam"></div>
              <div className="absolute left-1/2 -translate-x-1/2 w-8 h-40 bg-gradient-to-b from-cyan-400/30 to-transparent rounded-full blur-md animate-pulse-beam" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute left-1/2 -translate-x-1/2 w-16 h-40 bg-gradient-to-b from-cyan-400/10 to-transparent rounded-full blur-lg animate-pulse-beam" style={{ animationDelay: '0.6s' }}></div>
            </div>
            
            {/* Signal Text */}
            <div className="text-cyan-400 text-xs font-mono mt-4 animate-pulse">
              [SIGNAL_DETECTED]
            </div>

            {/* Social Icons with stagger animation */}
            <div className="flex gap-6 mt-8">
              {socials.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-14 h-14 rounded-full text-white hover:scale-125 transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                    title={social.name}
                  >
                    {/* Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-tr ${social.color} rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity`}></div>
                    {/* Icon container */}
                    <div className={`relative flex items-center justify-center w-full h-full bg-gradient-to-tr ${social.color} rounded-full shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {/* Orbit ring */}
                    <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-spin-slow"></div>
                    {/* Label on hover */}
                    <span className="absolute -bottom-8 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.name}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Send Message Button */}
            <button className="mt-12 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Send className="w-4 h-4" />
              Send Transmission
            </button>
          </div>
        )}

        {/* Section Text */}
        <div className="text-center text-white max-w-2xl px-4 animate-fade-in">
          <h2 className="text-5xl font-bold font-knewave bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent animate-gradient mb-4">
            🛸 Initiate Contact Protocol
          </h2>
          <p className="mt-4 text-lg font-permanent_marker text-gray-300 leading-relaxed">
            My alien vessel is monitoring all frequencies across the digital cosmos. 
            Activate the contact beam to reveal communication channels and establish 
            an interdimensional connection 🌌
          </p>
          <div className="mt-6 text-sm text-cyan-400 font-mono">
            &gt; STATUS: READY_FOR_CONTACT
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        @keyframes pulse-beam {
          0%, 100% { opacity: 0.6; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.05); }
        }
        .animate-pulse-beam {
          animation: pulse-beam 2s ease-in-out infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px); opacity: 0.5; }
          50% { transform: translateY(-20px); opacity: 1; }
        }
        .animate-float-particle {
          animation: float-particle 3s ease-in-out infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .animate-blink {
          animation: blink 1.5s ease-in-out infinite;
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </section>
  );
}