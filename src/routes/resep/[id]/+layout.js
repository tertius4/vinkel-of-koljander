import { Core2 } from "$lib/core";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const recipe = await Core2.recipe.getRecipe(params.id);
  if (!recipe) throw error(404, "Resep nie gevind nie");

  return { recipe };
}
