import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface Particle {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    size: number;
    color: THREE.Color;
}

interface InteractiveParticlesProps {
    count?: number;
}

const InteractiveParticles: React.FC<InteractiveParticlesProps> = ({ count = 100 }) => {
    const meshRef = useRef<THREE.Points>(null);
    const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
    const { viewport } = useThree();

    const particles = useMemo(() => {
        const particles: Particle[] = [];
        const colors = ['#00f0ff', '#ccff00', '#7c7cff', '#ff6b9d'];

        for (let i = 0; i < count; i++) {
            particles.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 10
                ),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.01
                ),
                size: Math.random() * 0.08 + 0.02,
                color: new THREE.Color(colors[Math.floor(Math.random() * colors.length)]),
            });
        }
        return particles;
    }, [count]);

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        particles.forEach((p, i) => {
            positions[i * 3] = p.position.x;
            positions[i * 3 + 1] = p.position.y;
            positions[i * 3 + 2] = p.position.z;
        });
        return positions;
    }, [particles, count]);

    const colors = useMemo(() => {
        const colors = new Float32Array(count * 3);
        particles.forEach((p, i) => {
            colors[i * 3] = p.color.r;
            colors[i * 3 + 1] = p.color.g;
            colors[i * 3 + 2] = p.color.b;
        });
        return colors;
    }, [particles, count]);

    const sizes = useMemo(() => {
        const sizes = new Float32Array(count);
        particles.forEach((p, i) => {
            sizes[i] = p.size;
        });
        return sizes;
    }, [particles, count]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame(() => {
        if (!meshRef.current) return;

        // Smooth mouse interpolation
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        const positions = meshRef.current.geometry.attributes.position.array as Float32Array;

        particles.forEach((p, i) => {
            // Add mouse influence
            const dx = p.position.x - mouseRef.current.x * 5;
            const dy = p.position.y - mouseRef.current.y * 5;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 3) {
                p.velocity.x += (dx / dist) * 0.001;
                p.velocity.y += (dy / dist) * 0.001;
            }

            // Apply velocity
            p.position.add(p.velocity);

            // Damping
            p.velocity.multiplyScalar(0.99);

            // Boundary wrapping
            if (p.position.x > 10) p.position.x = -10;
            if (p.position.x < -10) p.position.x = 10;
            if (p.position.y > 10) p.position.y = -10;
            if (p.position.y < -10) p.position.y = 10;

            positions[i * 3] = p.position.x;
            positions[i * 3 + 1] = p.position.y;
            positions[i * 3 + 2] = p.position.z;
        });

        meshRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export default InteractiveParticles;
