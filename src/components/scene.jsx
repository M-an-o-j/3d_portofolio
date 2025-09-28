import React from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Box = () => (
    <mesh rotation={[0.5, 1, 0]}>
        <boxGeometry args={[1,0.5,1]}/>
        <meshStandardMaterial color="royalblue" />
    </mesh>
)
const Scene = () => (
    <Canvas style={{height: "100vh", background: "#111"}}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3,10,1]} />
        <Box />
        <OrbitControls />
    </Canvas>
)

export default Scene