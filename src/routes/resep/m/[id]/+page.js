import { readServings } from ".";

export async function load({ parent, url }) {
  const { recipe } = await parent();

  return {
    servings: readServings(url, recipe.porsies),
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
