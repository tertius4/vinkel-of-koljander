import { Core2 } from "$lib/core";
import { checkAuthToken } from "$lib/auth";
import { error, redirect } from "@sveltejs/kit";

export async function load({ params }) {
  const recipe_id = params.id;
  const recipe = await Core2.recipe.getRecipe(recipe_id);
  if (!recipe) throw error(404, "Resep nie gevind nie");

  const is_logged_in = await checkAuthToken();
  if (!recipe.published && !is_logged_in) throw redirect(307, "/");

  return { recipe };
}
