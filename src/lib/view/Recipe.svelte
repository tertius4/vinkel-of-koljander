<script>
  import { page } from "$app/state";
  import { Navigation } from "$lib/classes/Navigation.svelte";
  import DisplaySteps from "$lib/comps/DisplaySteps.svelte";
  import Icon from "$lib/comps/Icon.svelte";
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

<div class="px-4 pt-4 overflow-y-auto flex flex-col gap-6 h-full pb-50 scrollbar-none">
  {#if !recipe}
    <p class="text-center text-gray-500">Laai resep...</p>
  {:else}
    <div class="flex items-start justify-between py-2">
      <h1 class="font-semibold capitalize text-center text-[32px] leading-none w-full">{recipe.naam}</h1>
    </div>

    <div class="flex-wrap flex gap-1.5">
      {#each recipe.kategorieë as kategorie}
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-lg font-medium bg-orange-100 text-orange-800 border border-orange-400"
        >
          {kategorie}
        </span>
      {/each}
    </div>

    {#if recipe?.beskrywing}
      <div class="text-center text-gray-700 whitespace-pre-line italic">
        "{recipe?.beskrywing}"
      </div>
    {/if}

    {#if recipe?.foto}
      <img src={recipe?.foto} alt={recipe?.naam} class="w-full h-64 object-cover rounded-lg shadow-md" />
    {/if}

    <div class="grid grid-cols-3 gap-5">
      <div class="flex flex-col md:flex-row items-center gap-2">
        <div class="flex items-center gap-2">
          <Icon name="running-man" class="w-4 h-4 shrink-0" />
          <span>Werktyd:</span>
        </div>

        <div class="font-semibold">{recipe?.tyd?.werk} min</div>
      </div>

      <div class="flex flex-col md:flex-row items-center gap-2">
        <div class="flex items-center gap-2">
          <Icon name="clock" class="w-4 h-4 shrink-0" />
          <span>Wagtyd:</span>
        </div>
        <div class="font-semibold">{recipe?.tyd.wag} min</div>
      </div>

      <div class="flex flex-col md:flex-row items-center gap-2">
        <div class="flex items-center gap-2">
          <Icon name="people" class="w-4 h-4 shrink-0" />
          <span>Porsies:</span>
        </div>
        <div class="font-semibold">{recipe?.porsies} mense</div>
      </div>
    </div>

    <div>
      <h2 class="font-bold text-xl mb-4">Instruksies</h2>
      <DisplaySteps steps={recipe.stappe} />
    </div>
  {/if}
</div>
