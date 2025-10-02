import { useState, useEffect, useRef } from "react";

const projects = [
  {
    name: "AI Assistant Platform",
    category: "AI",
    year: "2024",
    description: "Intelligent conversational AI with context awareness and multi-modal capabilities",
    features: ["Natural Language Processing", "Context Management", "Multi-turn Conversations", "Custom Model Training"],
    techStack: ["Python", "FastAPI", "TensorFlow", "React"],
    github: "https://github.com/yourname/ai-assistant",
    demo: "https://ai-assistant-demo.com",
    gradient: "from-purple-500 via-pink-500 to-purple-600",
    glowColor: "purple"
  },
  {
    name: "NFT Marketplace",
    category: "Web3",
    year: "2024",
    description: "Decentralized marketplace for buying, selling, and trading NFTs with low gas fees",
    features: ["Smart Contract Integration", "Wallet Connection", "Auction System", "IPFS Storage"],
    techStack: ["Solidity", "React", "Ethereum", "Web3.js"],
    github: "https://github.com/yourname/nft-marketplace",
    demo: "https://nft-marketplace-demo.com",
    gradient: "from-blue-500 via-cyan-500 to-blue-600",
    glowColor: "cyan"
  },
  {
    name: "Real-time Dashboard",
    category: "Frontend",
    year: "2023",
    description: "Analytics dashboard with live data visualization and customizable widgets",
    features: ["Real-time Updates", "Custom Widgets", "Data Export", "Responsive Design"],
    techStack: ["React", "TypeScript", "D3.js", "WebSocket"],
    github: "https://github.com/yourname/dashboard",
    demo: "https://dashboard-demo.com",
    gradient: "from-cyan-500 via-teal-500 to-cyan-600",
    glowColor: "teal"
  },
  {
    name: "API Gateway Service",
    category: "Backend",
    year: "2023",
    description: "High-performance API gateway with rate limiting, authentication, and monitoring",
    features: ["Rate Limiting", "JWT Authentication", "Request Logging", "Load Balancing"],
    techStack: ["FastAPI", "Redis", "PostgreSQL", "Docker"],
    github: "https://github.com/yourname/api-gateway",
    demo: null,
    gradient: "from-green-500 via-emerald-500 to-green-600",
    glowColor: "green"
  },
  {
    name: "Data Visualization Tool",
    category: "Data",
    year: "2023",
    description: "Interactive data visualization library with multiple chart types and export options",
    features: ["Multiple Chart Types", "Export to PNG/SVG", "Interactive Filters"],
    techStack: ["Python", "Pandas", "Plotly"],
    github: "https://github.com/yourname/data-viz",
    demo: "https://data-viz-demo.com",
    gradient: "from-orange-500 via-amber-500 to-orange-600",
    glowColor: "orange"
  },
  {
    name: "Blockchain Chat App",
    category: "Web3",
    year: "2022",
    description: "Decentralized messaging app with end-to-end encryption",
    features: ["E2E Encryption", "Group Chats", "File Sharing"],
    techStack: ["Node.js", "Socket.io", "React"],
    github: "https://github.com/yourname/chat-app",
    demo: null,
    gradient: "from-indigo-500 via-purple-500 to-indigo-600",
    glowColor: "indigo"
  }
];

const categories = ["All", "AI", "Web3", "Frontend", "Backend", "Data"];

