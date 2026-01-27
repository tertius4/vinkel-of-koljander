<script>
  /**
   * @typedef {Object} Props
   * @property {DB.Resep | null} recipe - The recipe to display.
   * @property {() => void} onclose - Callback function to handle closing the recipe view.
   */

  /** @type {Props} */
  const { recipe, onclose } = $props();
</script>

{#if recipe}
  <div class="p-4 w-screen h-screen inset-0 fixed z-50 bg-white">
    <div class="flex items-start justify-between">
      <h1 class="font-black uppercase text-[32px]">{recipe.naam}</h1>

      <button class="p-2" type="button" aria-label="Sluit resep" onclick={onclose}>
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
