import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import {
    EffectComposer,
    Bloom,
    ChromaticAberration,
    Vignette,
    Glitch,
    Noise,
    Scanline
} from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';
import * as THREE from 'three';

// Enhanced post-processing with bloom and chromatic aberration
const PostProcessingEffects: React.FC = () => {
    return (
        <EffectComposer>
            <Bloom
                intensity={0.8}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                mipmapBlur
            />
            <ChromaticAberration
                offset={new THREE.Vector2(0.002, 0.002)}
                radialModulation={false}
                modulationOffset={0.5}
            />
            <Vignette
                offset={0.3}
                darkness={0.6}
                blendFunction={BlendFunction.NORMAL}
            />
            <Noise
                opacity={0.02}
                blendFunction={BlendFunction.OVERLAY}
            />
        </EffectComposer>
    );
};

// Glitch effect that triggers occasionally
const GlitchEffect: React.FC<{ active: boolean }> = ({ active }) => {
    if (!active) return null;

    return (
        <EffectComposer>
            <Glitch
                delay={new THREE.Vector2(1.5, 3.5)}
                duration={new THREE.Vector2(0.1, 0.3)}
                strength={new THREE.Vector2(0.1, 0.2)}
                mode={GlitchMode.SPORADIC}
                active
                ratio={0.85}
            />
        </EffectComposer>
    );
};

export { PostProcessingEffects, GlitchEffect };
export default PostProcessingEffects;
