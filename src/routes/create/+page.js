import { checkAuthToken } from "$lib/auth";

export async function load() {
  return { authenticated: await checkAuthToken() };
}
