<script>
  import { slide } from "svelte/transition";
  import Icon from "./Icon.svelte";

  /**
   * @typedef {Object} Props
   * @property {DB.Resep} resep - The recipe object to be displayed in the card.
   * @property {boolean} [editable=false] - Indicates if the card is in editable mode.
   * @property {(r: DB.Resep) => void} onclick - Callback function to handle click events on the card.
   */

  /** @type {Props} */
  const { resep, editable, onclick } = $props();
</script>

<div class="relative">
  {#if editable}
    <div
      class="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:shadow-md transition-shadow cursor-pointer z-50"
      title="Wysig resep"
    >
      <svg class="w-6 h-6 text-rust-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        ></path>
      </svg>
    </div>
  {/if}
  <button
    transition:slide
    class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-alabaster-100 w-full"
    type="button"
    onclick={() => onclick(resep)}
  >
    <!-- Recipe Image -->
    {#if resep.foto}
      <div class="relative h-48 overflow-hidden">
        <img
          src={resep.foto}
          alt={resep.naam}
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
      </div>
    {/if}

    <!-- Recipe Info -->
    <div class="p-4 md:p-6">
      <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{resep.naam}</h3>

      {#if resep.beskrywing}
        <p class="text-gray-600 text-left text-sm mb-4 line-clamp-3">{resep.beskrywing}</p>
      {/if}

      <!-- Categories -->
      {#if resep.kategorieë && resep.kategorieë.length > 0}
        <div class="flex flex-wrap gap-2 mb-4">
          {#each resep.kategorieë as kategorie}
            <span
              class="inline-flex items-center px-4 py-1 rounded text-xs font-medium bg-rust-100 text-rust-800 border border-rust-300"
            >
              {kategorie}
            </span>
          {/each}
        </div>
      {/if}

      <!-- Time and Servings -->
      <div
        class="grid grid-cols-3 md:grid-cols-[min-content_auto_min-content] gap-4 items-center text-sm text-gray-500 border-t border-gray-100 pt-4"
      >
        {#if resep.tyd?.werk > 0}
          <div class="flex items-center text-nowrap">
            <Icon name="running-man" class="w-4 h-4 mr-1 shrink-0" />
            <span>{resep.tyd.werk} min werk</span>
          </div>
        {/if}

        {#if resep.tyd?.wag > 0}
          <div class="flex items-center text-nowrap mx-auto md:mx-0">
            <Icon name="clock" class="w-4 h-4 mr-1 shrink-0" />
            <span>{resep.tyd.wag} min wag</span>
          </div>
        {/if}

        {#if resep.porsies > 0}
          <div class="flex items-center text-nowrap ml-auto md:ml-0">
            <Icon name="people" class="w-4 h-4 mr-1 shrink-0" />
            <span>{resep.porsies} porsies</span>
          </div>
        {/if}
      </div>
    </div>
  </button>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
