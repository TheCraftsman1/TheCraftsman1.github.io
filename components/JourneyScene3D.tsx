import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
    Float,
    MeshDistortMaterial,
    Sparkles,
    Html
} from '@react-three/drei';
import * as THREE from 'three';

interface JourneySceneProps {
    scrollRef: React.MutableRefObject<number>;
}

// Journey orb that follows the scroll
const JourneyOrb: React.FC<JourneySceneProps> = ({ scrollRef }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const { camera } = useThree();

    useFrame((state) => {
        const scrollOffset = scrollRef.current;

        // Calculate position based on scroll
        const y = -scrollOffset * 35;
        const x = Math.sin(scrollOffset * Math.PI * 4) * 3;
        const z = Math.cos(scrollOffset * Math.PI * 2) * 2;

        const colors = ['#00f0ff', '#ccff00', '#7c7cff', '#ff6b9d', '#00f0ff'];
        const colorIndex = Math.floor(scrollOffset * 5) % 5;
        const color = colors[colorIndex] || colors[0];

        const scale = 1 + Math.sin(scrollOffset * Math.PI) * 0.5;

        // Update Orb
        if (meshRef.current) {
            meshRef.current.position.set(x, y, z);
            meshRef.current.scale.setScalar(scale * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.1));
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;

            // Update material color if possible, or just leave it (changing material color every frame might be expensive)
            // (meshRef.current.material as THREE.MeshDistortMaterial).color.set(color);
        }

        if (glowRef.current) {
            glowRef.current.position.set(x, y, z);
            glowRef.current.scale.setScalar(scale * 2);
            // (glowRef.current.material as THREE.MeshBasicMaterial).color.set(color);
        }

        // Camera follow logic
        // Camera smooth follow
        const targetY = y + 2; // Look slightly above
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1);
        camera.lookAt(0, y, 0); // Look at center at that height? or look at orb?
        // camera.lookAt(x, y, z); // Creates dizziness potentially.
        // Better to look at a fixed X/Z but dynamic Y
        // camera.lookAt(0, y - 5, 0);
    });

    return (
        <group>
            {/* Main orb */}
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1, 4]} />
                <MeshDistortMaterial
                    color="#00f0ff" // Base color, maybe animate later
                    emissive="#00f0ff"
                    emissiveIntensity={0.5}
                    roughness={0.1}
                    metalness={0.9}
                    distort={0.5}
                    speed={4}
                />
            </mesh>

            {/* Glow effect */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color="#00f0ff"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Trail particles */}
            <TrailParticles scrollRef={scrollRef} color="#00f0ff" />
        </group>
    );
};

// Trail of particles
const TrailParticles: React.FC<{ scrollRef: React.MutableRefObject<number>; color: string }> = ({
    scrollRef,
    color
}) => {
    const particlesRef = useRef<THREE.Points>(null);
    const count = 100;

    // Initial positions
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        // Initialize with spread
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 5;
            pos[i * 3 + 1] = -i * 0.5;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            const scrollOffset = scrollRef.current;
            const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < count; i++) {
                const t = i / count;
                // Trail logic: particles act as a tail? OR particles are static in world and we fly past?
                // Original logic:
                // pos[i * 3] = Math.sin((scrollOffset - t) * Math.PI * 4) * 3 * (1 - t);

                // Let's make a flowing tail
                const relativeT = (state.clock.elapsedTime * 0.1 + t) % 1;
                const particleScroll = scrollOffset - relativeT * 0.2; // trail behind

                const y = -particleScroll * 35;
                const x = Math.sin(particleScroll * Math.PI * 4) * 3 + Math.sin(i * 132.1) * 0.5;
                const z = Math.cos(particleScroll * Math.PI * 2) * 2 + Math.cos(i * 23.2) * 0.5;

                pos[i * 3] = x;
                pos[i * 3 + 1] = y;
                pos[i * 3 + 2] = z;
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color={color}
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

// Achievement badge component
const AchievementBadge: React.FC<{ yPosition: number; label: string }> = ({
    yPosition,
    label
}) => {
    const [hovered, setHovered] = React.useState(false);
    const x = Math.sin(yPosition * 0.3) * 4; // Static x relative to y
    const z = Math.cos(yPosition * 0.2) * 2;

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[x, yPosition, z] as [number, number, number]}>
                <mesh
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <octahedronGeometry args={[0.3]} />
                    <meshStandardMaterial
                        color={hovered ? '#ccff00' : '#00f0ff'}
                        emissive={hovered ? '#ccff00' : '#00f0ff'}
                        emissiveIntensity={hovered ? 0.8 : 0.3}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </mesh>

                <Html position={[0.5, 0.5, 0]} center transform sprite distanceFactor={10}>
                    <div className={`px-3 py-2 rounded-lg whitespace-nowrap backdrop-blur-md border border-white/10 ${hovered ? 'bg-cyan-900/60' : 'bg-black/40'}`}>
                        <span className="text-cyan-400 font-mono text-xs uppercase tracking-wider">{label}</span>
                    </div>
                </Html>
            </group>
        </Float>
    );
};

// Main immersive 3D journey component
const JourneyScene3D: React.FC<JourneySceneProps> = ({ scrollRef }) => {
    return (
        <group>
            <JourneyOrb scrollRef={scrollRef} />

            {/* Achievement badges at specific scroll depths */}
            {/* -35 is roughly 100% scroll. so -8 is ~25%, -16 is 50%, etc. */}
            <AchievementBadge yPosition={-8} label="Learning Phase" />
            <AchievementBadge yPosition={-16} label="Building Projects" />
            <AchievementBadge yPosition={-24} label="Mastering Skills" />
            <AchievementBadge yPosition={-32} label="Let's Connect" />

            {/* Sparkles */}
            <Sparkles
                count={150}
                scale={40}
                size={2}
                speed={0.3}
                opacity={0.4}
                color="#00f0ff"
            />

            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        </group>
    );
};

export default JourneyScene3D;
