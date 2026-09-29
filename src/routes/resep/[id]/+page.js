import { baseServings, servingsMultiplier, mergeIngredients, readServings, scaleAmount, servingsLabel, toRecipeView } from "$lib/recipe";

export async function load({ parent, url }) {
  const { recipe } = await parent();
  const servings = readServings(url, baseServings(recipe));
  const multiplier = servingsMultiplier(recipe, servings);

  const view = toRecipeView(recipe);

  return {
    servings,
    original_servings: baseServings(recipe),
    servings_label: servingsLabel(servings),
    recipe: {
      ...view,
      steps: view.steps.map((step) => ({
        ...step,
        ingredients: step.ingredients.map((ingredient) => ({
          ...ingredient,
          amount: scaleAmount(ingredient.amount, multiplier),
        })),
      })),
    },
    ingredients: mergeIngredients(recipe, multiplier),
  };
}
