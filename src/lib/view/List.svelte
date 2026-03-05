<script>
  import { normalize } from "$lib";
  import { checkAuthToken } from "$lib/auth";
  import Input from "$lib/comps/Input.svelte";
  import PageHeader from "$lib/comps/PageHeader.svelte";
  import { DB } from "$lib/DB";
  import CardResep from "./CardResep.svelte";

  /** @type {string} */
  let search_text = $state("");
  const normalized_search = $derived(normalize(search_text));

  const all_recipes = $derived(await DB.Resep.getAll());
  let is_loading = $state(true);
  let scrolled = $state(false);
  /** @type {HTMLDivElement?} */
  let listDiv = $state(null);

  const is_logged_in = $derived(await checkAuthToken());

  function handleScroll() {
    scrolled = !!listDiv?.scrollTop;
  }

  const recipes = $derived(filterRecipes());

  function filterRecipes() {
    if (!search_text) return all_recipes;

    return all_recipes.filter((resep) => {
      if (normalize(resep.naam).includes(normalized_search)) return true;
      for (const kategorie of resep.kategorieë ?? []) {
        if (normalize(kategorie).includes(normalized_search)) return true;
      }
      return false;
    });
  }
</script>

<PageHeader />

<section
  class="pt-4 px-4 mb-0 rounded-b-lg transition-shadow duration-300 border-b"
  class:shadow-[0_10px_10px_rgba(1,1,1,0.08)]={scrolled}
  class:border-b-alabaster-200={scrolled}
  class:border-b-transparent={!scrolled}
>
  <div class="relative">
    <Input bind:value={search_text} placeholder="Soek resepte..." />
  </div>

  {#if !is_loading}
    <div class="w-fit my-1 text-alabaster-600 font-extralight ml-auto">{recipes.length} resepte</div>
  {/if}
</section>

<div
  class="px-4 pt-4 overflow-y-auto flex flex-col gap-4 h-full pb-50 scrollbar-none"
  bind:this={listDiv}
  onscroll={handleScroll}
>
  {#each recipes as resep (resep.id)}
    <CardResep {resep} editable={is_logged_in} />
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
