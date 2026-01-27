<script>
  import CardResep from "$lib/comps/CardResep.svelte";
  import Recipe from "$lib/view/Recipe.svelte";

  const { data } = $props();
  /** @type {DB.Resep?} */
  let selected_recipe = $state(null);
</script>

<div class="w-full flex justify-center">
  <h1 class="text-4xl font-bold leading-30">Vinkel of Koljander</h1>
</div>

<div class="flex flex-col gap-6">
  {#each data.resepte as resep}
    <CardResep {resep} onclick={() => (selected_recipe = resep)} />
  {/each}
</div>

<Recipe recipe={selected_recipe} onclose={() => (selected_recipe = null)} />
