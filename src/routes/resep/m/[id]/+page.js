import { readServings, toRecipeView } from "$lib/recipe";

export async function load({ parent, url }) {
  const { recipe } = await parent();

  return {
    servings: readServings(url, recipe.porsies),
    recipe: toRecipeView(recipe),
  };
}
