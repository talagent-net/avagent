import type { AnimationFn } from "./engine";

// Connecting mode: each eye spins continuously around its own center. Drives eyes.spin as a 0→1
// sawtooth — one full revolution per EYE_SPIN_PERIOD_MS — which the eye renderer maps to a 0→360°
// rotation (the 1→0 wrap is visually seamless since 360° ≡ 0°). Lazy-init so the spin always
// starts from 0 (eyes upright) regardless of when the mode is entered, and so releasing it (mode
// change) eases the value back to rest 0 = upright.
const EYE_SPIN_PERIOD_MS = 1100; // ms per full revolution — KNOB: lower = faster spin

export function createEyeSpinAnimation(): AnimationFn {
  let start: number | null = null;
  return (elapsed) => {
    if (start === null) start = elapsed;
    return ((elapsed - start) / EYE_SPIN_PERIOD_MS) % 1;
  };
}
