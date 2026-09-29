<script lang="ts">
  import { debounce } from "$lib";
  import { goto } from "$app/navigation";
  import { navigating } from "$app/state";
  import Icon from "$lib/ui/comps/Icon.svelte";
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import CardRecipe from "./CardRecipe.svelte";
  import InputSearchRecipe from "./InputSearchRecipe.svelte";
  import Api from "$lib/api";
  import { flip } from "svelte/animate";

  const { data } = $props();

  // svelte-ignore state_referenced_locally
  let search = $state(data.search);
  let cards: RecipeCardData[] = $state([]);
  let error_message = $state("");
  let is_opening_recipe = $state(false);

  const is_loading = $derived(navigating.to !== null || is_opening_recipe);

  // Keep the input in sync with the URL (e.g. back/forward navigation).
  $effect(() => {
    search = data.search;
  });

  const updateUrl = debounce((value: string) => {
    const href = value ? `?search=${encodeURIComponent(value)}` : "/";
    goto(href, { replaceState: true, keepFocus: true, noScroll: true });
    loadCards();
  }, 300);

  async function loadCards() {
    error_message = "";
    const cards_result = await Api.searchRecipes(search);
    if (!cards_result.ok) {
      console.error("Failed to load cards");
      error_message = "Failed to load cards";
      cards = [];
      return;
    }

    cards = cards_result.value;
  }

  function handleSearchInput(event: Event) {
    search = (event.target as HTMLInputElement).value;
    updateUrl(search);
  }

  function clearSearch() {
    search = "";
    updateUrl(search);
  }

  onMount(() => loadCards());
  onDestroy(() => (is_opening_recipe = false));
</script>

{#if is_loading}
  <div
    transition:fade
    class="fixed inset-0 w-dvw h-dvh bg-black/20 text-black z-12 pointer-events-none"
    role="status"
    aria-live="polite"
  >
    <div class="flex flex-col items-center gap-2 justify-center w-full h-full animate-pulse">
      <Icon name="loading" class="animate-spin" size={28} />
      <span class="font-medium text-lg font-sans">Loading…</span>
    </div>
  </div>
{/if}

<div class="h-full min-h-0 flex flex-col px-4">
  <div class="my-4 shrink-0">
    <InputSearchRecipe
      placeholder="Soek 'n Resep"
      bind:value={search}
      oninput={handleSearchInput}
      onclear={clearSearch}
    />
  </div>

  <div class="flex-1 min-h-0 flex flex-col">
    {#if !!error_message}
      <p class="text-center text-error" role="alert">{error_message}</p>
    {:else if cards.length === 0}
      <p class="text-center text-on-surface-variant">Geen resultate gevind nie.</p>
    {:else}
      <div tabindex="-1" class="flex-1 min-h-0 w-full overflow-y-auto">
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pb-4">
          {#each cards as card (card.id)}
            <div animate:flip={{ duration: 200 }}>
              {#key card.id}
                <CardRecipe data={card} onclick={() => (is_opening_recipe = true)} />
              {/key}
            </div>
          {/each}
        </section>
      </div>
    {/if}
  </div>
</div>

{#if data.is_logged_in}
  <a
    href="/skep"
    class="absolute bottom-4 md:bottom-6 right-4 md:right-6 bg-primary-600 hover:bg-primary-700 z-11 transition-colors rounded-lg text-white flex items-center gap-1 p-4 shadow-lg"
  >
    <Icon name="plus" size={20} />
    <span class="text-[20px] font-semibold tracking-wide">SKEP</span>
  </a>
{/if}
