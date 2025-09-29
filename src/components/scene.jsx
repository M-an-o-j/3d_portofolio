import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

// Preload the model
useGLTF.preload('/assets/3d_asset/little_planet_earth/scene.gltf');

const InteractiveModel = () => {
  const { scene } = useGLTF('/assets/3d_asset/little_planet_earth/scene.gltf');
  const ref = useRef();
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
        y: -(touch.clientY / size.height) * 2 + 1,
      });
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      setTouchPosition({
        x: (touch.clientX / size.width) * 2 - 1,
        y: -(touch.clientY / size.height) * 2 + 1,
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
    if (ref.current) {
      // Infinite base rotation
      ref.current.rotation.y += 0.002; // 🌍 Constant spin

      // Input interaction
      const inputX = isMobile ? touchPosition.x : mouse.x;
      const inputY = isMobile ? touchPosition.y : mouse.y;

      const sensitivity = isMobile ? 0.6 : 0.5;
      const lerpFactor = isMobile ? 0.08 : 0.1;

      // Smooth rotation offset
      const targetY = inputX * sensitivity;
      const targetX = -inputY * sensitivity;

      ref.current.rotation.y += (targetY - ref.current.rotation.y) * lerpFactor;
      ref.current.rotation.x += (targetX - ref.current.rotation.x) * lerpFactor;

      // Clamp X rotation (so Earth doesn't flip upside down)
      ref.current.rotation.x = Math.max(-0.3, Math.min(0.3, ref.current.rotation.x));
    }
  });

  // Adjust scale and position
  const scale = isMobile ? 0.005 : 0.008;
  const position = isMobile ? [0, -0.4, 0] : [0, -0.5, 0];

  return <primitive ref={ref} object={scene} scale={scale} position={position} />;
};

export default InteractiveModel;
