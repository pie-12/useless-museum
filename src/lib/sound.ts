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

/**
 * Cinematic meme explosion sound ("BÙM" trầm uy lực rung chuyển màn hình)
 */
export function playPixelExplosionSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const duration = 1.6;

    // 1. Fireball roar noise (tiếng gầm lửa lan tỏa)
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(900, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + duration);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.55, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(getMasterOutput(ctx));

    // 2. Sub-bass boom drop (tiếng BÙM trầm rung loa kiểu Vine boom / Hollywood)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();

    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(140, ctx.currentTime);
    subOsc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.9);

    subGain.gain.setValueAtTime(0.7, ctx.currentTime);
    subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    subOsc.connect(subGain);
    subGain.connect(getMasterOutput(ctx));

    // 3. Shockwave crunch impact (tiếng nứt xung kích đanh lúc 0s)
    const punchOsc = ctx.createOscillator();
    const punchGain = ctx.createGain();

    punchOsc.type = "triangle";
    punchOsc.frequency.setValueAtTime(260, ctx.currentTime);
    punchOsc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

    punchGain.gain.setValueAtTime(0.4, ctx.currentTime);
    punchGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    punchOsc.connect(punchGain);
    punchGain.connect(getMasterOutput(ctx));

    noiseSource.start();
    subOsc.start();
    punchOsc.start();

    noiseSource.stop(ctx.currentTime + duration);
    subOsc.stop(ctx.currentTime + 1.25);
    punchOsc.stop(ctx.currentTime + 0.16);
  } catch {
    // Ignore audio failures
  }
}

/**
 * Mechanical thump sound when replacement button drops into place
 */
export function playPixelDropSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(getMasterOutput(ctx));

    osc.start();
    osc.stop(ctx.currentTime + 0.085);
  } catch {
    // Ignore audio failures
  }
}

