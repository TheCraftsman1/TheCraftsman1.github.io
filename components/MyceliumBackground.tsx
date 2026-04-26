import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MyceliumShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;

    #define NUM_OCTAVES 5

    float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

    float noise(vec2 x) {
      vec2 i = floor(x);
      vec2 f = fract(x);
      
      // Cubic interpolation for smoother noise (curves rather than jagged lines)
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      float a = hash(i + vec2(0.0, 0.0));
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    float fbm(vec2 x) {
      float v = 0.0;
      float a = 0.5;
      vec2 shift = vec2(100.0);
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
      for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      // Normalize and adjust for aspect ratio
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      vec2 st = uv * 2.0 - 1.0;
      st.x *= uResolution.x / uResolution.y;

      // Mouse influence (reaching towards cursor over time)
      vec2 mouse = uMouse * 2.0 - 1.0;
      mouse.x *= uResolution.x / uResolution.y;
      
      float distToMouse = length(st - mouse);
      // Soft pull towards the mouse
      vec2 pull = (st - mouse) * exp(-distToMouse * 1.5) * 0.3;
      vec2 warpedSt = st + pull;

      // Slow breathing rhythm (bpm: 12-15 approx 1 cycle per 4s)
      float pulse = 0.5 + 0.5 * sin(uTime * 1.5); // base time
      
      // Domain warping for organic "growing" tendrils
      vec2 q = vec2(0.);
      q.x = fbm(warpedSt + 0.1 * uTime);
      q.y = fbm(warpedSt + vec2(1.0));

      vec2 r = vec2(0.);
      r.x = fbm(warpedSt + 1.0 * q + vec2(1.7, 9.2) + 0.15 * uTime);
      r.y = fbm(warpedSt + 1.0 * q + vec2(8.3, 2.8) + 0.126 * uTime);

      float f = fbm(warpedSt + r * 2.5);

      // Create exact "tendril" / "bezier-like" structures
      // by targeting specific bands in the noise. We increase the frequency to get thinner lines.
      float tendril1 = abs(sin(r.x * 20.0 + uTime)) * 0.05 / max(abs(f - 0.45), 0.005);
      float tendril2 = abs(cos(r.y * 18.0 - uTime * 0.5)) * 0.05 / max(abs(f - 0.55), 0.005);
      
      // Merge tendrils
      float network = clamp(tendril1 + tendril2, 0.0, 1.0);
      
      // Enhance the glow at junctions
      float glow = pow(network, 3.0);

      // Color Palette: Clean White / Light Theme
      vec3 bg = vec3(0.98, 0.98, 0.98); // Off-white to match site's #fafafa
      vec3 faintTexture = vec3(0.90, 0.90, 0.92); // Subtle shifting background texture
      vec3 tendrilColor = vec3(0.05, 0.05, 0.08); // Dark slate/almost black for the lines
      vec3 highlight = vec3(0.5, 0.5, 0.5); // Silver pulsing highlight
      
      // Mix background with a very distant/faint liquid texture
      vec3 color = mix(bg, faintTexture, f * 0.8);
      
      // Render the strands by mixing towards the dark tendril color
      color = mix(color, tendrilColor, network * 0.65);
      
      // Add the subtle silver pulse
      color = mix(color, highlight, glow * pulse * 0.4);
      
      // Gentle light vignette (fade to pure white at edges)
      float vignette = length(uv - 0.5);
      color = mix(color, vec3(1.0), vignette * 0.6);

      gl_FragColor = vec4(color, 1.0);
    }
  `
};

const ShaderPlane = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const [mousePos, setMousePos] = useState(new THREE.Vector2(0.5, 0.5));
  // Target mouse position for smooth trailing effect
  const targetPos = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to 0-1
      setMousePos(new THREE.Vector2(e.clientX / window.innerWidth, 1.0 - (e.clientY / window.innerHeight)));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
      material.current.uniforms.uResolution.value.set(size.width, size.height);
      
      // Lerp mouse for soft, slow "reaching" effect
      targetPos.current.lerp(mousePos, 0.02);
      material.current.uniforms.uMouse.value.copy(targetPos.current);
    }
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={material}
        uniforms={THREE.UniformsUtils.clone(MyceliumShaderMaterial.uniforms)}
        vertexShader={MyceliumShaderMaterial.vertexShader}
        fragmentShader={MyceliumShaderMaterial.fragmentShader}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

export const MyceliumBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#fafafa] z-0 pointer-events-none">
      <Canvas onCreated={({ gl }) => { gl.debug.checkShaderErrors = false }}
        camera={{ position: [0, 0, 1], orthographic: true, zoom: 1 }}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
};

export default MyceliumBackground;
