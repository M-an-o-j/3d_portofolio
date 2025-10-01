import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line, OrbitControls, Stars } from "@react-three/drei";
import { useState, useRef, useMemo } from "react";
import * as THREE from "three";

const generatePosition = () => [
  (Math.random() - 0.5) * 6,  // X between -10 and 10
  (Math.random() - 0.5) * 6,  // Y between -10 and 10
  (Math.random() - 0.5) * 6   // Z between -10 and 10
];

const skills = [
  { name: "React.js", position: generatePosition(), level: "Expert", color: "#61DAFB" },
  { name: "FastAPI", position: generatePosition(), level: "Advanced", color: "#009688" },
  { name: "Solidity", position: generatePosition(), level: "Intermediate", color: "#363636" },
  { name: "Python", position: generatePosition(), level: "Expert", color: "#3776AB" },
  { name: "Node.js", position: generatePosition(), level: "Advanced", color: "#339933" },
  { name: "TypeScript", position: generatePosition(), level: "Advanced", color: "#3178C6" },
  { name: "Three.js", position: generatePosition(), level: "Intermediate", color: "#000000" },
  { name: "Docker", position: generatePosition(), level: "Advanced", color: "#2496ED" },
  { name: "Git", position: generatePosition(), level: "Advanced", color: "#F1502F" },
  { name: "SaaS", position: generatePosition(), level: "Intermediate", color: "#FF6F00" },
  { name: "LangChain", position: generatePosition(), level: "Advanced", color: "#4CAF50" },
  { name: "LLM", position: generatePosition(), level: "Advanced", color: "#8E24AA" },
  { name: "Machine Learning", position: generatePosition(), level: "Advanced", color: "#FF5722" },
  { name: "Blockchain", position: generatePosition(), level: "Intermediate", color: "#3C3C3D" },  
  { name: "SQL", position: generatePosition(), level: "Intermediate", color: "#336791" },
  { name: "JavaScript", position: generatePosition(), level: "Expert", color: "#F7DF1E" },
  { name: "Django REST Framework", position: generatePosition(), level: "Advanced", color: "#092E20" },
  { name: "Data Analysis", position: generatePosition(), level: "Intermediate", color: "#00BCD4" }
];


