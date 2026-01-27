import type { Actions } from "./$types";
import { DB } from "$lib/DB";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const naam = data.get("naam");
    const beskrywing = data.get("beskrywing");

    const result = await DB.Resep.create({ naam, beskrywing });

    if (result.success) {
      throw redirect(303, "/");
    }

    return { success: result.success, error: result.error_message };
  },
};
