import { ingredientKey, readServings, scaleAmount } from "..";

export async function load({ parent, url }) {
  const { recipe } = await parent();
  const servings = readServings(url, recipe.porsies);
  const multiplier = recipe.porsies ? servings / recipe.porsies : 1;

  // The same ingredient (with the same unit) can be used in several steps, so add those up and show them once.
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

  const ingredients = [...merged.values()].map((ingredient) => ({
    ...ingredient,
    amount: scaleAmount(ingredient.amount, multiplier),
  }));

  return { title: recipe.naam, servings, ingredients };
}
