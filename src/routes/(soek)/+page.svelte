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

<!-- <a
  hidden={!data.is_logged_in}
  href="/skep"
  class="block text-center bg-rust-500 hover:bg-rust-600 text-white font-medium py-2 px-4 rounded-b-lg transition-colors mb-6"
>
  Skep Resep
</a> -->

<div class="my-4">
  <InputSearchRecipe placeholder="Soek 'n Resep" />
</div>

<div class="flex flex-col h-full">
  {#if is_loading}
    <Icon name="loading" class="animate-spin text-primary mx-auto col-span-full" />
  {:else if cards.length === 0}
    <p class="text-center text-on-surface-variant col-span-full">Geen resultate gevind nie.</p>
  {:else}
    <div class="flex-1 min-h-0 w-full overflow-y-auto">
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {#each cards as card}
          <CardRecipe data={card} />
          <CardRecipe data={card} />
          <CardRecipe data={card} />
        {/each}
      </section>
    </div>
  {/if}
</div>
