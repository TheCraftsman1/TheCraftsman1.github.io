import { useRef, useMemo, createRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, Float } from '@react-three/drei';
import * as THREE from 'three';

// ═══════════════════════════════════════════════════════════════════
// PREMIUM GLASS RINGS — V2
//
// Upgraded shader with:
//  • Fake refraction (refract() vector to simulate distorted background)
//  • Thin-film iridescence (angle-dependent rainbow interference)
//  • Dual specular highlights (simulates studio key + fill lights)
//  • Glass volume/thickness at edges (Fresnel-driven)
//  • Soft internal caustic shimmer
//
// Still single-pass per ring — zero FBOs, zero extra render passes.
// ═══════════════════════════════════════════════════════════════════

const glassVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;

  void main() {
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const glassFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;

  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;

  // IQ's cosine palette for iridescence
  vec3 pal(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);
    float NdotV = dot(N, V);

    // ── Fresnel (glass edge detection) ──
    float fresnel = pow(1.0 - abs(NdotV), 2.2);

    // ── Fake refraction: simulate distorted content behind glass ──
    vec3 refracted = refract(-V, N, 1.0 / 1.45);
    float refractPattern =
      sin(refracted.x * 10.0 + uTime * 0.3) *
      cos(refracted.y * 8.0 - uTime * 0.2) * 0.5 + 0.5;

    // Background seen through glass (subtle color shift on white bg)
    vec3 bgColor = vec3(0.96, 0.97, 0.98);
    vec3 distortedBg = mix(
      bgColor,
      bgColor * vec3(0.92, 0.95, 1.0),
      refractPattern * 0.6
    );

    // ── Thin-film iridescence (rainbow interference) ──
    float iriAngle = acos(clamp(abs(NdotV), 0.0, 1.0)) / 3.14159;
    vec3 thinFilm = pal(
      iriAngle * 2.5 + uTime * 0.015,
      vec3(0.5, 0.5, 0.5),
      vec3(0.5, 0.5, 0.5),
      vec3(1.0, 1.0, 1.0),
      vec3(0.00, 0.10, 0.20)
    );

    // ── Environment reflection (multi-direction faked studio) ──
    vec3 refl = reflect(-V, N);
    float topLight = pow(max(refl.y, 0.0), 3.0) * 0.7;
    float bottomFill = pow(max(-refl.y, 0.0), 6.0) * 0.15;
    float sideCatch = pow(max(abs(refl.x), 0.0), 5.0) * 0.25;
    float rimGlow = pow(1.0 - abs(NdotV), 4.0) * 0.4;
    vec3 envReflection = vec3(topLight + bottomFill + sideCatch) + uColor * rimGlow * 0.6;

    // ── Dual specular highlights (key light + fill light) ──
    vec3 keyDir = normalize(vec3(0.5, 1.0, 0.4));
    float spec1 = pow(max(dot(N, normalize(V + keyDir)), 0.0), 180.0) * 0.9;

    vec3 fillDir = normalize(vec3(-0.4, 0.6, -0.5));
    float spec2 = pow(max(dot(N, normalize(V + fillDir)), 0.0), 80.0) * 0.45;

    vec3 rimDir = normalize(vec3(0.0, -0.3, 1.0));
    float spec3 = pow(max(dot(N, normalize(V + rimDir)), 0.0), 40.0) * 0.25;

    // ── Glass volume (edges = looking through more material) ──
    float thickness = mix(0.05, 1.0, fresnel);
    vec3 volumeTint = mix(vec3(1.0), uColor * 0.25 + vec3(0.75), thickness * 0.35);

    // ── Internal caustic shimmer ──
    float caustic = sin(vWorldPos.x * 18.0 + uTime * 0.6)
                  * sin(vWorldPos.y * 14.0 - uTime * 0.4)
                  * sin(vWorldPos.z * 10.0 + uTime * 0.3) * 0.04;

    // ── Compose final glass ──
    vec3 glass = distortedBg * (1.0 - fresnel * 0.5);
    glass = mix(glass, thinFilm * 0.45 + vec3(0.55), fresnel * 0.45);
    glass += envReflection * fresnel;
    glass += vec3(spec1 + spec2 + spec3);
    glass *= volumeTint;
    glass += uColor * fresnel * 0.2;
    glass += vec3(caustic) * fresnel;

    // ── Alpha (transparent center, opaque edges + highlights) ──
    float alpha = mix(0.12, 0.78, fresnel);
    alpha += (spec1 + spec2) * 0.4;
    alpha = clamp(alpha, 0.0, 0.92);

    gl_FragColor = vec4(glass, alpha);
  }
