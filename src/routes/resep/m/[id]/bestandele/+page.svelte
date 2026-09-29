<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import Icon from "$lib/ui/comps/Icon.svelte";
  import Container from "$lib/ui/comps/layouts/Container.svelte";
  import Panel from "$lib/ui/comps/layouts/Panel.svelte";
  import { ingredientKey, servingsLabel } from "$lib/recipe";
  import ServingsStepper from "$lib/recipe/ServingsStepper.svelte";
  import Ingredient from "$lib/recipe/Ingredient.svelte";

  const { data } = $props();

  // Ticked ingredients are keyed by name and unit, so they stay ticked when a change in servings reloads the list.
  const ticked: Record<string, boolean> = $state({});

  const total = $derived(data.ingredients.length);
  const done = $derived(data.ingredients.filter((ingredient) => ticked[keyOf(ingredient)]).length);
  const percentage = $derived(total ? Math.round((done / total) * 100) : 0);

  function keyOf(ingredient: { title: string; unit: string }): string {
    return ingredientKey(ingredient.title, ingredient.unit);
  }

  function setServings(value: number) {
    const url = new URL(page.url);
    url.searchParams.set("porsies", String(value));
    goto(url, { replaceState: true, keepFocus: true, noScroll: true });
  }

  function setTicked(key: string, value: boolean) {
    ticked[key] = value;
  }
</script>

<main class="p-4 w-full bg-white grow overflow-y-auto">
  <Container class="p-5 mb-4">
    <div class="flex items-center justify-between gap-3">
      <h1 class="text-[28px] leading-tight tracking-tight font-semibold font-source-serif-4 text-primary-600">
        {data.title}
      </h1>
      <Icon name="fire-burner" size={32} class="text-primary shrink-0" />
    </div>

    <Panel class="p-4 mt-4 grid grid-cols-[1fr_auto_auto_auto] items-center bg-white/80">
      <div class="space-y-1">
        <div class="label-sm uppercase tracking-wider text-primary-900 text-xs">Aantal porsies</div>
        <div class="text-primary headline-md font-bold">{servingsLabel(data.servings)}</div>
      </div>

      <ServingsStepper servings={data.servings} onchange={setServings} border="border-primary-200" />
    </Panel>

    <div class="flex items-center gap-2 mt-4 text-sm italic text-[#55433c]">
      <Icon name="sliders" size={16} class="shrink-0 text-primary-900" />
      <span>Hoeveelhede pas outomaties aan volgens jou gaste.</span>
    </div>

    <div class="mt-4" hidden={!total}>
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
    </div>
  </Container>

  <p class="text-center text-on-surface-variant" hidden={!!total}>Geen bestanddele nie.</p>

  <div class="px-1">
    {#each data.ingredients as ingredient (keyOf(ingredient))}
      <Ingredient
        data={ingredient}
        checked={ticked[keyOf(ingredient)]}
        onchange={(value) => setTicked(keyOf(ingredient), value)}
        class="border-b-2 border-dashed border-neutral-100 last:border-b-0 py-3"
      />
    {/each}
  </div>
</main>
