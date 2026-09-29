import { baseServings, servingsMultiplier, mergeIngredients, readServings } from "$lib/recipe";

export async function load({ parent, url }) {
  const { recipe } = await parent();
  const servings = readServings(url, baseServings(recipe));
  const multiplier = servingsMultiplier(recipe, servings);

  return { title: recipe.naam, servings, original_servings: baseServings(recipe), ingredients: mergeIngredients(recipe, multiplier) };
}
