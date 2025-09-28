import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';

// Create a separate component for the animated text
const AnimatedText = ({ isMobile, isTablet, isDesktop }) => {
    const ref = useRef();
    const { mouse } = useThree();

    // Responsive text settings
    const getTextProps = () => {
        if (isMobile) {
            return {
                fontSize: 1, // Smaller text
                position: [0, 2, 0], // Higher position
            }
        } else if (isTablet) {
            return {
                fontSize: 2,
                position: [0, 1.5, 0],
            }
        } else {
            return {
                fontSize: 3,
                position: [0, 0, 0],
            }
        }
    }

    const textProps = getTextProps()

    useFrame(() => {
        if (ref.current) {
            const sensitivity = isMobile ? 0.3 : 0.5
            
            ref.current.rotation.y += (mouse.x * sensitivity - ref.current.rotation.y) * 0.1;
            ref.current.rotation.x += (-mouse.y * sensitivity - ref.current.rotation.x) * 0.1;

            const yLimit = isMobile ? 0.3 : 0.5
            const xLimit = isMobile ? 0.2 : 0.3
            
            ref.current.rotation.y = Math.max(-yLimit, Math.min(yLimit, ref.current.rotation.y));
            ref.current.rotation.x = Math.max(-xLimit, Math.min(xLimit, ref.current.rotation.x));
        }
    });

    return (
        <Text 
            ref={ref} 
            fontSize={textProps.fontSize} 
            position={textProps.position}
        >
            Manoj
        </Text>
    );
};

const TextScene = () => (
    <Canvas style={{ height: '100vh', background: '' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <AnimatedText />
    </Canvas>
);

export default AnimatedText;