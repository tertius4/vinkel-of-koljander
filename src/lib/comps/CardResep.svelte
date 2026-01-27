<script>
  /**
   * @typedef {Object} Props
   * @property {DB.Resep} resep - The recipe object to be displayed in the card.
   * @property {(r: DB.Resep) => void} onclick - Callback function to handle click events on the card.
   */

  /** @type {Props} */
  const { resep, onclick } = $props();
</script>

<button
  class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
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
  <div class="p-6">
    <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{resep.naam}</h3>

    {#if resep.beskrywing}
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">{resep.beskrywing}</p>
    {/if}

    <!-- Categories -->
    {#if resep.kategorieë && resep.kategorieë.length > 0}
      <div class="flex flex-wrap gap-2 mb-4">
        {#each resep.kategorieë as kategorie}
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
          >
            {kategorie}
          </span>
        {/each}
      </div>
    {/if}

    <!-- Time and Servings -->
    <div class="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
      <div class="flex items-center space-x-4">
        {#if resep.tyd?.werk > 0}
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{resep.tyd.werk}min werk</span>
          </div>
        {/if}
        {#if resep.tyd?.wag > 0}
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{resep.tyd.wag}min wag</span>
          </div>
        {/if}
      </div>
      {#if resep.porsies > 0}
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <span>{resep.porsies} porsies</span>
        </div>
      {/if}
    </div>
  </div>
</button>

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
