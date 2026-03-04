import { checkAuthToken } from "$lib/auth";

export async function load() {
    const authenticated = await checkAuthToken();
    return { authenticated };
}