function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.opacity = Math.abs(Math.sin(frame * star.twinkleSpeed));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.8})`;
        ctx.fill();
      });

      frame++;
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

function ProjectPlanet({ project, index, isSelected, onSelect }) {
  const positions = [
    { top: '15%', left: '20%' },
    { top: '25%', right: '15%' },
    { top: '45%', left: '15%' },
    { top: '55%', right: '20%' },
    { top: '70%', left: '25%' },
    { top: '35%', right: '35%' }
  ];

  const position = positions[index] || { top: '50%', left: '50%' };

  return (
    <div
      className="absolute group cursor-pointer"
      style={position}
      onClick={() => onSelect(project)}
    >
      {/* Outer glow rings */}
      <div className="absolute inset-0 -m-12 animate-spin-slow opacity-30">
        <div className={`absolute inset-0 rounded-full border-2 border-dashed border-${project.glowColor}-400`}></div>
      </div>

      {/* Planet glow */}
      <div className={`absolute inset-0 -m-8 rounded-full bg-gradient-to-br ${project.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500 animate-pulse-slow`}></div>
      
      {/* Planet sphere */}
      <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${project.gradient} shadow-2xl transform transition-all duration-500 group-hover:scale-110 border-4 border-white/10 group-hover:border-white/30`}>
        {/* Surface texture */}
        <div className="absolute inset-0 rounded-full opacity-30 mix-blend-overlay" style={{
          backgroundImage: 'radial-gradient(circle at 30% 30%, transparent 30%, rgba(0,0,0,0.3) 100%)'
        }}></div>
        
        {/* Shine effect */}
        <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white/20 blur-md"></div>

        {/* Category badge */}
        <div className="absolute -top-2 -right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-xs font-bold">{project.category}</span>
        </div>
      </div>

      {/* Orbit path */}
      <div className="absolute inset-0 -m-16">
        <div className={`w-full h-full rounded-full border border-${project.glowColor}-500/20 group-hover:border-${project.glowColor}-400/50 transition-colors duration-500`}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-${project.glowColor}-400 rounded-full animate-float-particle`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Project name tooltip */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 pointer-events-none">
        <div className="bg-black/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shadow-xl whitespace-nowrap">
          <p className="text-white font-bold text-sm">{project.name}</p>
          <p className="text-gray-400 text-xs">{project.year}</p>
        </div>
      </div>
    </div>
  );
}

function NebulaBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Multiple nebula clouds */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-slow-reverse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-spin-very-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
    </div>
  );
}

export default function ProjectGalaxy() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated star field */}
      <StarField />
      
      {/* Nebula clouds */}
      <NebulaBackground />

      {/* Content */}
      <div className="relative z-10 min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-16 pt-10 pb-10">
          <h1 className="text-6xl font-knewave md:text-7xl font-bold pb-4 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300  bg-clip-text text-transparent animate-gradient-x">
            Project Galaxy
          </h1>
          <p className="text-gray-400 font-permanent_marker text-lg max-w-2xl mx-auto mb-8">
            Explore the universe of projects I've created. Each planet represents a unique journey.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white shadow-lg shadow-purple-500/50 scale-110'
                    : 'bg-white/5 backdrop-blur-sm text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Galaxy View - Floating Planets */}
        <div className="relative w-full h-[600px] mb-16">
          {/* Center sun/core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse-slow blur-xl opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-2xl shadow-yellow-500/50"></div>
              <div className="absolute top-2 left-2 w-12 h-12 bg-white/30 rounded-full blur-md"></div>
            </div>
          </div>

          {/* Project Planets */}
          {filteredProjects.map((project, index) => (
            <ProjectPlanet
              key={index}
              project={project}
              index={index}
              isSelected={selectedProject?.name === project.name}
              onSelect={setSelectedProject}
            />
          ))}

          {/* Connecting constellation lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            {filteredProjects.map((_, i) => {
              if (i < filteredProjects.length - 1) {
                return (
                  <line
                    key={i}
                    x1="50%"
                    y1="50%"
                    x2={`${20 + i * 15}%`}
                    y2={`${15 + i * 15}%`}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    className="animate-pulse-slow"
                  />
                );
              }
              return null;
            })}
          </svg>
        </div>

        {/* Instructions */}
        <div className="text-center text-gray-500 text-sm">
          <p>🖱️ Click on any planet to explore the project in detail</p>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-3xl border-2 border-purple-400 shadow-2xl shadow-purple-500/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with planet visual */}
            <div className="relative p-8 border-b border-purple-800/50 overflow-hidden">
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${selectedProject.gradient} opacity-10 blur-3xl`}></div>
              <div className="relative flex items-start gap-6">
                {/* Mini planet */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${selectedProject.gradient} shadow-xl flex-shrink-0 relative`}>
                  <div className="absolute top-1 left-1 w-6 h-6 bg-white/20 rounded-full blur-sm"></div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 mb-3">
                    {selectedProject.name}
                  </h2>
                  <div className="flex gap-3 items-center mb-4">
                    <span className={`px-4 py-1.5 bg-gradient-to-r ${selectedProject.gradient} rounded-full text-white text-sm font-medium shadow-lg`}>
                      {selectedProject.category}
                    </span>
                    <span className="text-gray-400 text-sm">{selectedProject.year}</span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white transition-all text-3xl hover:rotate-90 duration-300"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="p-8 border-b border-purple-800/50">
              <h3 className="text-purple-400 text-sm font-semibold mb-4 uppercase tracking-wider flex items-center gap-2">
                <span>🛠️</span> Technology Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {selectedProject.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className={`px-5 py-2.5 bg-gradient-to-r ${selectedProject.gradient} bg-opacity-20 border border-purple-600 rounded-xl text-purple-200 text-sm font-medium hover:border-purple-400 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="p-8 border-b border-purple-800/50">
              <h3 className="text-purple-400 text-sm font-semibold mb-4 uppercase tracking-wider flex items-center gap-2">
                <span>✨</span> Key Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedProject.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 group p-3 rounded-lg hover:bg-purple-900/20 transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mt-1.5 group-hover:scale-150 transition-transform"></span>
                    <span className="text-gray-300 group-hover:text-purple-200 transition-colors text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="p-8">
              <div className="flex gap-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white py-4 px-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 text-center font-medium flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    <span className="text-xl">📦</span> 
                    <span>GitHub Repo</span>
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 bg-gradient-to-r ${selectedProject.gradient} text-white py-4 px-6 rounded-xl border border-purple-400 transition-all duration-300 text-center font-medium shadow-lg shadow-purple-500/40 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-xl`}
                  >
                    <span className="text-xl">🚀</span>
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
        }
        @keyframes float-slow-reverse {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-very-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0px);
            opacity: 0;
          }
          50% { 
            transform: translateY(-20px);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 5s linear infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        .animate-float-slow-reverse {
          animation: float-slow-reverse 12s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-very-slow {
          animation: spin-very-slow 40s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-float-particle {
          animation: float-particle 2s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}