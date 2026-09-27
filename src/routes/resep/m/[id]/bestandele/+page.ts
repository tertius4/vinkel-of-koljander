import { Core2 } from "$lib/core";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const recipe_id = params.id;
  const recipe = await Core2.recipe.getRecipe(recipe_id);
  if (!recipe) throw error(404, "Resep nie gevind nie");

  const ingredients = recipe.stappe.flatMap((step) => {
    // TODO: Match the same ingredients to only show them once.
    return step.ingredients.map((ingredient) => {
      const comments: string[] = [];
      if (ingredient.comment) comments.push(ingredient.comment);
      return {
        title: ingredient.ingredient,
        amount: ingredient.amount,
        unit: ingredient.unit,
        comments: comments,
      };
    });
  });

  return { ingredients };
}
