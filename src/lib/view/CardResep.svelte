<script>
  import Icon from "$lib/ui/comps/Icon.svelte";
  import { slide } from "svelte/transition";

  /**
   * @typedef {Object} Props
   * @property {DB.Resep} resep - The recipe object to be displayed in the card.
   * @property {boolean} [editable=false] - Indicates if the card is in editable mode.
   */

  /** @type {Props} */
  const { resep, editable = false } = $props();

  const MAX_KATEGORIEË = 3;

  const kategorieë = $derived(resep.kategorieë ?? []);
  const sigbaar = $derived(kategorieë.slice(0, MAX_KATEGORIEË));
  const oorblywend = $derived(kategorieë.length - sigbaar.length);

  const werk = $derived(resep.tyd?.werk ?? 0);
  const wag = $derived(resep.tyd?.wag ?? 0);
  const porsies = $derived(resep.porsies ?? 0);
  const hetMeta = $derived(werk > 0 || wag > 0 || porsies > 0);
</script>

{#snippet chips(/** @type {string[]} */ items, /** @type {number} */ extra)}
  {#each items as kategorie (kategorie)}
    <span
      class="inline-flex items-center rounded-full border border-rust-300 bg-rust-100 px-3 py-0.5 text-xs font-medium text-rust-800"
    >
      {kategorie}
    </span>
  {/each}
  {#if extra > 0}
    <span
      class="inline-flex items-center rounded-full border border-rust-300 bg-rust-100 px-2 py-0.5 text-xs font-medium text-rust-800"
    >
      +{extra}
    </span>
  {/if}
{/snippet}

<article class="group relative h-full" transition:slide>
  {#if editable}
    <a
      class="absolute top-3 right-3 z-10 cursor-pointer rounded-full bg-white p-2 shadow transition hover:shadow-md focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-rust-500 focus-visible:outline-none md:opacity-0 md:group-hover:opacity-100"
      href="/wysig/{resep.id}"
      title="Wysig resep"
      aria-label="Wysig resep"
    >
      <Icon name="edit" size={20} class="text-primary-500!" />
    </a>
  {/if}

  <a
    href="/resep/{resep.id}"
    class="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-alabaster-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-rust-500 focus-visible:outline-none motion-reduce:transform-none motion-reduce:transition-none"
  >
    <!-- Recipe Image -->
    {#if resep.foto}
      <div class="relative aspect-4/3 overflow-hidden">
        <img
          src={resep.foto}
          alt={resep.naam}
          loading="lazy"
          decoding="async"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
        />
        <div class="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>

        {#if sigbaar.length > 0}
          <div class="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5">
            {@render chips(sigbaar, oorblywend)}
          </div>
        {/if}
      </div>
    {/if}

    <!-- Recipe Info -->
    <div class="flex flex-1 flex-col p-4 md:p-5">
      <h3
        class="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-rust-700 md:text-xl"
      >
        {resep.naam}
      </h3>

      {#if resep.beskrywing}
        <p class="mb-4 line-clamp-3 text-left text-sm text-gray-600">{resep.beskrywing}</p>
      {/if}

      <!-- Categories (when there is no image to overlay them on) -->
      {#if !resep.foto && sigbaar.length > 0}
        <div class="mb-4 flex flex-wrap gap-1.5">
          {@render chips(sigbaar, oorblywend)}
        </div>
      {/if}

      <!-- Time and Servings -->
      {#if hetMeta}
        <div class="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-gray-100 pt-3 text-sm text-gray-500">
          {#if werk > 0}
            <div class="flex items-center">
              <Icon name="running-man" class="mr-1 h-4 w-4 shrink-0 text-rust-500" />
              <span>{werk} min werk</span>
            </div>
          {/if}

          {#if wag > 0}
            <div class="flex items-center">
              <Icon name="clock" class="mr-1 h-4 w-4 shrink-0 text-rust-500" />
              <span>{wag} min wag</span>
            </div>
          {/if}

          {#if porsies > 0}
            <div class="flex items-center sm:ml-auto">
              <Icon name="people" class="mr-1 h-4 w-4 shrink-0 text-rust-500" />
              <span>{porsies} porsies</span>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </a>
</article>
