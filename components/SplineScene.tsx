import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    Float,
    MeshDistortMaterial,
    Environment,
    useProgress,
    Html,
    OrbitControls,
    Stars
} from '@react-three/drei';
import * as THREE from 'three';

// Loading component
const Loader: React.FC = () => {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-neon-lime border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white font-exo mt-4">{progress.toFixed(0)}%</p>
            </div>
        </Html>
    );
};

// Abstract floating shapes that create an immersive scene
const AbstractShapes: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Main distorted sphere */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh position={[0, 0, 0]}>
                    <icosahedronGeometry args={[1.8, 5]} />
                    <MeshDistortMaterial
                        color="#00f0ff"
                        emissive="#00f0ff"
                        emissiveIntensity={0.4}
                        roughness={0.05}
                        metalness={1}
                        distort={0.5}
                        speed={3}
                    />
                </mesh>
            </Float>

            {/* Rotating rings */}
            <mesh position={[2, 1, -1]} rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[1.2, 0.08, 16, 100]} />
                <meshStandardMaterial
                    color="#ccff00"
                    emissive="#ccff00"
                    emissiveIntensity={0.5}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            <mesh position={[-2, -1, -1]} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
                <torusGeometry args={[0.9, 0.06, 16, 100]} />
                <meshStandardMaterial
                    color="#7c7cff"
                    emissive="#7c7cff"
                    emissiveIntensity={0.5}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Floating geometric shapes */}
            {[
                { pos: [3, 2, -2], geo: 'octahedron', color: '#ff6b9d', scale: 0.4 },
                { pos: [-3, -2, -2], geo: 'dodecahedron', color: '#00f0ff', scale: 0.35 },
                { pos: [2, -3, -3], geo: 'tetrahedron', color: '#ccff00', scale: 0.3 },
                { pos: [-2, 3, -3], geo: 'icosahedron', color: '#7c7cff', scale: 0.25 },
            ].map((item, i) => (
                <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.3} floatIntensity={0.5}>
                    <mesh position={item.pos as [number, number, number]}>
                        {item.geo === 'octahedron' && <octahedronGeometry args={[item.scale]} />}
                        {item.geo === 'dodecahedron' && <dodecahedronGeometry args={[item.scale]} />}
                        {item.geo === 'tetrahedron' && <tetrahedronGeometry args={[item.scale]} />}
                        {item.geo === 'icosahedron' && <icosahedronGeometry args={[item.scale]} />}
                        <meshStandardMaterial
                            color={item.color}
                            emissive={item.color}
                            emissiveIntensity={0.6}
                            metalness={0.9}
                            roughness={0.1}
                            wireframe
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

// Particle field
const ParticleField: React.FC = () => {
    const count = 200;
    const mesh = useRef<THREE.InstancedMesh>(null);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.setScalar(s * 0.15 + 0.05);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current!.instanceMatrix!.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial
                color="#00f0ff"
                emissive="#00f0ff"
                emissiveIntensity={0.8}
                transparent
                opacity={0.6}
            />
        </instancedMesh>
    );
};

// Main Spline-style scene component
const SplineScene: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas onCreated={({ gl }) => { gl.debug.checkShaderErrors = false }}
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                dpr={[1, 2]}
            >
                <Suspense fallback={<Loader />}>
                    {/* Lighting */}
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
                    <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ccff00" />
                    <pointLight position={[0, 10, 5]} intensity={0.6} color="#7c7cff" />
                    <spotLight
                        position={[0, 15, 0]}
                        angle={0.4}
                        penumbra={1}
                        intensity={0.8}
                        color="#ff6b9d"
                    />

                    {/* Environment */}
                    <Environment preset="night" />
                    <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

                    {/* Main scene */}
                    <AbstractShapes />
                    <ParticleField />

                    {/* Post-processing effect via fog */}
                    <fog attach="fog" args={['#050505', 5, 20]} />
                </Suspense>

                {/* Optional controls for interaction */}
                {/* <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} /> */}
            </Canvas>
        </div>
    );
};

export default SplineScene;
