<script lang="ts">
  import { ingredientKey } from "$lib/recipe";
  import Ingredient from "$lib/recipe/Ingredient.svelte";

  interface Props {
    ingredients: { title: string; amount: string; unit: string; comments: string[] }[];
  }

  const { ingredients }: Props = $props();

  // Ticked ingredients are keyed by name and unit, so they stay ticked when a change in servings reloads the list.
  const ticked: Record<string, boolean> = $state({});

  const total = $derived(ingredients.length);
  const done = $derived(ingredients.filter((ingredient) => ticked[keyOf(ingredient)]).length);
  const percentage = $derived(total ? Math.round((done / total) * 100) : 0);

  function keyOf(ingredient: { title: string; unit: string }) {
    return ingredientKey(ingredient.title, ingredient.unit);
  }
</script>

<div class="flex justify-between text-sm font-semibold">
  <span>{done} van {total} bestanddele afgemerk</span>
  <span class="text-primary font-bold">{percentage}%</span>
</div>
<div
  class="mt-2 h-2 rounded-full bg-primary-100 overflow-hidden"
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={percentage}
>
  <div class="h-full rounded-full bg-primary transition-all duration-300" style:width="{percentage}%"></div>
</div>

<div class="mt-2">
  {#each ingredients as ingredient (keyOf(ingredient))}
    <Ingredient
      data={ingredient}
      checked={ticked[keyOf(ingredient)]}
      onchange={(value) => (ticked[keyOf(ingredient)] = value)}
      class="border-b-2 border-dashed border-neutral-200 last:border-b-0 py-3"
    />
  {/each}
</div>
