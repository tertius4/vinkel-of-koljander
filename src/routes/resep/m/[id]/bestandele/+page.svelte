<script>
  import Ingredient from "./comps/Ingredient.svelte";

  const { data } = $props();
</script>

<div class="px-4">
  {#each data.ingredients as ingredient}
    <Ingredient data={ingredient} class="border-b-2 border-dashed border-neutral-200 last:border-b-0 py-2"/>
  {/each}
</div>
