import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Animated loading orb
const LoadingOrb: React.FC<{ progress: number }> = ({ progress }) => {
    const meshRef = React.useRef<THREE.Mesh>(null);
    const ringRef = React.useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z = -state.clock.elapsedTime;
        }
    });

    // Color interpolation based on progress
    const colors = ['#00f0ff', '#7c7cff', '#ccff00', '#ff6b9d'];
    const colorIndex = Math.floor(progress / 25) % 4;
    const nextColorIndex = (colorIndex + 1) % 4;
    const color = new THREE.Color(colors[colorIndex]).lerp(
        new THREE.Color(colors[nextColorIndex]),
        (progress % 25) / 25
    );

    return (
        <group>
            {/* Main orb */}
            <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={meshRef}>
                    <icosahedronGeometry args={[1.2, 4]} />
                    <MeshDistortMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.6}
                        roughness={0.1}
                        metalness={0.9}
                        distort={0.5}
                        speed={4}
                    />
                </mesh>
            </Float>

            {/* Rotating ring */}
            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2, 0.05, 16, 100]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#00f0ff"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.5}
                />
            </mesh>

            {/* Progress ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2.1, 2.2, 64, 1, 0, (progress / 100) * Math.PI * 2]} />
                <meshBasicMaterial
                    color="#ccff00"
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

// Loading screen component
interface ImmersiveLoaderProps {
    onComplete: () => void;
    minimumDuration?: number;
}

const ImmersiveLoader: React.FC<ImmersiveLoaderProps> = ({
    onComplete,
    minimumDuration = 2500
}) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Simulate loading progress
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / minimumDuration) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsComplete(true);
                    setTimeout(onComplete, 500);
                }, 300);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [minimumDuration, onComplete]);

    if (isComplete) {
        return (
            <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                >
                    <h1 className="text-6xl md:text-8xl font-orbitron font-black text-gradient-cyan-purple">
                        V
                    </h1>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
            {/* 3D Scene */}
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ccff00" />

                <Suspense fallback={null}>
                    <LoadingOrb progress={progress} />
                    <Environment preset="night" />
                </Suspense>
            </Canvas>

            {/* UI Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 pointer-events-none">
                {/* Progress text */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-orbitron font-bold text-white uppercase tracking-widest mb-2">
                        Loading
                    </h2>
                    <p className="text-gray-400 font-exo">
                        Preparing your experience
                    </p>
                </div>

                {/* Progress bar */}
                <div className="w-64 md:w-96">
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-neon-lime"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: 'easeOut' }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500 font-exo">
                        <span>0%</span>
                        <span className="text-neon-lime">{Math.round(progress)}%</span>
                        <span>100%</span>
                    </div>
                </div>
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            opacity: Math.random() * 0.5 + 0.2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

// Motion div for exit animation
import { motion, AnimatePresence } from 'framer-motion';

export default ImmersiveLoader;
