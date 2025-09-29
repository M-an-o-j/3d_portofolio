import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';

const Clouds = () => {
  const texture = useLoader(THREE.TextureLoader, '/assets/images/cloud.png'); // put cloud.png in public/
  const cloudRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animate drifting clouds
  useFrame(() => {
    cloudRefs.current.forEach((cloud, i) => {
      if (cloud) {
        const speed = isMobile ? 0.001 : 0.002; // slower on mobile
        cloud.position.x += speed * (i % 2 === 0 ? 1 : -1);

        const limit = isMobile ? 12 : 20; // wrap distance
        if (cloud.position.x > limit) cloud.position.x = -limit;
        if (cloud.position.x < -limit) cloud.position.x = limit;
      }
    });
  });

  // Responsive values
  const cloudCount = isMobile ? 6 : 12;
  const cloudSize = isMobile ? [3, 1.8] : [5, 3];
  const spread = isMobile ? 12 : 18;

  return (
    <>
      {Array.from({ length: cloudCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (cloudRefs.current[i] = el)}
          position={[
            (Math.random() - 0.5) * spread,
            Math.random() * (isMobile ? 4 : 5) + 1,
            (Math.random() - 0.5) * spread,
          ]}
          rotation={[0, 0, 0]}
        >
          <planeGeometry args={cloudSize} />
          <meshStandardMaterial
            map={texture}
            transparent
            opacity={0.9}
            emissive="white"
            emissiveIntensity={0.5}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
};

export default Clouds;
