<script>
  import DisplaySteps from "$lib/ui/DisplaySteps.svelte";
  import Icon from "$lib/ui/comps/Icon.svelte";
  import Image from "./Image.svelte";

  const { data } = $props();

  const recipe = $derived(data.recipe);
</script>

<div class="pt-4 overflow-y-auto flex flex-col gap-6 h-full pb-50 scrollbar-none">
  {#if !recipe}
    <p class="text-center text-gray-500">Laai resep...</p>
  {:else}
    <div class="flex items-start justify-between py-2">
      <h1 class="font-semibold capitalize text-center text-[32px] leading-none w-full">{recipe.naam}</h1>
    </div>

    <div class="flex-wrap flex gap-1.5">
      {#each recipe.kategorieë as kategorie}
        <span class="bg-secondary-100 text-secondary-950 font-sans text-[12px] px-3 py-1 rounded-full font-bold">
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
      <Image src={recipe?.foto} alt={recipe?.naam} />
    {/if}

    <div class="grid grid-cols-3 gap-5">
      <div class="p-2 flex flex-col md:flex-row items-center gap-2 bg-primary-50 border border-gray-300 rounded-lg">
        <div class="flex items-center gap-2">
          <Icon name="running-man" class="w-4 h-4 shrink-0" />
          <span>Werktyd:</span>
        </div>

        <div class="font-semibold">{recipe?.tyd?.werk} min</div>
      </div>

      <div class="p-2 flex flex-col md:flex-row items-center gap-2 bg-primary-50 border border-gray-300 rounded-lg">
        <div class="flex items-center gap-2">
          <Icon name="clock" class="w-4 h-4 shrink-0" />
          <span>Wagtyd:</span>
        </div>
        <div class="font-semibold">{recipe?.tyd.wag} min</div>
      </div>

      <div class="p-2 flex flex-col md:flex-row items-center gap-2 bg-primary-50 border border-gray-300 rounded-lg">
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
