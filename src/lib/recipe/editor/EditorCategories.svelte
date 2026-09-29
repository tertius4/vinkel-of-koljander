<script lang="ts">
  import { FOOD_CATEGORIES, normalise } from "$lib";
  import Icon from "$lib/ui/comps/Icon.svelte";
  import Container from "$lib/ui/comps/layouts/Container.svelte";
  import CategoryPill from "$lib/ui/CategoryPill.svelte";
  import { INPUT_CLASS } from "./styles";

  let { recipe = $bindable() }: { recipe: DB.Resep } = $props();

  let custom = $state("");

  const selected = $derived(new Set(recipe.kategorieë.map((c) => normalise(c))));
  const custom_categories = $derived(
    recipe.kategorieë
      .filter((c) => !FOOD_CATEGORIES.some((cat) => normalise(cat.label) === normalise(c)))
      .map((label) => ({ label })),
  );

  function toggle(label: string) {
    if (selected.has(normalise(label))) {
      recipe.kategorieë = recipe.kategorieë.filter((c) => normalise(c) !== normalise(label));
    } else {
      recipe.kategorieë = [...recipe.kategorieë, label].sort();
    }
  }

  function addCustom() {
    const label = custom.trim();
    custom = "";
    if (label && !selected.has(normalise(label))) recipe.kategorieë = [...recipe.kategorieë, label].sort();
  }
</script>

<Container class="p-5">
  <div class="flex gap-2 items-center">
    <Icon name="categories" class="text-primary" />
    <h3 class="headline-md text-base text-primary-900 font-bold tracking-tight">Kategorieë</h3>
  </div>
  <hr class="border-primary-100 my-4" />

  <div class="flex flex-wrap gap-2 mb-4">
    {#each [...FOOD_CATEGORIES, ...custom_categories] as category (category.label)}
      <CategoryPill
        label={category.label}
        is_selected={selected.has(normalise(category.label))}
        onclick={() => toggle(category.label)}
      />
    {/each}
  </div>

  <form
    class="flex gap-2"
    onsubmit={(e) => {
      e.preventDefault();
      addCustom();
    }}
  >
    <input bind:value={custom} placeholder="Voeg jou eie kategorie by…" aria-label="Eie kategorie" class={INPUT_CLASS} />
    <button
      type="submit"
      aria-label="Voeg kategorie by"
      class="size-11 shrink-0 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-600 focus:bg-primary-600 outline-none transition-colors"
    >
      <Icon name="plus" size={20} />
    </button>
  </form>
</Container>
