import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    Float,
    MeshDistortMaterial,
    Environment,
    Stars,
    Sparkles,
    useProgress,
    Html,
    Text,
    Torus,
    Icosahedron
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Loading component
const Loader: React.FC = () => {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white font-exo mt-4">{progress.toFixed(0)}%</p>
            </div>
        </Html>
    );
};

// Main 3D scene for hero
const HeroScene: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const mainOrbRef = useRef<THREE.Mesh>(null);
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (mainOrbRef.current) {
            mainOrbRef.current.rotation.x = t * 0.2;
            mainOrbRef.current.rotation.y = t * 0.3;
        }

        if (ring1Ref.current) {
            ring1Ref.current.rotation.z = t * 0.5;
            ring1Ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
        }

        if (ring2Ref.current) {
            ring2Ref.current.rotation.z = -t * 0.3;
            ring2Ref.current.rotation.y = Math.cos(t * 0.4) * 0.2;
        }

        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Main distorted sphere */}
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
                <mesh ref={mainOrbRef} position={[0, 0, 0]}>
                    <icosahedronGeometry args={[1.5, 5]} />
                    <MeshDistortMaterial
                        color="#00f0ff"
                        emissive="#00f0ff"
                        emissiveIntensity={0.5}
                        roughness={0.05}
                        metalness={1}
                        distort={0.4}
                        speed={3}
                    />
                </mesh>
            </Float>

            {/* First ring */}
            <mesh ref={ring1Ref} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[2.5, 0.05, 16, 100]} />
                <meshStandardMaterial
                    color="#ccff00"
                    emissive="#ccff00"
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Second ring */}
            <mesh ref={ring2Ref} position={[0, 0, 0]} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
                <torusGeometry args={[3, 0.03, 16, 100]} />
                <meshStandardMaterial
                    color="#7c7cff"
                    emissive="#7c7cff"
                    emissiveIntensity={0.6}
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Floating particles around */}
            <Sparkles
                count={100}
                scale={8}
                size={3}
                speed={0.4}
                opacity={0.5}
                color="#00f0ff"
            />

            {/* Small orbiting objects */}
            {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const radius = 2 + Math.random() * 0.5;
                return (
                    <Float key={i} speed={3 + i * 0.2} rotationIntensity={1} floatIntensity={0.5}>
                        <mesh position={[
                            Math.cos(angle) * radius,
                            Math.sin(angle * 2) * 0.5,
                            Math.sin(angle) * radius
                        ]}>
                            <octahedronGeometry args={[0.1]} />
                            <meshStandardMaterial
                                color={['#00f0ff', '#ccff00', '#7c7cff', '#ff6b9d'][i % 4]}
                                emissive={['#00f0ff', '#ccff00', '#7c7cff', '#ff6b9d'][i % 4]}
                                emissiveIntensity={1}
                            />
                        </mesh>
                    </Float>
                );
            })}
        </group>
    );
};

// Post-processing
const Effects: React.FC = () => {
    return (
        <EffectComposer>
            <Bloom
                intensity={1}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                mipmapBlur
            />
            <ChromaticAberration
                offset={new THREE.Vector2(0.001, 0.001)}
            />
            <Vignette
                offset={0.3}
                darkness={0.5}
            />
        </EffectComposer>
    );
};

// Ultimate Hero wrapper
interface UltimateHeroProps {
    children: React.ReactNode;
}

const UltimateHero: React.FC<UltimateHeroProps> = ({ children }) => {
    return (
        <div className="relative w-full min-h-screen">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas onCreated={({ gl }) => { gl.debug.checkShaderErrors = false }}
                    camera={{ position: [0, 0, 6], fov: 45 }}
                    gl={{ antialias: true, alpha: true }}
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
                            angle={0.5}
                            penumbra={1}
                            intensity={0.8}
                            color="#ff6b9d"
                        />

                        {/* Environment & Stars */}
                        <Environment preset="night" />
                        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

                        {/* Main 3D Scene */}
                        <HeroScene />

                        {/* Post-processing */}
                        <Effects />
                    </Suspense>
                </Canvas>
            </div>

            {/* Content overlay */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
        </div>
    );
};

export default UltimateHero;
