import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

// Preload the model
useGLTF.preload('/assets/3d_asset/little_planet_earth/scene.gltf');

const InteractiveModel = () => {
    const { scene } = useGLTF('/assets/3d_asset/little_planet_earth/scene.gltf');
    const ref = useRef();
    const { mouse } = useThree();
    
    useFrame(() => {
        if (ref.current) {
            // Smooth rotation with lerp
            ref.current.rotation.y += (mouse.x * 0.5 - ref.current.rotation.y) * 0.1;
            ref.current.rotation.x += (-mouse.y * 0.5 - ref.current.rotation.x) * 0.1;
            
            // Clamp rotation limits
            ref.current.rotation.y = Math.max(-0.5, Math.min(0.5, ref.current.rotation.y)); // Y axis limit
            ref.current.rotation.x = Math.max(-0.3, Math.min(0.3, ref.current.rotation.x)); // X axis limit
        }
    });
    
    return <primitive ref={ref} object={scene} scale={0.01} position={[0, -0.5, 0]} />;
};

export default InteractiveModel;