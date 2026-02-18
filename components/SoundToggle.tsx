import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// Web Audio API based sound generator
class SoundGenerator {
    private audioContext: AudioContext | null = null;
    private isInitialized = false;

    async init() {
        if (this.isInitialized) return;
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.isInitialized = true;
    }

    // Generate a click/hover sound
    playClick() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    // Generate a hover sound
    playHover() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.05);

        gainNode.gain.setValueAtTime(0.03, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }

    // Generate a success sound
    playSuccess() {
        if (!this.audioContext) return;

        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

        notes.forEach((freq, i) => {
            const oscillator = this.audioContext!.createOscillator();
            const gainNode = this.audioContext!.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext!.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, this.audioContext!.currentTime);

            const startTime = this.audioContext!.currentTime + i * 0.1;
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.3);
        });
    }

    // Generate a scroll sound
    playScroll() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.02, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
}

// Global sound instance
let soundGenerator: SoundGenerator | null = null;

export const getSoundGenerator = (): SoundGenerator | null => soundGenerator;

interface SoundToggleProps {
    onToggle?: (enabled: boolean) => void;
}

const SoundToggle: React.FC<SoundToggleProps> = ({ onToggle }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Initialize sound generator
        soundGenerator = new SoundGenerator();
    }, []);

    const handleToggle = async () => {
        if (!soundGenerator) return;

        if (!isEnabled) {
            await soundGenerator.init();
            soundGenerator.playClick();
        }

        setIsEnabled(!isEnabled);
        onToggle?.(!isEnabled);
    };

    // Show tooltip after a delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(true);
            // Hide after 5 seconds
            setTimeout(() => setShowTooltip(false), 5000);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative">
            <motion.button
                onClick={handleToggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isEnabled
                        ? 'bg-neon-lime/20 text-neon-lime border border-neon-lime/50'
                        : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/30'
                    }`}
            >
                <AnimatePresence mode="wait">
                    {isEnabled ? (
                        <motion.div
                            key="on"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Volume2 className="w-5 h-5" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="off"
                            initial={{ scale: 0, rotate: 90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <VolumeX className="w-5 h-5" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
                {showTooltip && !isEnabled && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap glass-panel-2 px-3 py-2 rounded-lg"
                    >
                        <span className="text-xs text-gray-300">Enable sound effects</span>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-neutral-800 rotate-45 border-r border-t border-white/10" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sound wave animation when enabled */}
            {isEnabled && (
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border border-neon-lime/30"
                    />
                </div>
            )}
        </div>
    );
};

export default SoundToggle;