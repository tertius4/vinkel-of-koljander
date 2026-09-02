import { err, normalise, ok, searchOnText, wait } from "$lib";
import { DB } from "$lib/DB";
import { remote } from "$lib/server";

export const searchRecipes = remote(_searchRecipes);

async function _searchRecipes(search: string): AsyncResult<RecipeCardData[]> {
  try {
    const recipes = await DB.Resep.getAll();
    recipes.sort((a, b) => normalise(a.naam).localeCompare(normalise(b.naam)));
    recipes.sort((a, b) => a.foto && !b.foto ? -1 : !a.foto && b.foto ? 1 : 0);

    // Filter on title and tags
    const filtered_recipes = searchOnText(recipes, (item) => [item.naam, ...item.kategorieë], search);

    const result_data: RecipeCardData[] = [];
    for (const recipe of filtered_recipes) {
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
