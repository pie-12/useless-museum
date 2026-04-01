// Web Audio API pure synthesizer - Zero external audio files

let audioCtx: AudioContext | null = null;
let masterGainNode: GainNode | null = null;
let currentMasterVolume = 0.7; // 70% default

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      masterGainNode = audioCtx.createGain();
      masterGainNode.gain.setValueAtTime(currentMasterVolume, audioCtx.currentTime);
      masterGainNode.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMasterVolume(vol: number) {
  currentMasterVolume = Math.max(0, Math.min(1, vol));
  if (masterGainNode && audioCtx) {
    masterGainNode.gain.setValueAtTime(currentMasterVolume, audioCtx.currentTime);
  }
}

export function getMasterVolume(): number {
  return currentMasterVolume;
}

function getMasterOutput(ctx: AudioContext): AudioNode {
  if (!masterGainNode) {
    masterGainNode = ctx.createGain();
    masterGainNode.gain.setValueAtTime(currentMasterVolume, ctx.currentTime);
    masterGainNode.connect(ctx.destination);
  }
  return masterGainNode;
}

/**
 * Mechanical button click (cạch ngắn, 120Hz square wave)
 */
export function playMechanicalClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(getMasterOutput(ctx));

    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch {
    // Ignore audio failures
  }
}

/**
 * Calculator digital beep (bíp nhỏ, 800Hz sine wave, 20ms)
 */
export function playCalculatorBeep() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

    osc.connect(gain);
    gain.connect(getMasterOutput(ctx));

    osc.start();
    osc.stop(ctx.currentTime + 0.025);
  } catch {
    // Ignore audio failures
  }
}

/**
 * Dull clock tick (tích tắc khô khốc, 15ms)
 */
export function playClockTick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(420, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.015);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);

    osc.connect(gain);
    gain.connect(getMasterOutput(ctx));

    osc.start();
    osc.stop(ctx.currentTime + 0.018);
  } catch {
    // Ignore audio failures
  }
}

/**
 * Typewriter key clack
 */
export function playTypewriterClack() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(getMasterOutput(ctx));

    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  } catch {
    // Ignore audio failures
  }
}

/**
 * Small wooden/metal ball tap (tiếng bi cộc rất nhỏ khi chạm mép)
 */
export function playBallTapSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.015);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);

    osc.connect(gain);
    gain.connect(getMasterOutput(ctx));

    osc.start();
    osc.stop(ctx.currentTime + 0.018);
  } catch {
    // Ignore audio failures
  }
}
