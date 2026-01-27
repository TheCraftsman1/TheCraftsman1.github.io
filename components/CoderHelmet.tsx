import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, Torus, Cylinder, Box } from '@react-three/drei';
import * as THREE from 'three';

const CoderHelmet: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const { viewport, mouse } = useThree();
    const [active, setActive] = useState(false);

    useFrame((state) => {
        if (groupRef.current) {
            // Smoothly rotate to look at the mouse
            const targetRotationX = -mouse.y * 0.5;
            const targetRotationY = mouse.x * 0.5;

            // Auto-rotate if not interacting (or just always add a subtle idle rotation)
            const time = state.clock.getElapsedTime();
            const idleRotationY = Math.sin(time * 0.5) * 0.2;
            const idleRotationX = Math.cos(time * 0.3) * 0.1;

            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX + idleRotationX, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY + idleRotationY, 0.1);

            // Pulse effect when active
            if (active) {
                groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1.1, 0.1));
            } else {
                groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.1));
            }
        }
    });

    return (
        <group
            ref={groupRef}
            onClick={() => setActive(!active)}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
        >
            {/* Main Helmet (Head) - Dark Grey Metallic */}
            <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.2}
                    metalness={0.9}
                />
            </Sphere>

            {/* Wireframe Overlay - Bright Green */}
            <Sphere args={[1.02, 16, 16]} position={[0, 0, 0]}>
                <meshBasicMaterial
                    color={active ? "#CCFF00" : "#00ff00"}
                    wireframe={true}
                    transparent
                    opacity={0.3}
                />
            </Sphere>

            {/* Visor - Cyan Glowing */}
            <Torus args={[0.6, 0.1, 16, 32, Math.PI]} position={[0, 0.2, 0.85]} rotation={[0, 0, -Math.PI / 2]}>
                <meshStandardMaterial
                    color={active ? "#CCFF00" : "#00ffff"}
                    emissive={active ? "#CCFF00" : "#00ffff"}
                    emissiveIntensity={active ? 3 : 2}
                    toneMapped={false}
                />
            </Torus>
            <Torus args={[0.6, 0.1, 16, 32, Math.PI]} position={[0, 0.2, 0.85]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial
                    color={active ? "#CCFF00" : "#00ffff"}
                    emissive={active ? "#CCFF00" : "#00ffff"}
                    emissiveIntensity={active ? 3 : 2}
                    toneMapped={false}
                />
            </Torus>


            {/* Headphones / Ears - Dark Grey */}
            <Cylinder args={[0.3, 0.3, 0.2, 32]} position={[1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
            </Cylinder>
            <Cylinder args={[0.3, 0.3, 0.2, 32]} position={[-1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
            </Cylinder>

            {/* Glowing Eyes / Sensors - Bright Green */}
            <Box args={[0.3, 0.1, 0.1]} position={[0.4, 0.1, 0.95]}>
                <meshStandardMaterial color={active ? "#00ffff" : "#00ff00"} emissive={active ? "#00ffff" : "#00ff00"} emissiveIntensity={2} />
            </Box>
            <Box args={[0.3, 0.1, 0.1]} position={[-0.4, 0.1, 0.95]}>
                <meshStandardMaterial color={active ? "#00ffff" : "#00ff00"} emissive={active ? "#00ffff" : "#00ff00"} emissiveIntensity={2} />
            </Box>

        </group>
    );
};

export default CoderHelmet;
