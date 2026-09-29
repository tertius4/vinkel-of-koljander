import { mergeIngredients, readServings } from "$lib/recipe";

export async function load({ parent, url }) {
  const { recipe } = await parent();
  const servings = readServings(url, recipe.porsies);
  const multiplier = recipe.porsies ? servings / recipe.porsies : 1;

  return { title: recipe.naam, servings, ingredients: mergeIngredients(recipe, multiplier) };
}
