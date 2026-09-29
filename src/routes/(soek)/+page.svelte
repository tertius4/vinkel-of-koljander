<script lang="ts">
  import { debounce } from "$lib";
  import { goto } from "$app/navigation";
  import { navigating } from "$app/state";
  import Icon from "$lib/ui/comps/Icon.svelte";
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import CardRecipe from "./CardRecipe.svelte";
  import InputSearchRecipe from "./InputSearchRecipe.svelte";
  import { page } from "$app/state";
  import Api from "$lib/api";
  import { flip } from "svelte/animate";

  const { data } = $props();

  // svelte-ignore state_referenced_locally
  let search = $state(data.search);
  // svelte-ignore state_referenced_locally
  let categories = $state<string[]>(data.categories);
  let cards: RecipeCardData[] = $state([]);
  let error_message = $state("");
  let is_opening_recipe = $state(false);
  let is_loading = $state(true);

  const is_navigating = $derived(navigating.to !== null || is_opening_recipe);

  // Keep the input in sync with the URL (e.g. back/forward navigation).
  $effect(() => {
    search = data.search;
    categories = data.categories;
  });

  const updateUrl = debounce(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    for (const c of categories) params.append("categories", c);
    const query = params.toString();
    const href = query ? `?${query}` : "/";
    goto(href, { replaceState: true, keepFocus: true, noScroll: true });
    loadCards();
  }, 300);

  async function loadCards() {
    error_message = "";
    is_loading = true;
    const cards_result = await Api.searchRecipes(search, categories, !!page.data.is_logged_in);
    is_loading = false;
    if (!cards_result.ok) {
      console.error("Failed to load cards");
      error_message = "Kon nie resepte laai nie.";
      cards = [];
      return;
    }

    cards = cards_result.value;
  }

  function handleSearchInput(event: Event) {
    search = (event.target as HTMLInputElement).value;
    updateUrl();
  }

  function clearSearch() {
    search = "";
    categories = [];
    updateUrl();
  }

  // Drafts are only listed while logged in, so reload when signing in or out.
  let last_logged_in = page.data.is_logged_in;
  $effect(() => {
    const is_logged_in = page.data.is_logged_in;
    if (is_logged_in === last_logged_in) return;
    last_logged_in = is_logged_in;
    loadCards();
  });

  onMount(() => loadCards());
  onDestroy(() => (is_opening_recipe = false));
</script>

{#if is_navigating}
  <div
    transition:fade
    class="fixed inset-0 w-dvw h-dvh bg-black/20 text-black z-12 pointer-events-none"
    role="status"
    aria-live="polite"
  >
    <div class="flex flex-col items-center gap-2 justify-center w-full h-full animate-pulse">
      <Icon name="loading" class="animate-spin" size={28} />
      <span class="font-medium text-lg font-sans">Laai…</span>
    </div>
  </div>
{/if}

<div class="h-full min-h-0 flex flex-col px-4">
  <div class="my-4 shrink-0">
    <InputSearchRecipe
      placeholder="Soek 'n Resep"
      bind:value={search}
      bind:selected_categories={categories}
      onchange_categories={updateUrl}
      oninput={handleSearchInput}
      onclear={clearSearch}
    />
  </div>

  <div class="flex-1 min-h-0 flex flex-col">
    {#if !!error_message}
      <p class="text-center text-error" role="alert">{error_message}</p>
    {:else if is_loading && cards.length === 0}
      <div class="flex flex-col items-center gap-2 py-8 text-on-surface-variant" role="status" aria-live="polite">
        <Icon name="loading" class="animate-spin" size={28} />
        <span>Laai resepte…</span>
      </div>
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
    href="/create"
    class="absolute bottom-4 md:bottom-6 right-4 md:right-6 bg-primary-600 hover:bg-primary-700 z-11 transition-colors rounded-lg text-white flex items-center gap-1 p-4 shadow-lg"
  >
    <Icon name="plus" size={20} />
    <span class="text-[20px] font-semibold tracking-wide">SKEP</span>
  </a>
{/if}
