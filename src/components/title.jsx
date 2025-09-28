import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';

// Create a separate component for the animated text
const AnimatedText = () => {
    const title_ref = useRef();
    const role_ref = useRef();
    const { mouse } = useThree();

    useFrame(() => {
        if (title_ref.current) {
            // Smooth rotation with lerp
            title_ref.current.rotation.y += (mouse.x * 0.5 - title_ref.current.rotation.y) * 0.1;
            title_ref.current.rotation.x += (-mouse.y * 0.5 - title_ref.current.rotation.x) * 0.1;

            // Clamp rotation limits
            title_ref.current.rotation.y = Math.max(-0.5, Math.min(0.5, title_ref.current.rotation.y));
            title_ref.current.rotation.x = Math.max(-0.3, Math.min(0.3, title_ref.current.rotation.x));
        }
        if (role_ref.current) {
            // Smooth rotation with lerp
            role_ref.current.rotation.y += (mouse.x * 0.5 - role_ref.current.rotation.y) * 0.1;
            role_ref.current.rotation.x += (-mouse.y * 0.5 - role_ref.current.rotation.x) * 0.1;

            // Clamp rotation limits
            role_ref.current.rotation.y = Math.max(-0.5, Math.min(0.5, role_ref.current.rotation.y));
            role_ref.current.rotation.x = Math.max(-0.3, Math.min(0.3, role_ref.current.rotation.x));
        }
        
    });
    return (
        <>
        <Text ref={title_ref} fontSize={2} position={[0, 0.5, 1]}>
            Manoj
        </Text>
        <Text ref={role_ref} fontSize={1} position={[0, -1, 1]}>
            Software Engineer
        </Text>
        </>
    );
};

export default AnimatedText;