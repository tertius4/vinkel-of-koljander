<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import Icon from "$lib/ui/comps/Icon.svelte";
  import Container from "$lib/ui/comps/layouts/Container.svelte";
  import Panel from "$lib/ui/comps/layouts/Panel.svelte";
  import { servingsLabel } from "$lib/recipe";
  import IngredientChecklist from "$lib/recipe/IngredientChecklist.svelte";
  import ServingsStepper from "$lib/recipe/ServingsStepper.svelte";

  const { data } = $props();

  function setServings(value: number) {
    const url = new URL(page.url);
    url.searchParams.set("porsies", String(value));
    goto(url, { replaceState: true, keepFocus: true, noScroll: true });
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

    <Panel class="p-4 mt-4 grid grid-cols-[1fr_auto_auto_auto_auto] items-center bg-white/80">
      <div class="space-y-1">
        <div class="label-sm uppercase tracking-wider text-primary-900 text-xs">Aantal porsies</div>
        <div class="text-primary headline-md font-bold">{servingsLabel(data.servings)}</div>
      </div>

      <ServingsStepper servings={data.servings} original_servings={data.original_servings} onchange={setServings} border="border-primary-200" />
    </Panel>

    <div class="flex items-center gap-2 mt-4 text-sm italic text-[#55433c]">
      <Icon name="sliders" size={16} class="shrink-0 text-primary-900" />
      <span>Hoeveelhede pas outomaties aan volgens jou gaste.</span>
    </div>
  </Container>

  <p class="text-center text-on-surface-variant" hidden={!!data.ingredients.length}>Geen bestanddele nie.</p>

  <div class="px-1" hidden={!data.ingredients.length}>
    <IngredientChecklist
      title={data.title}
      servings={data.servings}
      ingredients={data.ingredients}
      row_class="border-b-2 border-dashed border-neutral-100 last:border-b-0 py-3"
    />
  </div>
</main>
