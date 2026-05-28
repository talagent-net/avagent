import type { AnimationFn } from "./engine";

// Eyes blink at random intervals. Each blink is a quick down/up triangle
// (1 → 0 → 1) over a random duration. Between blinks, the value rests at 1.

const MIN_DURATION_MS = 110;
const MAX_DURATION_MS = 180;
const MIN_INTERVAL_MS = 1500;
const MAX_INTERVAL_MS = 4500;

const randRange = (min: number, max: number) => min + Math.random() * (max - min);

export function createBlinkAnimation(): AnimationFn {
  let nextBlinkAt = randRange(MIN_INTERVAL_MS, MAX_INTERVAL_MS);
  let blinkStartedAt: number | null = null;
  let blinkDuration = randRange(MIN_DURATION_MS, MAX_DURATION_MS);

  return (elapsed) => {
    if (blinkStartedAt === null && elapsed >= nextBlinkAt) {
      blinkStartedAt = elapsed;
      blinkDuration = randRange(MIN_DURATION_MS, MAX_DURATION_MS);
    }

    if (blinkStartedAt !== null) {
      const t = (elapsed - blinkStartedAt) / blinkDuration;
      if (t >= 1) {
        blinkStartedAt = null;
        nextBlinkAt = elapsed + randRange(MIN_INTERVAL_MS, MAX_INTERVAL_MS);
        return 1;
      }
      // Triangle: 1 at t=0, 0 at t=0.5, 1 at t=1
      return Math.abs(t - 0.5) * 2;
    }

    return 1;
  };
}
