import { checkAuthToken } from "$lib/auth";

export async function load({ params }) {
  const authenticated = await checkAuthToken();
  return { authenticated, recipe_id: params.id };
}
