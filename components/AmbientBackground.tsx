import React from "react";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";

const FluidShapes = () => {
    return (
        <group>
            {/* Top Left Blob - Subtle Silver/Gray */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
                <mesh position={[-4, 3, -6]}>
                    <sphereGeometry args={[2.5, 64, 64]} />
                    <MeshDistortMaterial 
                        color="#ffffff" 
                        ambient={0.8}
                        distort={0.3} 
                        speed={1.5} 
                        roughness={0.1}
                        transmission={0.95}
                        thickness={2}
                        transparent 
                        opacity={0.6}
                    />
                </mesh>
            </Float>
            
            {/* Bottom Right Blob - Sleek Darker Glass */}
            <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
                <mesh position={[5, -2, -5]}>
                    <sphereGeometry args={[3, 64, 64]} />
                    <MeshDistortMaterial 
                        color="#cbd5e1" 
                        ambient={0.7}
                        distort={0.4} 
                        speed={1.2} 
                        roughness={0.15}
                        transmission={0.9}
                        thickness={2.5}
                        transparent 
                        opacity={0.5}
                    />
                </mesh>
            </Float>
            
            {/* Center Background Blob - Emerald Hint matching cursor */}
            <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
                <mesh position={[-1, -1, -8]}>
                    <sphereGeometry args={[3.5, 64, 64]} />
                    <MeshDistortMaterial 
                        color="#10b981" 
                        ambient={0.5}
                        distort={0.25} 
                        speed={2} 
                        roughness={0.2}
                        transmission={0.8}
                        thickness={1}
                        transparent 
                        opacity={0.15}
                    />
                </mesh>
            </Float>
        </group>
    );
};

const AmbientBackground: React.FC = () => {
    return (
        <div
            className="fixed inset-0 transition-opacity duration-1000"
            style={{ zIndex: -1, pointerEvents: "none", background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)" }}
            aria-hidden="true"
        >
            <Canvas onCreated={({ gl }) => { gl.debug.checkShaderErrors = false }} camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={2} />
                <directionalLight position={[5, 10, 5]} intensity={3} color="#ffffff" />
                <pointLight position={[-10, 0, -10]} color="#ffffff" intensity={2} />
                <Environment preset="studio" />
                <FluidShapes />
            </Canvas>
        </div>
    );
};

export default AmbientBackground;
