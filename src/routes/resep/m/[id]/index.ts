/** Scales an ingredient amount and drops trailing zeros, e.g. 1.50 -> "1.5". */
export function scaleAmount(amount: number, multiplier: number) {
  return (amount * multiplier).toFixed(2).replace(/\.?0+$/, "");
}
