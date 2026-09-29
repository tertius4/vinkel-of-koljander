import { normalise } from "$lib";
import { redirect } from "@sveltejs/kit";

/** Scales an ingredient amount and drops trailing zeros, e.g. 1.50 -> "1.5". */
export function scaleAmount(amount: number, multiplier: number) {
  return (amount * multiplier).toFixed(2).replace(/\.?0+$/, "");
}

/** Key that identifies the same ingredient (with the same unit) across steps. */
export function ingredientKey(title: string, unit: string) {
  return `${normalise(title)}|${normalise(unit)}`;
}

/** "1 Mens" / "4 Mense" */
export function servingsLabel(servings: number) {
  return `${servings} ${servings === 1 ? "Mens" : "Mense"}`;
}

/** Link to the ingredients page of the recipe at `pathname`, tolerating a trailing slash. */
export function ingredientsHref(pathname: string, servings: number) {
  return `${pathname.replace(/\/+$/, "")}/bestandele?porsies=${servings}`;
}

/**
 * Reads `?porsies=` from the url. Only positive integers are accepted; anything else
 * redirects to the same url without the parameter.
 */
export function readServings(url: URL, fallback: number) {
  const param = url.searchParams.get("porsies");
  if (param === null) return fallback;

  const servings = Number(param);
  if (Number.isInteger(servings) && servings > 0) return servings;

  const clean = new URL(url);
  clean.searchParams.delete("porsies");
  throw redirect(307, clean.pathname + clean.search);
}
