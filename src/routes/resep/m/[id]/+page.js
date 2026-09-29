import { Core2 } from "$lib/core/index.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const recipe_id = params.id;
  const recipe = await Core2.recipe.getRecipe(recipe_id);
  if (!recipe) throw error(404, "Resep nie gevind nie");

  return {
    recipe: {
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
    },
  };
}
