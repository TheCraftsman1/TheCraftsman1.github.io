import React, { memo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { MotionValue, useMotionValueEvent, useInView } from 'framer-motion';
import JourneyScene3D from './JourneyScene3D';

interface Hero3DProps {
    scrollYProgress: MotionValue<number>;
}

const Hero3D: React.FC<Hero3DProps> = memo(({ scrollYProgress }) => {
    const scrollRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: "200px" }); // Pre-render slightly before it enters view

    // Sync MotionValue to Ref for performance (avoids React re-renders)
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        scrollRef.current = latest;
    });

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
            {/* 3D Context */}
            {/* Performance: Clamped DPR to 1.5 max, dynamic frameloop to stop rendering when off-screen */}
            <Canvas onCreated={({ gl }) => { gl.debug.checkShaderErrors = false }}
                camera={{ position: [0, 0, 7], fov: 45 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true,
                }}
                dpr={[1, 1.5]}
                frameloop={isInView ? "always" : "demand"}
            >
                <React.Suspense fallback={null}>
                    <JourneyScene3D scrollRef={scrollRef} />
                </React.Suspense>
            </Canvas>

            {/* Gradient overlays for depth and vignette (no CSS backdrop filters here) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)] pointer-events-none opacity-60" />
        </div>
    );
});

export default Hero3D;