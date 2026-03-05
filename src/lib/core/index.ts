import { DB } from "$lib/DB";

export class Core {
  static readonly recipe = {
    getRecipe: async (id: string) => {
      try {
        const recipe = await DB.Resep.read(id);
        return recipe;
      } catch (error) {
        console.error("Error fetching recipe:", error);
        return null;
      }
    },
  };
}
