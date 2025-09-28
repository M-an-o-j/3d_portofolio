import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';

// Create a separate component for the animated text
const AnimatedText = () => {
    const ref = useRef();
    const { mouse } = useThree();

    useFrame(() => {
        if (ref.current) {
            // Smooth rotation with lerp
            ref.current.rotation.y += (mouse.x * 0.5 - ref.current.rotation.y) * 0.1;
            ref.current.rotation.x += (-mouse.y * 0.5 - ref.current.rotation.x) * 0.1;

            // Clamp rotation limits
            ref.current.rotation.y = Math.max(-0.5, Math.min(0.5, ref.current.rotation.y));
            ref.current.rotation.x = Math.max(-0.3, Math.min(0.3, ref.current.rotation.x));
        }
    });

    return (
        <Text ref={ref} fontSize={2} position={[0, 0, 1]}>
            Manoj
        </Text>
    );
};

export default AnimatedText;