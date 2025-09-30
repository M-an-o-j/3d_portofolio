import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import InteractiveModel from '../components/scene';
import AnimatedText from '../components/title';
import Clouds from '../components/clouds';
import BackgroundParticles from '../components/backgroundParticles';

// Loading component - moved outside Canvas
const Loader = () => (
  <div className="absolute inset-0 flex items-center justify-center z-30">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <div className="text-white text-lg font-semibold">Loading Experience...</div>
    </div>
  </div>
);

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f172a] -z-20" /> 

      {/* Floating stars */}
      <BackgroundParticles />

      {/* Loading overlay outside Canvas */}
      <Suspense fallback={<Loader />}>
        <div />
      </Suspense>
      
      {/* Your 3D Canvas */}
      <Canvas style={{ height: '100vh', width: '100vw' }}>
        {/* Lights */}
        <ambientLight intensity={0.6} color="#4A5568" />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2} 
          color="#FFFFFF"
          castShadow
        />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#8B5CF6" />
        <spotLight
          position={[0, 10, 0]}
          intensity={0}
          angle={Math.PI / 6}
          penumbra={1}
          color="#3B82F6"
        />
        
        <Suspense fallback={null}>
          <Clouds />
          <InteractiveModel />
          <AnimatedText />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero;