`;

// ── Floating Motes (lightweight point sprites) ──
const FloatingMotes = ({ count = 40 }: { count?: number }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const side = Math.random() > 0.5 ? 1 : -1;
      positions[i * 3] = side * (Math.random() * 4.0 + 3.5);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      sizes[i] = Math.random() * 3.0 + 1.0;
      speeds[i] = Math.random() * 0.5 + 0.2;
    }
    return { positions, sizes, speeds };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += Math.sin(t * speeds[i] + i) * 0.002;
      posArr[i * 3] += Math.cos(t * speeds[i] * 0.7 + i) * 0.001;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#b0d4e8"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ── Main Ring Animation ──
const InfiniteLoop = ({ startAnimation = true }: { startAnimation?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  const rings = useMemo(() => Array.from({ length: 5 }).map(() => createRef<THREE.Mesh>()), []);
  const pulses = useMemo(() => Array.from({ length: 5 }).map(() => createRef<THREE.Mesh>()), []);

  const R = 3.6;
  const T = 0.25; // Thicker tube for more visible glass volume

  const colors = ['#0ea5e9', '#0284c7', '#38bdf8', '#10b981', '#34d399'];

  // One shader material per ring (unique color)
  const materials = useMemo(() => {
    return colors.map(color => new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
      },
      vertexShader: glassVertex,
      fragmentShader: glassFragment,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    }));
  }, []);

  // Shared geometry
  const torusGeo = useMemo(() => new THREE.TorusGeometry(R, T, 32, 64), []);
  const pulseGeo = useMemo(() => new THREE.SphereGeometry(0.08, 12, 12), []);

  useEffect(() => {
    if (startAnimation && startTime === null) setStartTime(Date.now());
  }, [startAnimation, startTime]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    materials.forEach(mat => { mat.uniforms.uTime.value = t; });

    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / 800, 1.0);
    const alignFactor = Math.pow(progress, 2);

    for (let i = 0; i < 5; i++) {
      const ring = rings[i].current;
      const pulse = pulses[i].current;

      if (ring) {
        const baseRotX = t * 0.2;
        const baseRotY = (i * Math.PI) / 5;
        const alignedRotX = Math.PI / 2;
        const alignedRotZ = t * 0.5 + (i * 0.2);

        ring.rotation.x = THREE.MathUtils.lerp(baseRotX, alignedRotX, alignFactor);
        ring.rotation.y = THREE.MathUtils.lerp(baseRotY, 0, alignFactor);
        ring.rotation.z = THREE.MathUtils.lerp(0, alignedRotZ, alignFactor);
        ring.position.x = 0;
        ring.position.y = THREE.MathUtils.lerp(0, (2 - i) * 1.5, alignFactor);
      }

      if (pulse) {
        const angle = t * 1.5 + (i * Math.PI / 2);
        pulse.position.set(
          Math.cos(angle) * R,
          Math.sin(angle) * R,
          Math.sin(angle * 12) * (T * 0.5)
        );
      }
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.position.y = THREE.MathUtils.lerp(0, 0.5, alignFactor);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef}>
        {rings.map((ref, i) => (
          <mesh key={i} ref={ref} geometry={torusGeo} material={materials[i]}>
            <mesh ref={pulses[i]} geometry={pulseGeo}>
              <meshBasicMaterial color={colors[i]} toneMapped={false} />
            </mesh>
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const MobileAdjuster = () => {
  const { viewport, camera } = useThree();
  useFrame(() => {
    const isMobile = viewport.aspect < 1;
    const targetFov = isMobile ? 55 : 35;
    (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp(
      (camera as THREE.PerspectiveCamera).fov, targetFov, 0.1
    );
    camera.updateProjectionMatrix();
  });
  return null;
};

export const FrostedGlassBackground = ({ startAnimation = false }: { startAnimation?: boolean }) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#fafafa] z-0 pointer-events-none overflow-hidden">
      <Canvas
        onCreated={({ gl }) => { gl.debug.checkShaderErrors = false; }}
        camera={{ position: [0, 0, 12], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
      >
        <AdaptiveDpr pixelated />

        {/* Studio-style lighting for specular highlights */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[8, 12, 5]} intensity={2.0} />
        <directionalLight position={[-5, -4, 8]} intensity={0.8} color="#c0e8ff" />
        <directionalLight position={[0, -8, -3]} intensity={0.4} color="#ffe0d0" />

        <FloatingMotes count={35} />
        <InfiniteLoop startAnimation={startAnimation} />
        <MobileAdjuster />
      </Canvas>
    </div>
  );
};

export default FrostedGlassBackground;
