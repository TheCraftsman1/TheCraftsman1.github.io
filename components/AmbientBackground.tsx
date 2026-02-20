import React, { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const AmbientBackground: React.FC = () => {
    const [init, setInit] = useState(false);

    // Initialize the tsParticles engine
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // loadSlim prevents loading heavy mathematical shapes we don't need
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        // Optional: log container.id if needed for debugging
    };

    const options: ISourceOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab", // Connects lines to the cursor on hover
                    },
                },
                modes: {
                    grab: {
                        distance: 250,
                        links: {
                            opacity: 0.3,
                            color: "#ccff00" // Neon-lime grab connection
                        }
                    },
                },
            },
            particles: {
                color: {
                    value: ["#00f0ff", "#ccff00", "#7c7cff"], // Cyan, Lime, Purple
                },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.05, // Very subtle interconnectivity
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: {
                        default: OutMode.bounce,
                    },
                    random: false,
                    speed: 0.3, // Extremely slow drift
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        width: 800,
                        height: 800
                    },
                    value: 60, // Light density to prevent clutter
                },
                opacity: {
                    value: 0.3,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                    animation: {
                        enable: true,
                        speed: 1,
                        sync: false,
                        startValue: "random",
                        destroy: "none"
                    }
                },
            },
            detectRetina: true,
        }),
        [],
    );

    if (!init) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-0 pointer-events-auto mix-blend-screen opacity-60">
            {/* Dark gradient vignette over the particles to keep focus on center content */}
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
            <Particles
                id="tsparticles-ambient"
                particlesLoaded={particlesLoaded}
                options={options}
                className="w-full h-full"
            />
        </div>
    );
};

export default AmbientBackground;
