export function clamp(value: number, min = -1, max = 1): number {
  return Math.min(max, Math.max(min, value));
}
