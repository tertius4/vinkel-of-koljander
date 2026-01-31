<script>
  import { page } from "$app/state";
  import { Navigation } from "$lib/classes/Navigation.svelte";
  import PageHeader from "$lib/comps/PageHeader.svelte";
  import { DB } from "$lib/DB";
  import { onMount } from "svelte";

  /** @type {DB.Resep?} */
  let recipe = $state(null);

  onMount(async () => {
    recipe = await getRecipe();
  });

  async function getRecipe() {
    const url = new URL(page.url.origin + Navigation.current_page);
    const recipe_id = url.searchParams.get("recipe_id");
    if (!recipe_id) {
      Navigation.navigateTo("/");
      return null;
    }

    return await DB.Resep.read(recipe_id);
  }

  async function handleClose() {
    Navigation.navigateTo("/");
  }
</script>

<PageHeader>Resepinstruksies</PageHeader>

<div class="px-4 pt-4 overflow-y-auto flex flex-col gap-6 h-full pb-50 scrollbar-none">
  {#if !recipe}
    <p class="text-center text-gray-500">Laai resep...</p>
  {:else}
    <div>
      <div class="flex items-start justify-between py-2">
        <h1 class="font-black uppercase text-[32px]">{recipe.naam}</h1>
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

  <div class="text-center text-gray-700 whitespace-pre-line">
    {recipe?.beskrywing}
  </div>

  {#if recipe?.foto}
    <img src={recipe?.foto} alt={recipe?.naam} class="w-full h-64 object-cover rounded-lg shadow-md" />
  {/if}

  <div class="grid grid-cols-3 gap-5">
    <div class="flex flex-col md:flex-row items-center gap-2">
      <div class="flex items-center gap-2">
        <svg viewBox="0 0 576 512" class="w-4 h-4 shrink-0" fill="currentColor">
          <path
            d="M472 24a56 56 0 1 0 -112 0 56 56 0 1 0 112 0zM275.7 181c1.2-3 4.2-5 7.4-5l35.9 0-22.6 90.6c-8.3 33.2 11 67 43.7 76.8L436 372.2 386.8 483c-7.2 16.1 .1 35.1 16.2 42.2s35.1-.1 42.2-16.2l56.6-127.4c11.7-26.4-2.4-57.2-30.1-65.5l-75.4-22.6 20.7-70.4 10 17.1c11.5 19.7 32.5 31.8 55.3 31.8l61.6 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-61.6 0-32.8-56.3c-14.3-24.6-40.6-39.7-69.1-39.7l-97.3 0c-29.4 0-55.9 17.9-66.9 45.3l-21.9 54.9c-6.6 16.4 1.4 35 17.8 41.6s35-1.4 41.6-17.8L275.7 181zM263.8 388.6c-1.9 5.4-5.3 10.3-9.8 13.9l-82.4 67.9c-13.6 11.2-15.6 31.4-4.3 45s31.4 15.6 45 4.3l82.4-67.9c13.4-11 23.5-25.5 29.3-41.8l6.9-19.3-4.7-1.4c-20.4-6.1-37.9-17.6-51.2-32.4l-11.3 31.7zM24 95.8c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0zm32 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l64 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-64 0zM0 311.8c0 13.3 10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0c-13.3 0-24 10.7-24 24z"
          />
        </svg>
        <span>Werktyd:</span>
      </div>

      <div class="font-semibold">{recipe?.tyd?.werk} min</div>
    </div>

    <div class="flex flex-col md:flex-row items-center gap-2">
      <div class="flex items-center gap-2">
        <svg viewBox="0 0 576 512" class="w-4 h-4 shrink-0" fill="currentColor">
          <path
            d="M336 40c0-13.3 10.7-24 24-24l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0 0 32 72 0c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 160c0-35.3 28.7-64 64-64 0-17.7 14.3-32 32-32l96 0c17.7 0 32 14.3 32 32l168 0 0-32-32 0c-13.3 0-24-10.7-24-24zM528 272a112 112 0 1 0 -224 0 112 112 0 1 0 224 0zm-136-8l0-48c0-13.3 10.7-24 24-24s24 10.7 24 24l0 48c0 13.3-10.7 24-24 24s-24-10.7-24-24zM80.8 351.2A112 112 0 1 0 239.2 192.8 112 112 0 1 0 80.8 351.2zM182.6 215.4c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-33.9 33.9c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l33.9-33.9z"
          />
        </svg>
        <span>Wagtyd:</span>
      </div>
      <div class="font-semibold">{recipe?.tyd.wag} min</div>
    </div>

    <div class="flex flex-col md:flex-row items-center gap-2">
      <div class="flex items-center gap-2">
        <svg viewBox="0 0 512 512" class="w-4 h-4 shrink-0" fill="currentColor">
          <path
            d="M256 0a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm96 312c0 25-12.7 47-32 59.9l0 92.1c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-92.1C172.7 359 160 337 160 312l0-40c0-53 43-96 96-96s96 43 96 96l0 40zM96 32a56 56 0 1 1 0 112 56 56 0 1 1 0-112zm16 240l0 32c0 32.5 12.1 62.1 32 84.7l0 75.3c0 1.2 0 2.5 .1 3.7-8.5 7.6-19.7 12.3-32.1 12.3l-32 0c-26.5 0-48-21.5-48-48l0-56.6C12.9 364.4 0 343.7 0 320l0-32c0-53 43-96 96-96 12.7 0 24.8 2.5 35.9 6.9-12.6 21.4-19.9 46.4-19.9 73.1zM368 464l0-75.3c19.9-22.5 32-52.2 32-84.7l0-32c0-26.7-7.3-51.6-19.9-73.1 11.1-4.5 23.2-6.9 35.9-6.9 53 0 96 43 96 96l0 32c0 23.7-12.9 44.4-32 55.4l0 56.6c0 26.5-21.5 48-48 48l-32 0c-12.3 0-23.6-4.6-32.1-12.3 0-1.2 .1-2.5 .1-3.7zM416 32a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
          />
        </svg>
        <span>Porsies:</span>
      </div>
      <div class="font-semibold">{recipe?.porsies} mense</div>
    </div>
  </div>

  <div>
    <h2 class="font-bold text-xl mb-4">Instruksies</h2>
    <div class="flex flex-col gap-6">
      {#each recipe?.stappe as stap, index (stap.nommer)}
        <div>
          <h3 class="font-semibold text-lg mb-2">Stap {stap.nommer}</h3>
          <div class="font-medium mb-2">Bestanddele:</div>
          <ul class="list-disc list-inside mb-4">
            {#each stap.bestanddele as bestanddeel}
              <li>
                {bestanddeel.hoeveelheid}
                {bestanddeel.maatstaf}
                {bestanddeel.naam}
                {#if bestanddeel.note}
                  <div class="mt-1 text-sm text-alabaster-700 bg-alabaster-50 rounded px-3 py-2">
                    <strong>Nota:</strong>
                    {bestanddeel.note}
                  </div>
                {/if}
              </li>
            {/each}
          </ul>
          <div class="font-medium mb-2">Instruksies:</div>
          {#each stap.instruksies as instruksie}
            <div class="mb-2">
              <div class="whitespace-pre-line text-alabaster-700">
                {instruksie.label}
              </div>
              {#if instruksie.note}
                <div class="mt-1 text-sm text-alabaster-700 bg-alabaster-50 rounded px-3 py-2">
                  <strong>Nota:</strong>
                  {instruksie.note}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>
