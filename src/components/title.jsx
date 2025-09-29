import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';

// Create a separate component for the animated text
const AnimatedText = () => {
    const title_ref = useRef();
    const role_ref = useRef();
    const { mouse, size } = useThree();
    const [isMobile, setIsMobile] = useState(false);
    const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle touch events
    useEffect(() => {
        const handleTouchStart = (e) => {
            setIsDragging(true);
            const touch = e.touches[0];
            setTouchPosition({
                x: (touch.clientX / size.width) * 2 - 1,
                y: -(touch.clientY / size.height) * 2 + 1
            });
        };

        const handleTouchMove = (e) => {
            if (!isDragging) return;
            const touch = e.touches[0];
            setTouchPosition({
                x: (touch.clientX / size.width) * 2 - 1,
                y: -(touch.clientY / size.height) * 2 + 1
            });
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
        };

        if (isMobile) {
            window.addEventListener('touchstart', handleTouchStart);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleTouchEnd);

            return () => {
                window.removeEventListener('touchstart', handleTouchStart);
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [isMobile, isDragging, size]);

    useFrame(() => {
        // Use touch position for mobile, mouse position for desktop
        const inputX = isMobile ? touchPosition.x : mouse.x;
        const inputY = isMobile ? touchPosition.y : mouse.y;
        
        // Adjust sensitivity based on device
        const sensitivity = isMobile ? 0.6 : 0.5;
        const lerpFactor = isMobile ? 0.08 : 0.1;

        if (title_ref.current) {
            // Smooth rotation with lerp
            title_ref.current.rotation.y += (inputX * sensitivity - title_ref.current.rotation.y) * lerpFactor;
            title_ref.current.rotation.x += (-inputY * sensitivity - title_ref.current.rotation.x) * lerpFactor;

            // Clamp rotation limits
            title_ref.current.rotation.y = Math.max(-0.5, Math.min(0.5, title_ref.current.rotation.y));
            title_ref.current.rotation.x = Math.max(-0.3, Math.min(0.3, title_ref.current.rotation.x));
        }
        if (role_ref.current) {
            // Smooth rotation with lerp
            role_ref.current.rotation.y += (inputX * sensitivity - role_ref.current.rotation.y) * lerpFactor;
            role_ref.current.rotation.x += (-inputY * sensitivity - role_ref.current.rotation.x) * lerpFactor;

            // Clamp rotation limits
            role_ref.current.rotation.y = Math.max(-0.5, Math.min(0.5, role_ref.current.rotation.y));
            role_ref.current.rotation.x = Math.max(-0.3, Math.min(0.3, role_ref.current.rotation.x));
        }
    });

    // Adjust text sizes and positions based on screen size
    const titleSize = isMobile ? 0.9 : 2;
    const roleSize = isMobile ? 0.4 : 1;
    const titlePosition = isMobile ? [0, 0.1, 1] : [0, 0.5, 1];
    const rolePosition = isMobile ? [0, -0.6, 1] : [0, -1, 1];

    return (
        <>
            <Text ref={title_ref} fontSize={titleSize} position={titlePosition}>
                Manoj
            </Text>
            <Text ref={role_ref} fontSize={roleSize} position={rolePosition}>
                Software Engineer
            </Text>
        </>
    );
};

export default AnimatedText;