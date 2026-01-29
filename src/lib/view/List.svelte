<script>
  import { normalize, SKEP_KODE } from "$lib";
  import { Navigation } from "$lib/classes/Navigation.svelte";
  import CardResep from "$lib/comps/CardResep.svelte";
  import Input from "$lib/comps/Input.svelte";
  import { DB } from "$lib/DB";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  /** @type {string} */
  let search_text = $state("");
  const normalized_search = $derived(normalize(search_text));

  let all_recipes = $state();
  let is_loading = $state(true);
  let scrolled = $state(false);
  /** @type {HTMLDivElement?} */
  let listDiv = $state(null);

  function handleScroll() {
    scrolled = !!listDiv?.scrollTop;
  }

  onMount(async () => {
    all_recipes = await DB.Resep.getAll();
    is_loading = false;
  });

  const recipes = $derived(filterRecipes());

  function filterRecipes() {
    if (!search_text) return all_recipes;

    return all_recipes.filter((resep) => normalize(resep.naam).includes(normalized_search));
  }

  function createRecipe() {
    Navigation.navigateTo("/?skep=eD3jwnf64nd3iown");
  }

  /**
   *
   * @param {DB.Resep} resep
   */
  function handleRecipeSelect(resep) {
    Navigation.navigateTo(`/?recipe_id=${resep.id}`);
  }
</script>

<section
  class="px-4 pb-4 mb-0 rounded-b-lg transition-shadow duration-300"
  class:shadow-[0_10px_10px_rgba(1,1,1,0.08)]={scrolled}
>
  <div class="relative">
    <Input bind:value={search_text} placeholder="Soek resepte..." />
    {#if search_text === SKEP_KODE}
      <button
        type="button"
        onclick={createRecipe}
        class="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-rust text-white rounded-lg hover:bg-rust-900 transition-colors"
      >
        Skep resep
      </button>
    {/if}
  </div>
</section>

{#if is_loading}
  <p class="text-center text-gray-500">Laai resepte...</p>
{:else}
  <div
    class="px-4 pt-4 overflow-y-auto flex flex-col gap-6 h-full pb-50 scrollbar-none"
    bind:this={listDiv}
    onscroll={handleScroll}
  >
    {#each recipes as resep (resep.id)}
      <div>
        <CardResep {resep} onclick={handleRecipeSelect} />
      </div>
    {:else}
      <p class="text-center text-gray-500">Geen resepte gevind nie.</p>
      <button
        class="px-4 py-2 bg-rust text-white rounded-lg hover:bg-rust-900 transition-colors"
        type="button"
        onclick={() => (search_text = "")}
      >
        Herstel soektog
      </button>
    {/each}
  </div>
{/if}
