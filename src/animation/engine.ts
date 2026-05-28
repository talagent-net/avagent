// Capability values are normalized scalars (0..1 or -1..+1) keyed by string,
// e.g. "eyes.blink", "head.tilt". The engine owns a single rAF loop and:
//   1. ticks every registered animation, writing new values into the capabilities map
//   2. calls every registered renderer with the updated capabilities map
// Renderers write transforms/styles directly to DOM nodes — React is not involved.

export type AnimationFn = (elapsedMs: number, deltaMs: number) => number;
export type RendererFn = (caps: ReadonlyMap<string, number>) => void;

export class AnimationEngine {
  private capabilities = new Map<string, number>();
  private restValues = new Map<string, number>();
  private animations = new Map<string, AnimationFn>();
  private renderers = new Set<RendererFn>();
  private rafId: number | null = null;
  private startTime = 0;
  private lastTime = 0;

  registerCapability(key: string, rest: number): void {
    if (!this.capabilities.has(key)) {
      this.capabilities.set(key, rest);
      this.restValues.set(key, rest);
    }
  }

  getCapability(key: string): number {
    return this.capabilities.get(key) ?? this.restValues.get(key) ?? 0;
  }

  setAnimation(key: string, anim: AnimationFn | null): void {
    if (anim) this.animations.set(key, anim);
    else this.animations.delete(key);
  }

  registerRenderer(fn: RendererFn): () => void {
    this.renderers.add(fn);
    return () => {
      this.renderers.delete(fn);
    };
  }

  start(): void {
    if (this.rafId !== null) return;
    this.startTime = performance.now();
    this.lastTime = this.startTime;

    const loop = (now: number) => {
      const elapsed = now - this.startTime;
      const dt = now - this.lastTime;
      this.lastTime = now;

      for (const [key, anim] of this.animations) {
        this.capabilities.set(key, anim(elapsed, dt));
      }

      for (const render of this.renderers) {
        render(this.capabilities);
      }

      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}
