import { Core2 } from "$lib/core/index.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const recipe_id = params.id;
  const recipe = await Core2.recipe.getRecipe(recipe_id);
  if (!recipe) throw error(404, "Resep nie gevind nie");

  return {
    recipe: {
      image: recipe.foto,
      title: recipe.naam,
      description: recipe.beskrywing,
    },
  };
}
