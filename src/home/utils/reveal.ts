import type { CSSProperties } from "react";

export function revealDelay(
  index: number,
  base = 0.06,
  step = 0.06,
): CSSProperties {
  return { "--d": `${(base + index * step).toFixed(2)}s` } as CSSProperties;
}
