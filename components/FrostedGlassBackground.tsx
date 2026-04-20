import { useRef, useMemo, createRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const materialProps = {
  background: new THREE.Color('#fafafa'),
  transmission: 1.0,
  roughness: 0.15,
  ior: 1.4,
  chromaticAberration: 0.05,
  resolution: 512,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  color: "#ffffff"
};

// Smaller floating geometric glassy fragments for empty spaces
const FloatingParticles = ({ count = 35 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      // Force particles heavily to the left (-1) or right (1), leaving center (rings area) empty
      const side = Math.random() > 0.5 ? 1 : -1;
      // Bring them even closer to the rings (which are at radius 3.6), just hugging the perimeter
      const xOffset = Math.random() * 3.5 + 4.2; // Between 4.2 and 7.7 units out

      return {
        position: [
          side * xOffset, // Safe left/right zones
          (Math.random() - 0.5) * 20, // Spread across Y vertically
          (Math.random() - 0.5) * 4 // Depth (Z) spread kept close to 0 to avoid visual overlap
        ] as [number, number, number],
        rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: Math.random() * 0.4 + 0.1, // Variation in smaller sizes
      speed: Math.random() * 2 + 1,
      floatIntensity: Math.random() * 3 + 1,
      type: Math.random() > 0.5 ? 'icosahedron' : 'octahedron'
      };
    });
  }, [count]);

  return (
    <>
      {particles.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={2} floatIntensity={p.floatIntensity} position={p.position}>
          <mesh rotation={p.rotation} scale={p.scale}>
            {p.type === 'icosahedron' ? (
              <icosahedronGeometry args={[1, 0]} />
            ) : (
              <octahedronGeometry args={[1, 0]} />
            )}
            <MeshTransmissionMaterial {...materialProps} thickness={0.5} />
          </mesh>
        </Float>
      ))}
    </>
  );
};

const InfiniteLoop = ({ startAnimation = false }: { startAnimation?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Store the exact time the animation actually starts so we can calculate reliable elapsed time
  const [startTime, setStartTime] = useState<number | null>(null);

  // Use arrays of refs for the 5 perfectly synced rings
  const rings = useMemo(() => Array.from({ length: 5 }).map(() => createRef<THREE.Mesh>()), []);
  const pulses = useMemo(() => Array.from({ length: 5 }).map(() => createRef<THREE.Mesh>()), []);
  const lights = useMemo(() => Array.from({ length: 5 }).map(() => createRef<THREE.PointLight>()), []);

  const R = 3.6; // Increased unified radius for a massive nested sphere
  const T = 0.20; // Slightly thicker glass tube to match scale
  
  // A gradient color palette matching the brand (Blues, Teals, Emeralds)
  const colors = ['#0ea5e9', '#0284c7', '#38bdf8', '#10b981', '#34d399'];

  // Start the timer when startAnimation prop turns true
  useEffect(() => {
    if (startAnimation && startTime === null) {
      // Use absolute time
      setStartTime(Date.now());
    }
  }, [startAnimation, startTime]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Normalize scroll progress 0 to 1 over ~800px
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / 800, 1.0);
    const alignFactor = Math.pow(progress, 2);

    // Calculate animation playhead base on explicit start time
    const animElapsed = startTime ? (Date.now() - startTime) / 1000 : 0;

    for (let i = 0; i < 5; i++) {
      const ring = rings[i].current;
      const pulse = pulses[i].current;
      const light = lights[i].current;

      if (ring) {
        // Base state: Perfectly rhythmic interlocking sphere (like an atom or gyroscope)
        const baseRotX = t * 0.2; // Smooth collective rolling on X
        const baseRotY = (i * Math.PI) / 5; // Perfect angular offset around the poles
        const baseRotZ = 0;
        
        // Target state: Vertical stacked column (Perfectly aligned)
        const alignedRotX = Math.PI / 2; // Flat on the XZ plane
        const alignedRotY = 0;
        const alignedRotZ = t * 0.5 + (i * 0.2); // Gentle synchronized spin when stacked
        
        ring.rotation.x = THREE.MathUtils.lerp(baseRotX, alignedRotX, alignFactor);
        ring.rotation.y = THREE.MathUtils.lerp(baseRotY, alignedRotY, alignFactor);
        ring.rotation.z = THREE.MathUtils.lerp(baseRotZ, alignedRotZ, alignFactor);

        // --- ENTRANCE ANIMATION: Left to right stagger ---
        if (startAnimation && startTime) {
          const staggerDelay = i * 0.15; // 0.15s delay between each ring (faster sequence)
          // Add small delay to let site "breath" before flying in
          const entranceT = Math.max(0, animElapsed - staggerDelay - 0.1);
          
          // 1.5-second flight per ring (faster by 1s), entering from off-screen left (-40) to center (0)
          const easeOutQuart = 1 - Math.pow(1 - Math.min(entranceT / 1.5, 1), 4); 
          ring.position.x = THREE.MathUtils.lerp(-40, 0, easeOutQuart);
        } else {
          ring.position.x = -40; // Hide off-screen left until started
        }

        // Position: Base is center (0,0,0) -> Target is stacked Y: [-3.0, -1.5, 0, 1.5, 3.0]
        const basePosY = 0;
        const alignedPosY = (2 - i) * 1.5; 
        ring.position.y = THREE.MathUtils.lerp(basePosY, alignedPosY, alignFactor);
      }

      if (pulse && light) {
        // Run light inside the ring tube over time
        const angle = t * 1.5 + (i * Math.PI / 2); // Offset their pulse timing so they chase each other
        const x = Math.cos(angle) * R;
        const y = Math.sin(angle) * R;
        const z = Math.sin(angle * 12) * (T * 0.5); // Minor wobble z-depth inside the tube
        
        pulse.position.set(x, y, z);
        light.position.set(x, y, z);
      }
    }

    if (groupRef.current) {
      // Very slow master spin to show volume
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.position.y = THREE.MathUtils.lerp(0, 0.5, alignFactor); // Shift group up slightly when stacked
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.0}>
      <group ref={groupRef}>
        {rings.map((ref, i) => (
          <mesh key={i} ref={ref}>
            <torusGeometry args={[R, T, 64, 128]} />
            <MeshTransmissionMaterial {...materialProps} thickness={T * 2.5} />
            <mesh ref={pulses[i]}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial color={colors[i]} toneMapped={false} />
            </mesh>
            <pointLight ref={lights[i]} color={colors[i]} intensity={2.5} distance={4} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};


const MobileAdjuster = () => {
  const { viewport, camera } = useThree();
  useFrame(() => {
    // If aspect ratio is portrait (mobile), widen the FOV so rings don't squash text
    const isMobile = viewport.aspect < 1;
    const targetFov = isMobile ? 55 : 35;
    camera.fov = THREE.MathUtils.lerp((camera as THREE.PerspectiveCamera).fov, targetFov, 0.1);
    camera.updateProjectionMatrix();
  });
  return null;
};

export const FrostedGlassBackground = ({ startAnimation = false }: { startAnimation?: boolean }) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#fafafa] z-0 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        
        {/* High-quality studio environment for reflections */}
        <Environment preset="studio" />
        
        {/* Fill the empty background space with small floating shards */}
        <FloatingParticles count={30} />

        {/* The main central glass object */}
        <InfiniteLoop startAnimation={startAnimation} />
        <MobileAdjuster />
      </Canvas>
    </div>
  );
};

export default FrostedGlassBackground;

