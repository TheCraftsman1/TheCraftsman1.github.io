import React, { useRef, useMemo, useEffect, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Optimized particle field using instanced mesh
const ParticleFieldScene: React.FC = memo(() => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const count = 50; // Reduced from 150

    const { positions, scales } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
            scales[i] = Math.random() * 0.08 + 0.02;
        }
        return { positions, scales };
    }, []);

    const color = useMemo(() => new THREE.Color('#00f0ff'), []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;
        const dummy = new THREE.Object3D();

        for (let i = 0; i < count; i++) {
            const x = positions[i * 3] + Math.sin(time * 0.3 + i) * 0.3;
            const y = positions[i * 3 + 1] + Math.cos(time * 0.2 + i) * 0.3;
            const z = positions[i * 3 + 2];

            dummy.position.set(x, y, z);
            dummy.scale.setScalar(scales[i]);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <circleGeometry args={[0.05, 8]} />
            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.6}
            />
        </instancedMesh>
    );
});

// Canvas wrapper
const ParticleField: React.FC = memo(() => {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ background: 'transparent' }}
                gl={{ antialias: false, alpha: true }}
                dpr={1}
                frameloop="demand"
            >
                <ParticleFieldScene />
            </Canvas>
        </div>
    );
});

export default ParticleField;
