<script lang="ts">
  import Api from "$lib/api";
  import { checkAuthToken } from "$lib/auth";
  import { Navigation } from "$lib/classes/Navigation.svelte";
  import Icon from "$lib/ui/comps/Icon.svelte";
  import List from "$lib/view/List.svelte";
  import { onMount } from "svelte";
  import CardRecipe from "./CardRecipe.svelte";
  import TextInput from "$lib/ui/comps/inputs/TextInput.svelte";
  import InputSearchRecipe from "./InputSearchRecipe.svelte";
  import { page } from "$app/state";

  const { data } = $props();

  let is_loading = $state(true);
  let cards: RecipeCardData[] = $state([]);

  onMount(() => loadCards());

  async function loadCards() {
    is_loading = true;
    const result = await Api.searchRecipes("Hello");
    if (!result.ok) return console.error(result.error);

    cards = result.value;
    is_loading = false;
  }
</script>

<div
  class="absolute bottom-4 md:bottom-6 right-4 md:right-6 bg-primary-600 hover:bg-primary-700 z-10 transition-colors rounded-lg"
>
  <a hidden={!data.is_logged_in} href="/skep">
    <div class="text-white flex items-center gap-1 p-4 shadow-lg">
      <Icon name="plus" size={20} />
      <span class="text-[20px] font-semibold tracking-wide">SKEP</span>
    </div>
  </a>
</div>

<div class="my-4">
  <InputSearchRecipe placeholder="Soek 'n Resep" />
</div>

<div class="flex flex-col h-full">
  {#if is_loading}
    <div class="text-black h-50 mx-auto flex flex-col items-center gap-2 animate-pulse">
      <Icon name="loading" class="animate-spin" />
      <span class="font-medium">Loading…</span>
    </div>
  {:else if cards.length === 0}
    <p class="text-center text-on-surface-variant col-span-full">Geen resultate gevind nie.</p>
  {:else}
    <div class="flex-1 min-h-0 w-full overflow-y-auto">
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {#each cards as card}
          <CardRecipe data={card} />
        {/each}
      </section>
    </div>
  {/if}
</div>
