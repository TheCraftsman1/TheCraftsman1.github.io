/**
 * Ultra-Lightweight Web Audio Synthesizer Engine
 * Zero external audio assets, pure GPU/audio thread synthesis.
 * Generates organic micro-chirps and mechanical clicks (< 0.04 volume, 5-40ms duration)
 * with strict auto-play lifecycle management and haptic micro-feedback.
 */

const STORAGE_KEY = 'portfolio-sound-enabled';

let sharedAudioCtx: AudioContext | null = null;
let lastHoverTickTime = 0;
let isSoundEnabledState = true;

// Initialize sound state safely from localStorage
if (typeof window !== 'undefined') {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      isSoundEnabledState = stored === 'true';
    }
  } catch {
    // Ignore storage restrictions
  }
}

/**
 * Returns or initializes the shared AudioContext singleton.
 * Resumes audio context if in suspended state upon user interaction.
 */
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;

  if (!sharedAudioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (AudioContextClass) {
      sharedAudioCtx = new AudioContextClass();
    }
  }

  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {
      // Ignored if waiting for user gesture
    });
  }

  return sharedAudioCtx;
}

/**
 * Trigger subtle device haptics if supported
 */
function triggerHaptic(durationMs = 8): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(durationMs);
    } catch {
      // Ignore vibration errors
    }
  }
}

/**
 * Check if sound is currently enabled
 */
export function isSoundEnabled(): boolean {
  return isSoundEnabledState;
}

/**
 * Toggle sound globally and persist to localStorage
 */
export function toggleSound(): boolean {
  isSoundEnabledState = !isSoundEnabledState;
  try {
    localStorage.setItem(STORAGE_KEY, String(isSoundEnabledState));
  } catch {
    // Ignore
  }

  if (isSoundEnabledState) {
    playClickSnap();
  }

  return isSoundEnabledState;
}

/**
 * Ultra-subtle hover chirp (5-8ms sine sweep at 1800Hz -> 2400Hz, volume < 0.02)
 * Throttled to max 1 tick every 60ms to prevent audio clutter on rapid sweeps.
 */
export function playHoverTick(): void {
  if (!isSoundEnabledState) return;

  const now = Date.now();
  if (now - lastHoverTickTime < 60) return;
  lastHoverTickTime = now;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const startTime = ctx.currentTime;
    const duration = 0.008; // 8ms micro-chirp

    osc.frequency.setValueAtTime(1800, startTime);
    osc.frequency.exponentialRampToValueAtTime(2400, startTime + duration);

    gain.gain.setValueAtTime(0.015, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.002);
  } catch {
    // Graceful silent fallback
  }
}

/**
 * Tactile click snap for primary buttons & filter pills (10-12ms downward sweep, volume < 0.04)
 */
export function playClickSnap(): void {
  if (!isSoundEnabledState) return;

  triggerHaptic(10);

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const startTime = ctx.currentTime;
    const duration = 0.012;

    osc.frequency.setValueAtTime(1600, startTime);
    osc.frequency.exponentialRampToValueAtTime(600, startTime + duration);

    gain.gain.setValueAtTime(0.035, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.002);
  } catch {
    // Graceful silent fallback
  }
}

/**
 * Mode switcher chime (Creative <-> Systems)
 */
export function playModeSwitchChime(mode: 'creative' | 'systems'): void {
  if (!isSoundEnabledState) return;

  triggerHaptic(14);

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const startTime = ctx.currentTime;
    const duration = 0.045;

    if (mode === 'creative') {
      // Upward melodic sweep
      osc.frequency.setValueAtTime(440, startTime);
      osc.frequency.exponentialRampToValueAtTime(880, startTime + duration);
    } else {
      // Tech downward acoustic sweep
      osc.frequency.setValueAtTime(880, startTime);
      osc.frequency.exponentialRampToValueAtTime(440, startTime + duration);
    }

    gain.gain.setValueAtTime(0.04, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.005);
  } catch {
    // Graceful silent fallback
  }
}

/**
 * Theme toggle chime (Light <-> Dark)
 */
export function playThemeChime(toDark: boolean): void {
  if (!isSoundEnabledState) return;

  triggerHaptic(15);

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const startTime = ctx.currentTime;
    const duration = 0.07;

    if (toDark) {
      // Warm descent into night mode
      osc.frequency.setValueAtTime(640, startTime);
      osc.frequency.exponentialRampToValueAtTime(320, startTime + duration);
    } else {
      // Crisp ascent into light mode
      osc.frequency.setValueAtTime(360, startTime);
      osc.frequency.exponentialRampToValueAtTime(720, startTime + duration);
    }

    gain.gain.setValueAtTime(0.035, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.005);
  } catch {
    // Graceful silent fallback
  }
}

/**
 * Filter select tick for archive & category tabs
 */
export function playFilterSelect(): void {
  if (!isSoundEnabledState) return;

  triggerHaptic(8);

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const startTime = ctx.currentTime;
    const duration = 0.01;

    osc.frequency.setValueAtTime(1400, startTime);
    osc.frequency.exponentialRampToValueAtTime(900, startTime + duration);

    gain.gain.setValueAtTime(0.025, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.002);
  } catch {
    // Graceful silent fallback
  }
}

/**
 * Engineering note modal expansion sound
 */
export function playNoteExpand(): void {
  if (!isSoundEnabledState) return;

  triggerHaptic(12);

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const startTime = ctx.currentTime;
    const duration = 0.05;

    osc.frequency.setValueAtTime(500, startTime);
    osc.frequency.exponentialRampToValueAtTime(950, startTime + duration);

    gain.gain.setValueAtTime(0.03, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.005);
  } catch {
    // Graceful silent fallback
  }
}
