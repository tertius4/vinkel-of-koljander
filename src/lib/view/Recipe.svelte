<script>
  import { page } from "$app/state";
  import { Navigation } from "$lib/classes/Navigation.svelte";
  import { DB } from "$lib/DB";
  import { onMount, tick } from "svelte";

  /** @type {DB.Resep?} */
  let recipe = $state(null);

  onMount(async () => {
    recipe = await getRecipe();
  });

  async function getRecipe() {
    const url = new URL(page.url.origin + Navigation.current_page);
    const recipe_id = url.searchParams.get("recipe_id");
    if (!recipe_id) {
      Navigation.navigateTo("/");
      return null;
    }

    return await DB.Resep.read(recipe_id);
  }

  async function handleClose() {
    Navigation.navigateTo("/");
  }
</script>

{#if !recipe}
  <p class="text-center text-gray-500">Laai resep...</p>
{:else}
  <div class=" px-4">
    <div class="flex items-start justify-between">
      <h1 class="font-black uppercase text-[32px]">{recipe.naam}</h1>

      <button class="p-2" type="button" aria-label="Sluit resep" onclick={handleClose}>
        <svg
          class="w-6 h-6 text-cod-gray-600 hover:text-cod-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <div class="flex-wrap">
      {#each recipe.kategorieë as kategorie}
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-orange-100 text-orange-800 mr-2"
        >
          {kategorie}
        </span>
      {/each}
    </div>
  </div>
{/if}
