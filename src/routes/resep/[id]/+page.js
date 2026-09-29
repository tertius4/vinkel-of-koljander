import { mergeIngredients, readServings, scaleAmount, servingsLabel, toRecipeView } from "$lib/recipe";

export async function load({ parent, url }) {
  const { recipe } = await parent();
  const servings = readServings(url, recipe.porsies);
  const multiplier = recipe.porsies ? servings / recipe.porsies : 1;

  const view = toRecipeView(recipe);

  return {
    servings,
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
