import { err, normalise, ok, searchOnText, wait } from "$lib";
import { DB } from "$lib/DB";

export const searchRecipes = _searchRecipes;

export async function deleteRecipe(id: string): AsyncResult<true> {
  try {
    await DB.Comments.deleteMany({ filters: [{ field: "recipe_id", operator: "==", value: id }] });
    await DB.Resep.delete(id);
    return ok();
  } catch (error) {
    console.error("Failed to delete recipe:", error);
    return err(500, "Kon nie die resep skrap nie");
  }
}

async function _searchRecipes(
  search: string,
  categories: string[] = [],
  include_unpublished = false,
): AsyncResult<RecipeCardData[]> {
  try {
    const all_recipes = await DB.Resep.getAll();
    const recipes = all_recipes.filter((recipe) => include_unpublished || recipe.published);
    recipes.sort((a, b) => normalise(a.naam).localeCompare(normalise(b.naam)));
    recipes.sort((a, b) => (a.foto && !b.foto ? -1 : !a.foto && b.foto ? 1 : 0));

    // Must have every selected category
    const wanted = categories.map(normalise);
    const in_categories = recipes.filter((item) => {
      const have = item.kategorieë.map(normalise);
      return wanted.every((c) => have.includes(c));
    });

    // Free text on the name (and tags when no categories are selected)
    const filtered_recipes = searchOnText(
      in_categories,
      (item) => (wanted.length ? [item.naam] : [item.naam, ...item.kategorieë]),
      search,
    );

    // Unpublished recipes first (stable, so the order within each group is unchanged)
    const ordered_recipes = [...filtered_recipes].sort((a, b) => Number(!!a.published) - Number(!!b.published));

    const result_data: RecipeCardData[] = [];
    for (const recipe of ordered_recipes) {
      const data: RecipeCardData = {
        id: recipe.id,
        cover_image: recipe.foto ? { src: recipe.foto, alt: recipe.naam } : undefined,
        tags: recipe.kategorieë,
        title: recipe.naam,
        published: !!recipe.published,
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
