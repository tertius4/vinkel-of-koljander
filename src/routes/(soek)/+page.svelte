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
  import { debounce } from "$lib";
  import { goto, onNavigate } from "$app/navigation";
  import { fade } from "svelte/transition";

  const { data } = $props();

  let is_loading = $state(true);
  let cards: RecipeCardData[] = $state([]);

  // svelte-ignore state_referenced_locally
  let search = $state(data.search);

  const debouncedSearch = debounce(loadCards, 300);

  onMount(() => loadCards(search));

  async function loadCards(search: string) {
    is_loading = true;
    const result = await Api.searchRecipes(search);
    if (!result.ok) {
      is_loading = false;
      return console.error(result.error);
    }

    if (!search) {
      await goto("/", { replaceState: true, keepFocus: true, noScroll: true });
    } else {
      await goto(`?search=${encodeURIComponent(search)}`, { replaceState: true, keepFocus: true, noScroll: true });
    }

    cards = result.value;
    is_loading = false;
  }

  function handleSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    search = input.value;
    debouncedSearch(search);
  }
</script>

<div
  class="absolute bottom-4 md:bottom-6 right-4 md:right-6 bg-primary-600 hover:bg-primary-700 z-11 transition-colors rounded-lg"
>
  <a hidden={!data.is_logged_in} href="/skep">
    <div class="text-white flex items-center gap-1 p-4 shadow-lg">
      <Icon name="plus" size={20} />
      <span class="text-[20px] font-semibold tracking-wide">SKEP</span>
    </div>
  </a>
</div>

{#if is_loading}
  <div transition:fade class="fixed inset-0 w-dvw h-dvh bg-black/20 text-black z-12">
    <div class="flex flex-col items-center gap-2 justify-center w-full h-full animate-pulse">
      <Icon name="loading" class="animate-spin" size={28} />
      <span class="font-medium text-lg font-sans">Loading…</span>
    </div>
  </div>
{/if}

<div class="h-full min-h-0 flex flex-col">
  <div class="my-4 shrink-0">
    <!-- TODO: Add Prop - clearable → provides an × to clear input -->
    <!-- TODO: Use InputText component. -->
    <InputSearchRecipe placeholder="Soek 'n Resep" bind:value={search} oninput={handleSearchInput} />
  </div>

  <div class="flex-1 min-h-0 flex flex-col">
    {#if !is_loading && cards.length === 0}
      <p class="text-center text-on-surface-variant col-span-full">Geen resultate gevind nie.</p>
    {:else}
      <div tabindex="-1" class="flex-1 min-h-0 w-full overflow-y-auto">
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pb-4">
          {#each cards as card}
            <CardRecipe data={card} onclick={() => (is_loading = true)} />
          {/each}
        </section>
      </div>
    {/if}
  </div>
</div>
