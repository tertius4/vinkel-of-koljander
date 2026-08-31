import { err, ok, wait } from "$lib";
import { DB } from "$lib/DB";
import { remote } from "$lib/server";

export const searchRecipes = remote(_searchRecipes);

async function _searchRecipes(query: string): AsyncResult<RecipeCardData[]> {
  try {
    const recipes = await DB.Resep.getAll();

    const result_data: RecipeCardData[] = [];
    for (const recipe of recipes) {
      const data: RecipeCardData = {
        id: recipe.id,
        cover_image: recipe.foto ? { src: recipe.foto, alt: recipe.naam } : undefined,
        tags: recipe.kategorieë,
        title: recipe.naam,
        tyd: {
          wag: recipe.tyd.wag,
          werk: recipe.tyd.werk,
        },
      };

      result_data.push(data);
    }

    return ok(result_data);
  } catch (error) {
    return err(500, "Failed to search recipes");
  }
}
