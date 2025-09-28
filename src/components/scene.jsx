import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { log } from 'three/src/nodes/TSL.js';
import { div } from 'three/tsl';

useGLTF.preload('/assets/3d_asset/a_windy_day/scene.gltf');

const InteractiveModel = ({ isMobile, isTablet, isDesktop }) => {
    const { scene } = useGLTF('/assets/3d_asset/a_windy_day/scene.gltf');
    const ref = useRef();
    const { mouse } = useThree();

    // Responsive scale and position
    const getModelProps = () => {
        if (isMobile) {
            return {
                scale: 3, // Smaller on mobile
                position: [0, -1, 0], // Lower position
                rotationSensitivity: 0.3 // Less sensitive rotation
            }
        } else if (isTablet) {
            return {
                scale: 4,
                position: [0, -0.75, 0],
                rotationSensitivity: 0.4
            }
        } else {
            return {
                scale: 5,
                position: [0, -0.5, 0],
                rotationSensitivity: 0.5
            }
        }
    }

    const modelProps = getModelProps()

    useFrame(() => {
        if (ref.current) {
            const sensitivity = modelProps.rotationSensitivity
            
            ref.current.rotation.y += (mouse.x * sensitivity - ref.current.rotation.y) * 0.1;
            ref.current.rotation.x += (-mouse.y * sensitivity - ref.current.rotation.x) * 0.1;

            // Responsive rotation limits
            const yLimit = isMobile ? 0.3 : 0.5
            const xLimit = isMobile ? 0.2 : 0.3
            
            ref.current.rotation.y = Math.max(-yLimit, Math.min(yLimit, ref.current.rotation.y));
            ref.current.rotation.x = Math.max(-xLimit, Math.min(xLimit, ref.current.rotation.x));
        }
    });

    return (
        <primitive 
            ref={ref} 
            object={scene} 
            scale={modelProps.scale} 
            position={modelProps.position} 
        />
    );
};

const Scene = () => (
    <Canvas style={{ height: '100vh', background: '#111' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <InteractiveModel />
        {/* <OrbitControls enableZoom={false} /> */}
    </Canvas>
);

export default InteractiveModel;
