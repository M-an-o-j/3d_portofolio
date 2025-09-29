import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import InteractiveModel from '../components/scene';
import AnimatedText from '../components/title';
import Clouds from '../components/clouds';

// Loading component - moved outside Canvas
const Loader = () => (
  <div className="absolute inset-0 flex items-center justify-center z-30">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <div className="text-white text-lg font-semibold">Loading Experience...</div>
    </div>
  </div>
);

// Floating particles for ambient effect
const BackgroundParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
    <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
    <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-violet-400 rounded-full opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
    <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-50 animate-pulse" style={{animationDelay: '0.5s'}}></div>
    <div className="absolute bottom-1/3 right-2/3 w-2 h-2 bg-blue-300 rounded-full opacity-45 animate-pulse" style={{animationDelay: '1.5s'}}></div>
  </div>
);

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 b" /> 

      {/* Floating particles */}
      <BackgroundParticles />
      
      {/* Loading overlay outside Canvas */}
      <Suspense fallback={<Loader />}>
        <div />
      </Suspense>
      
      {/* Your Original Canvas with Enhanced Lighting */}
      <Canvas style={{ height: '100vh', width: '100vw' }}>
        {/* Enhanced lighting setup */}
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