import React, { memo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { MotionValue, useMotionValueEvent } from 'framer-motion';
import JourneyScene3D from './JourneyScene3D';

interface Hero3DProps {
    scrollYProgress: MotionValue<number>;
}

const Hero3D: React.FC<Hero3DProps> = memo(({ scrollYProgress }) => {
    const scrollRef = useRef(0);

    // Sync MotionValue to Ref for performance (avoids React re-renders)
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        scrollRef.current = latest;
    });

    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 45 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true, // Needed for 3D depth
                }}
                dpr={[1, 2]}
                frameloop="always" // Ensure smooth animation
            >
                <React.Suspense fallback={null}>
                    <JourneyScene3D scrollRef={scrollRef} />
                </React.Suspense>
            </Canvas>

            {/* Gradient overlays for depth and vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)] pointer-events-none opacity-60" />
        </div>
    );
});

export default Hero3D;