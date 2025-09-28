import React from 'react'
import TextScene from './components/title'
import { Canvas } from '@react-three/fiber';
import InteractiveModel from './components/scene';
import AnimatedText from './components/title';

const Scene = () => (
    <Canvas style={{ height: '100vh', background: '#111' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        
        {/* Your 3D model */}
        <InteractiveModel />
        
        {/* Your animated text in the same scene */}
        <AnimatedText />
    </Canvas>
);

const App = () => {
  return (
    <div className='w-screen h-screen'>
      <Scene />
    </div>
  )
}

export default App