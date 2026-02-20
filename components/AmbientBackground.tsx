import React from "react";

/**
 * AmbientBackground — Premium Aurora Gradient Mesh
 * 
 * Large, blurred gradient orbs that slowly drift and pulse,
 * creating a living atmosphere. Pure CSS, GPU-accelerated.
 */
const AmbientBackground: React.FC = () => {
    return (
        <div
            className="fixed inset-0 overflow-hidden"
            style={{ zIndex: 2, pointerEvents: "none" }}
            aria-hidden="true"
        >
            {/* Primary Neon-Lime Orb — Top Left */}
            <div
                style={{
                    position: "absolute",
                    width: "70vw",
                    height: "70vw",
                    top: "-20%",
                    left: "-15%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(204,255,0,0.15) 0%, rgba(204,255,0,0.05) 40%, transparent 70%)",
                    filter: "blur(60px)",
                    animation: "aurora-drift-1 20s ease-in-out infinite alternate",
                    willChange: "transform",
                }}
            />

            {/* Cyan Orb — Center Right */}
            <div
                style={{
                    position: "absolute",
                    width: "60vw",
                    height: "60vw",
                    top: "25%",
                    right: "-20%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(0,240,255,0.12) 0%, rgba(0,240,255,0.04) 40%, transparent 70%)",
                    filter: "blur(80px)",
                    animation: "aurora-drift-2 25s ease-in-out infinite alternate",
                    willChange: "transform",
                }}
            />

            {/* Purple/Violet Orb — Bottom Left */}
            <div
                style={{
                    position: "absolute",
                    width: "55vw",
                    height: "55vw",
                    bottom: "0%",
                    left: "5%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(124,124,255,0.12) 0%, rgba(124,124,255,0.04) 40%, transparent 70%)",
                    filter: "blur(70px)",
                    animation: "aurora-drift-3 22s ease-in-out infinite alternate",
                    willChange: "transform",
                }}
            />

            {/* Deep Magenta Accent — Center */}
            <div
                style={{
                    position: "absolute",
                    width: "45vw",
                    height: "45vw",
                    top: "55%",
                    right: "25%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,107,157,0.08) 0%, rgba(255,107,157,0.02) 40%, transparent 70%)",
                    filter: "blur(60px)",
                    animation: "aurora-drift-4 18s ease-in-out infinite alternate",
                    willChange: "transform",
                }}
            />

            {/* Secondary Lime Flare — Top Right */}
            <div
                style={{
                    position: "absolute",
                    width: "30vw",
                    height: "30vw",
                    top: "5%",
                    right: "15%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(204,255,0,0.10) 0%, rgba(204,255,0,0.03) 40%, transparent 60%)",
                    filter: "blur(50px)",
                    animation: "aurora-drift-5 15s ease-in-out infinite alternate",
                    willChange: "transform",
                }}
            />
        </div>
    );
};

export default AmbientBackground;
