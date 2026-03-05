import { Core } from "$lib/core/index.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const recipe_id = params.id;
  const recipe = await Core.recipe.getRecipe(recipe_id);
  if (!recipe) {
    throw error(404, "Resep nie gevind nie");
  }

  return { recipe };
}
