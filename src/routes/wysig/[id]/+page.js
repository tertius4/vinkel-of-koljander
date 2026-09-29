import { checkAuthToken } from "$lib/auth";
import { DB } from "$lib/DB";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const authenticated = await checkAuthToken();

  try {
    const recipe = await DB.Resep.read(params.id);
    return { authenticated, recipe };
  } catch {
    throw error(404, "Resep nie gevind nie");
  }
}
