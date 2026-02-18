import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gamepad2, Trophy, Keyboard, Sparkles } from 'lucide-react';

interface Position {
    x: number;
    y: number;
}

interface Collectible {
    id: number;
    position: Position;
    collected: boolean;
}

const EasterEgg: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [score, setScore] = useState(0);
    const [collectibles, setCollectibles] = useState<Collectible[]>([]);
    const [playerPos, setPlayerPos] = useState<Position>({ x: 50, y: 50 });
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'won'>('idle');
    const [konamiProgress, setKonamiProgress] = useState(0);

    // Konami code: up up down down left right left right b a
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === konamiCode[konamiProgress]) {
                const newProgress = konamiProgress + 1;
                setKonamiProgress(newProgress);

                if (newProgress === konamiCode.length) {
                    setIsActive(true);
                    setGameState('playing');
                    initializeGame();
                    setKonamiProgress(0);
                }
            } else {
                setKonamiProgress(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [konamiProgress]);

    // Show hint after 30 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowHint(true);
        }, 30000);
        return () => clearTimeout(timer);
    }, []);

    const initializeGame = useCallback(() => {
        const newCollectibles: Collectible[] = [];
        for (let i = 0; i < 10; i++) {
            newCollectibles.push({
                id: i,
                position: {
                    x: 10 + Math.random() * 80,
                    y: 10 + Math.random() * 80
                },
                collected: false
            });
        }
        setCollectibles(newCollectibles);
        setScore(0);
        setPlayerPos({ x: 50, y: 50 });
    }, []);

    // Game controls
    useEffect(() => {
        if (gameState !== 'playing') return;

        const handleGameInput = (e: KeyboardEvent) => {
            setPlayerPos(prev => {
                let newX = prev.x;
                let newY = prev.y;
                const speed = 3;

                switch (e.code) {
                    case 'ArrowUp':
                    case 'KeyW':
                        newY = Math.max(5, prev.y - speed);
                        break;
                    case 'ArrowDown':
                    case 'KeyS':
                        newY = Math.min(95, prev.y + speed);
                        break;
                    case 'ArrowLeft':
                    case 'KeyA':
                        newX = Math.max(5, prev.x - speed);
                        break;
                    case 'ArrowRight':
                    case 'KeyD':
                        newX = Math.min(95, prev.x + speed);
                        break;
                }

                return { x: newX, y: newY };
            });
        };

        window.addEventListener('keydown', handleGameInput);
        return () => window.removeEventListener('keydown', handleGameInput);
    }, [gameState]);

    // Collision detection
    useEffect(() => {
        if (gameState !== 'playing') return;

        setCollectibles(prev => {
            const updated = prev.map(c => {
                if (c.collected) return c;

                const dx = Math.abs(c.position.x - playerPos.x);
                const dy = Math.abs(c.position.y - playerPos.y);

                if (dx < 5 && dy < 5) {
                    setScore(s => s + 1);
                    return { ...c, collected: true };
                }
                return c;
            });

            if (updated.every(c => c.collected)) {
                setGameState('won');
            }

            return updated;
        });
    }, [playerPos, gameState]);

    const closeGame = () => {
        setIsActive(false);
        setGameState('idle');
    };

    return (
        <>
            {/* Hint tooltip */}
            <AnimatePresence>
                {showHint && !isActive && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed bottom-4 right-4 z-50 glass-panel-2 px-4 py-3 rounded-lg flex items-center gap-3"
                    >
                        <Keyboard className="w-4 h-4 text-neon-lime" />
                        <span className="text-xs text-gray-400">
                            Psst... try the Konami code!
                            <span className="text-neon-lime ml-1">{'^ ^ v v < > < > B A'}</span>
                        </span>
                        <button
                            onClick={() => setShowHint(false)}
                            className="text-gray-500 hover:text-white"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Game overlay */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
                    >
                        {/* Close button */}
                        <button
                            onClick={closeGame}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {gameState === 'playing' && (
                            <>
                                {/* Header */}
                                <div className="absolute top-4 left-4 flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Gamepad2 className="w-5 h-5 text-neon-lime" />
                                        <span className="font-orbitron text-white">COLLECT EM ALL!</span>
                                    </div>
                                    <div className="glass-panel-2 px-4 py-2 rounded-lg">
                                        <span className="text-neon-lime font-orbitron">{score}</span>
                                        <span className="text-gray-400">/10</span>
                                    </div>
                                </div>

                                {/* Game area */}
                                <div className="relative w-[80vw] h-[70vh] border border-white/10 rounded-xl overflow-hidden bg-gradient-to-br from-neutral-900 to-black">
                                    {/* Grid lines */}
                                    <div className="absolute inset-0 opacity-10">
                                        {[...Array(20)].map((_, i) => (
                                            <div
                                                key={`v${i}`}
                                                className="absolute top-0 bottom-0 w-px bg-white"
                                                style={{ left: `${(i + 1) * 5}%` }}
                                            />
                                        ))}
                                        {[...Array(20)].map((_, i) => (
                                            <div
                                                key={`h${i}`}
                                                className="absolute left-0 right-0 h-px bg-white"
                                                style={{ top: `${(i + 1) * 5}%` }}
                                            />
                                        ))}
                                    </div>

                                    {/* Collectibles */}
                                    {collectibles.map(c => (
                                        <motion.div
                                            key={c.id}
                                            initial={{ scale: 0 }}
                                            animate={{
                                                scale: c.collected ? 0 : 1,
                                                opacity: c.collected ? 0 : 1
                                            }}
                                            className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2"
                                            style={{ left: `${c.position.x}%`, top: `${c.position.y}%` }}
                                        >
                                            <Sparkles className="w-6 h-6 text-neon-lime animate-pulse" />
                                        </motion.div>
                                    ))}

                                    {/* Player */}
                                    <motion.div
                                        className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2"
                                        animate={{ left: `${playerPos.x}%`, top: `${playerPos.y}%` }}
                                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                                    >
                                        <div className="w-full h-full rounded-full bg-gradient-to-br from-neon-cyan to-purple-500 shadow-lg shadow-neon-cyan/50" />
                                    </motion.div>
                                </div>

                                {/* Controls hint */}
                                <div className="mt-4 text-center text-gray-500 text-sm">
                                    Use <span className="text-neon-lime">WASD</span> or <span className="text-neon-lime">Arrow Keys</span> to move
                                </div>
                            </>
                        )}

                        {gameState === 'won' && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center"
                            >
                                <Trophy className="w-24 h-24 text-neon-lime mx-auto mb-6" />
                                <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
                                    YOU DID IT!
                                </h2>
                                <p className="text-gray-400 mb-8">
                                    You have unlocked the secret achievement! You are a true explorer.
                                </p>
                                <div className="glass-panel-2 px-8 py-4 rounded-xl inline-block">
                                    <p className="text-neon-lime font-orbitron text-lg">
                                        ACHIEVEMENT UNLOCKED: MASTER EXPLORER
                                    </p>
                                </div>
                                <button
                                    onClick={closeGame}
                                    className="mt-8 px-8 py-3 bg-neon-lime text-black font-orbitron font-bold rounded-lg hover:bg-white transition-colors"
                                >
                                    CONTINUE
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EasterEgg;