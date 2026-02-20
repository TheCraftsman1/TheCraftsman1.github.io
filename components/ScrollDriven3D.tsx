import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, useScroll, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Scroll-driven 3D scene component
const ScrollScene: React.FC = () => {
    const scroll = useScroll();
    const groupRef = useRef<THREE.Group>(null);
    const heroMeshRef = useRef<THREE.Mesh>(null);
    const aboutMeshRef = useRef<THREE.Mesh>(null);
    const projectsMeshRef = useRef<THREE.Mesh>(null);
    const skillsMeshRef = useRef<THREE.Mesh>(null);
    const contactMeshRef = useRef<THREE.Mesh>(null);

    // Performance: Instanced mesh ref
    const particlesRef = useRef<THREE.InstancedMesh>(null);

    const { viewport } = useThree();

    // Initialize InstancedMesh positions and colors to consolidate 50 draw calls into 1
    useEffect(() => {
        if (particlesRef.current) {
            const dummy = new THREE.Object3D();
            const colors = [
                new THREE.Color('#00f0ff'),
                new THREE.Color('#ccff00'),
                new THREE.Color('#7c7cff'),
                new THREE.Color('#ff6b9d')
            ];

            for (let i = 0; i < 50; i++) {
                dummy.position.set(
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20,
                    -Math.random() * 30
                );
                const scale = 0.03 + Math.random() * 0.03;
                dummy.scale.set(scale, scale, scale);
                dummy.updateMatrix();

                particlesRef.current.setMatrixAt(i, dummy.matrix);
                particlesRef.current.setColorAt(i, colors[i % 4]);
            }
            particlesRef.current.instanceMatrix.needsUpdate = true;
            if (particlesRef.current.instanceColor) {
                particlesRef.current.instanceColor.needsUpdate = true;
            }
        }
    }, []);

    useFrame((state, delta) => {
        const scrollOffset = scroll.offset;

        // Hero Section (0 - 0.25)
        if (heroMeshRef.current) {
            const heroProgress = Math.min(scrollOffset / 0.25, 1);
            heroMeshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + heroProgress * Math.PI * 0.5;
            heroMeshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
            heroMeshRef.current.position.z = THREE.MathUtils.lerp(0, -15, heroProgress);
            heroMeshRef.current.scale.setScalar(THREE.MathUtils.lerp(1, 0.3, heroProgress));
        }

        // About Section (0.25 - 0.5)
        if (aboutMeshRef.current) {
            const aboutProgress = Math.max(0, Math.min((scrollOffset - 0.25) / 0.25, 1));
            aboutMeshRef.current.rotation.x = aboutProgress * Math.PI * 0.5;
            aboutMeshRef.current.rotation.z = aboutProgress * Math.PI;
            aboutMeshRef.current.position.y = THREE.MathUtils.lerp(2, -5, aboutProgress);
            aboutMeshRef.current.position.x = THREE.MathUtils.lerp(-3, 3, aboutProgress);
        }

        // Projects Section (0.5 - 0.75)
        if (projectsMeshRef.current) {
            const projectsProgress = Math.max(0, Math.min((scrollOffset - 0.5) / 0.25, 1));
            projectsMeshRef.current.rotation.y = projectsProgress * Math.PI * 2;
            projectsMeshRef.current.position.x = THREE.MathUtils.lerp(4, -2, projectsProgress);
            projectsMeshRef.current.position.z = THREE.MathUtils.lerp(-2, -8, projectsProgress);
        }

        // Skills Section (0.75 - 0.9)
        if (skillsMeshRef.current) {
            const skillsProgress = Math.max(0, Math.min((scrollOffset - 0.75) / 0.15, 1));
            skillsMeshRef.current.rotation.z = skillsProgress * Math.PI * 0.5;
            skillsMeshRef.current.scale.setScalar(THREE.MathUtils.lerp(1, 0.5, skillsProgress));
        }

        // Contact Section (0.9 - 1.0)
        if (contactMeshRef.current) {
            const contactProgress = Math.max(0, Math.min((scrollOffset - 0.9) / 0.1, 1));
            contactMeshRef.current.rotation.x = contactProgress * Math.PI;
            contactMeshRef.current.position.y = THREE.MathUtils.lerp(-10, -20, contactProgress);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Hero - Main distorted sphere */}
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
                <mesh ref={heroMeshRef} position={[-2, 0, 0]}>
                    <icosahedronGeometry args={[1.5, 4]} />
                    <MeshDistortMaterial
                        color="#00f0ff"
                        emissive="#00f0ff"
                        emissiveIntensity={0.3}
                        roughness={0.1}
                        metalness={0.9}
                        distort={0.4}
                        speed={3}
                    />
                </mesh>
            </Float>

            {/* About - Torus knot */}
            <mesh ref={aboutMeshRef} position={[2, 0, -5]}>
                <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
                <meshStandardMaterial
                    color="#ccff00"
                    emissive="#ccff00"
                    emissiveIntensity={0.3}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* Projects - Octahedron */}
            <mesh ref={projectsMeshRef} position={[0, 0, -10]}>
                <octahedronGeometry args={[1.2]} />
                <meshStandardMaterial
                    color="#7c7cff"
                    emissive="#7c7cff"
                    emissiveIntensity={0.4}
                    roughness={0.1}
                    metalness={0.9}
                    wireframe
                />
            </mesh>

            {/* Skills - Dodecahedron */}
            <mesh ref={skillsMeshRef} position={[-3, 0, -15]}>
                <dodecahedronGeometry args={[1]} />
                <meshStandardMaterial
                    color="#ff6b9d"
                    emissive="#ff6b9d"
                    emissiveIntensity={0.3}
                    roughness={0.3}
                    metalness={0.7}
                />
            </mesh>

            {/* Contact - Ring */}
            <mesh ref={contactMeshRef} position={[2, 0, -20]}>
                <torusGeometry args={[1.2, 0.3, 16, 100]} />
                <meshStandardMaterial
                    color="#00f0ff"
                    emissive="#00f0ff"
                    emissiveIntensity={0.4}
                    roughness={0.1}
                    metalness={0.9}
                />
            </mesh>

            {/* High Performance: Floating instances instead of multiple spheres */}
            <instancedMesh ref={particlesRef} args={[null as any, null as any, 50]}>
                <sphereGeometry args={[1]} />
                <meshStandardMaterial emissiveIntensity={0.8} />
            </instancedMesh>
        </group>
    );
};

// Lighting setup
const SceneLighting: React.FC = () => {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ccff00" />
            <pointLight position={[0, 10, 0]} intensity={0.5} color="#7c7cff" />
            <spotLight
                position={[0, 20, 0]}
                angle={0.5}
                penumbra={1}
                intensity={0.5}
                color="#ff6b9d"
            />
        </>
    );
};

// Main Scroll-driven 3D component
const ScrollDriven3D: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Performance: Clamped DPR to 1.5 max */}
            <Canvas
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                <SceneLighting />
                <ScrollScene />
            </Canvas>
        </div>
    );
};

export default ScrollDriven3D;
