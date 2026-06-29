type EasingFn = (t: number) => number

export const easings = {
  outExpo: (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  inOutQuart: (t: number): number =>
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
  outQuart: (t: number): number => 1 - Math.pow(1 - t, 4),
  
}

export function tween(
  duration: number,
  easing: EasingFn,
  onUpdate: (t: number, rawT: number) => void,
): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now()
    const step = (now: number) => {
      const rawT = Math.min((now - start) / duration, 1)
      onUpdate(easing(rawT), rawT)
      if (rawT < 1) requestAnimationFrame(step)
      else resolve()
    }
    requestAnimationFrame(step)
  })
}

export const wait = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms))