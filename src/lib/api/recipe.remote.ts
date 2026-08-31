import { ok, wait } from "$lib";
import { DB } from "$lib/DB";
import { remote } from "$lib/server";

export const searchRecipes = remote(_searchRecipes);

async function _searchRecipes(query: string): AsyncResult<RecipeCardData[]> {
  const recipe_result = await DB.Resep.getAll();

  await wait(5000);
  return ok([{}]);
}
