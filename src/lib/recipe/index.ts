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

/** The recipe as the recipe pages show it (English keys, no database naming). */
export function toRecipeView(recipe: DB.Resep) {
  return {
    image: recipe.foto,
    categories: recipe.kategorieë,
    title: recipe.naam,
    servings: recipe.porsies,
    work_time: recipe.tyd.werk,
    wait_time: recipe.tyd.wag,
    description: recipe.beskrywing,
    steps: recipe.stappe.map((step) => ({
      title: step.title,
      description: step.description,
      ingredients: step.ingredients,
      instructions: step.instruksies,
    })),
    rating: {
      thumbs_up: recipe.rating?.thumbs_up ?? 0,
    },
    author: {
      name: recipe.author?.naam,
      initials: recipe.author?.initials,
    },
  };
}

/**
 * All ingredients of the recipe, scaled by `multiplier`. The same ingredient (with the same unit) can be
 * used in several steps, so those are added up and listed once.
 */
export function mergeIngredients(recipe: DB.Resep, multiplier: number) {
  const merged = new Map<string, { title: string; amount: number; unit: string; comments: string[] }>();

  for (const step of recipe.stappe) {
    for (const ingredient of step.ingredients) {
      const key = ingredientKey(ingredient.ingredient, ingredient.unit);
      const entry = merged.get(key) ?? {
        title: ingredient.ingredient,
        amount: 0,
        unit: ingredient.unit,
        comments: [],
      };

      entry.amount += Number(ingredient.amount) || 0;
      if (ingredient.comment && !entry.comments.includes(ingredient.comment)) {
        entry.comments.push(ingredient.comment);
      }

      merged.set(key, entry);
    }
  }

  return [...merged.values()].map((ingredient) => ({
    ...ingredient,
    amount: scaleAmount(ingredient.amount, multiplier),
  }));
}