function SkillStar({ skill, hoveredSkill, setHoveredSkill }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const ringsRef = useRef([]);

  // Animated twinkle and pulse effects
  useFrame((state) => {
    if (!skill || !skill.position) return;
    
    const t = state.clock.getElapsedTime();
    
    // Main star pulse
    if (meshRef.current) {
      const baseScale = 1 + Math.sin(t * 2 + skill.position[0]) * 0.15;
      meshRef.current.scale.setScalar(baseScale);
    }
    
    // Glow effect
    if (glowRef.current) {
      const glowScale = 1.8 + Math.sin(t * 1.5) * 0.2;
      glowRef.current.scale.setScalar(glowScale);
      if (glowRef.current.material) {
        glowRef.current.material.opacity = 0.25 + Math.sin(t * 2) * 0.1;
      }
    }

    // Rotating rings animation
    if (ringsRef.current && ringsRef.current.length > 0) {
      ringsRef.current.forEach((ring, i) => {
        if (ring) {
          ring.rotation.x += 0.01 * (i + 1);
          ring.rotation.y += 0.015 * (i + 1);
        }
      });
    }
  });

  const isHovered = hoveredSkill === skill?.name;

  return (
    <group position={skill?.position || [0, 0, 0]}>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial 
          color={isHovered ? "#00ffff" : (skill?.color || "#ffffff")} 
          transparent 
          opacity={0.15}
        />
      </mesh>

      {/* Orbital rings */}
      {isHovered && [0.5, 0.65, 0.8].map((radius, i) => (
        <mesh 
          key={i} 
          ref={el => ringsRef.current[i] = el}
        >
          <torusGeometry args={[radius, 0.01, 10, 20]} />
          <meshBasicMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.4 - i * 0.1}
          />
        </mesh>
      ))}
      
      {/* Main star core */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHoveredSkill(skill?.name)}
        onPointerOut={() => setHoveredSkill(skill?.name)}
      >
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial 
          color={isHovered ? "#ffffff" : (skill?.color || "#ffffff")}
          emissive={isHovered ? "#00ffff" : (skill?.color || "#ffffff")}
          emissiveIntensity={isHovered ? 1.2 : 0.5}
          metalness={0.10}
          roughness={0.2}
        />
      </mesh>

      {/* Sparkle points */}
      {isHovered && (
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={20}
              array={new Float32Array(Array.from({ length: 60 }, () => (Math.random() - 0.5) * 2))}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial 
            size={0.08} 
            color="#00ffff" 
            transparent 
            opacity={0.8}
            sizeAttenuation
          />
        </points>
      )}

      {/* Skill info on hover */}
      {isHovered && skill?.name && (
        <Html center distanceFactor={8}>
          <div className="pointer-events-none">
            <div className="bg-gradient-to-br from-cyan-500/95 to-blue-600/95 backdrop-blur-sm px-6 py-3 rounded-2xl border-2 border-cyan-300 shadow-xl shadow-cyan-500/60 animate-float min-w-[180px]">
              <p className="text-white font-bold text-xl whitespace-nowrap tracking-wide text-center mb-1">
                {skill.name}
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full ${
                        skill.level === "Expert" ? "bg-yellow-300" :
                        skill.level === "Advanced" && i < 2 ? "bg-cyan-300" :
                        skill.level === "Intermediate" && i < 1 ? "bg-blue-300" :
                        "bg-gray-400/50"
                      }`}
                    ></div>
                  ))}
                </div>
                <span className="text-cyan-100 text-xs font-medium">{skill.level}</span>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function ConstellationLines({ skills, hoveredSkill }) {
  const linesRef = useRef();

  // Animate line opacity
  useFrame((state) => {
    if (linesRef.current && linesRef.current.children) {
      const t = state.clock.getElapsedTime();
      linesRef.current.children.forEach((line, i) => {
        if (line.material) {
          line.material.opacity = 0.2 + Math.sin(t + i * 0.5) * 0.1;
        }
      });
    }
  });

  // Draw lines between nearby skills
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        const dist = Math.sqrt(
          Math.pow(skills[i].position[0] - skills[j].position[0], 2) +
          Math.pow(skills[i].position[1] - skills[j].position[1], 2) +
          Math.pow(skills[i].position[2] - skills[j].position[2], 2)
        );
        if (dist < 4.5) {
          lines.push({ from: skills[i], to: skills[j] });
        }
      }
    }
    return lines;
  }, [skills]);

  return (
    <group ref={linesRef}>
      {connections.map((conn, i) => {
        const isHighlighted = hoveredSkill === conn.from.name || hoveredSkill === conn.to.name;
        return (
          <Line
            key={i}
            points={[conn.from.position, conn.to.position]}
            color={isHighlighted ? "#00ffff" : "#4a5568"}
            lineWidth={isHighlighted ? 3 : 1.5}
            transparent
            opacity={isHighlighted ? 0.9 : 0.3}
          />
        );
      })}
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef();
  const particleCount = 300;

  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5;
      
      // Random colors between cyan and blue
      const colorChoice = Math.random();
      if (colorChoice > 0.7) {
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 1.0;
      } else {
        colors[i * 3] = 0.3;
        colors[i * 3 + 1] = 0.3;
        colors[i * 3 + 2] = 0.5;
      }
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const t = state.clock.getElapsedTime();
      particlesRef.current.rotation.y = t * 0.03;
      particlesRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
  });

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial 
        size={0.04} 
        vertexColors
        transparent 
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function SkillConstellation() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div className="w-full h-screen  relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-950/20 via-transparent to-transparent animate-pulse-slow pointer-events-none"></div>
      
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ touchAction: 'none' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <spotLight 
          position={[0, 5, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.5}
          color="#00ffff"
        />
        
        {/* Deep space stars */}
        <Stars 
          radius={100} 
          depth={50} 
          count={600} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1}
        />
        
        {/* Floating particles */}
        <FloatingParticles />
        
        {/* Constellation lines */}
        <ConstellationLines skills={skills} hoveredSkill={hoveredSkill} />

        {/* Skill stars */}
        {skills.map((s, i) => (
          <SkillStar
            key={i}
            skill={s}
            hoveredSkill={hoveredSkill}
            setHoveredSkill={setHoveredSkill}
          />
        ))}

        {/* Camera controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={true}
          autoRotate={hoveredSkill === null}
          autoRotateSpeed={0.3}
          dampingFactor={0.05}
          enableDamping
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-8 left-8 text-white z-10 pointer-events-none">
        <div className="backdrop-blur-md bg-black/30 p-6 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
          <h1 className="text-5xl font-knewave font-bold mb-3 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent animate-gradient">
            Skill Constellation
          </h1>
          <p className="text-gray-400 font-permanent_marker text-sm flex items-center gap-2">
            <span className="w-2 h-2  bg-cyan-400 rounded-full animate-pulse"></span>
            Hover to explore • Drag to rotate
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 right-8 backdrop-blur-md bg-black/30 p-4 rounded-xl border border-cyan-500/30 z-10 pointer-events-none">
        <p className="text-cyan-400 text-xs font-semibold mb-3">PROFICIENCY</p>
        <div className="space-y-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-300"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-300"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-300"></div>
            </div>
            <span>Expert</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-cyan-300"></div>
              <div className="w-2 h-2 rounded-full bg-cyan-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400/50"></div>
            </div>
            <span>Advanced</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400/50"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400/50"></div>
            </div>
            <span>Intermediate</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}