<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import ServingsStepper from "$lib/recipe/ServingsStepper.svelte";
  import Description from "$lib/ui/comps/display/Description.svelte";
  import Icon from "$lib/ui/comps/Icon.svelte";
  import Container from "$lib/ui/comps/layouts/Container.svelte";
  import Panel from "$lib/ui/comps/layouts/Panel.svelte";
  import ImageFullScreen from "$lib/ui/comps/media/ImageFullScreen.svelte";
  import IngredientChecklist from "./comps/IngredientChecklist.svelte";
  import StepAccordion from "./comps/StepAccordion.svelte";

  const { data } = $props();

  // The serving count lives in the url (?porsies=); changing it re-runs the loader, which rescales the amounts.
  function setServings(value: number) {
    const url = new URL(page.url);
    url.searchParams.set("porsies", String(value));
    goto(url, { replaceState: true, keepFocus: true, noScroll: true });
  }
</script>

<main class="p-4 lg:p-6 w-full bg-white grow overflow-y-auto">
  <div class="grid lg:grid-cols-[minmax(0,1000px)_400px] gap-6 items-start w-fit mx-auto">
    <section>
      <h2 class="headline-lg text-primary text-3xl mt-2">Instruksies</h2>
      <p class="text-neutral-950 text-sm mb-4">
        Volg elke fase noukeurig met die aangeduide bestanddele vir die beste resultaat.
      </p>
      <StepAccordion steps={data.recipe.steps} />
    </section>
    <aside class="lg:sticky lg:top-0 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto space-y-4">
      <div class="relative" hidden={!data.recipe.image}>
        <ImageFullScreen src={data.recipe.image} alt={data.recipe.title} />
        <div class="absolute bottom-4 left-2 flex gap-1 flex-wrap pointer-events-none" tabindex="-1">
          {#each data.recipe.categories as category}
            <div class="bg-black/80 text-white px-2 py-1 rounded w-fit">{category}</div>
          {/each}
        </div>
      </div>
      <div class="flex gap-1 flex-wrap" hidden={!!data.recipe.image}>
        {#each data.recipe.categories as category}
          <div class="bg-black/80 text-white px-2 py-1 rounded w-fit">{category}</div>
        {/each}
      </div>

      <h1 class="text-[32px] leading-tight tracking-tight font-semibold font-source-serif-4 text-primary">
        {data.recipe.title}
      </h1>

      <div class="font-sans! text-[#55433c] leading-relaxed text-base">
        <Description description={data.recipe.description} />
      </div>

      <div
        class="border-y grid grid-cols-[auto_1fr_auto] gap-2 py-2 border-[#dbc1b8]"
        hidden={!data.recipe.author.name}
      >
        <div
          class="size-9 flex items-center justify-center rounded-lg bg-secondary-200 text-secondary-900 font-bold text-md"
        >
          {data.recipe.author.initials}
        </div>
        <div class="h-full flex flex-col justify-between">
          <div class="block text-[11px] uppercase tracking-wider text-[#88726b] font-semibold">Resep kom van:</div>
          <div class="font-semibold text-black text-sm">{data.recipe.author.name}</div>
        </div>
        <Container class="h-full flex justify-center items-center px-2" hidden={data.recipe.rating.thumbs_up === 0}>
          <span class="text-md mr-1.5 leading-none">👍</span>
          <span class="font-bold text-[#231a11] text-md">{data.recipe.rating.thumbs_up}</span>
          <span class="text-[#88726b] text-sm ml-1 font-medium">duime</span>
        </Container>
      </div>

      <Container class="p-5">
        <div class="flex gap-2 items-center">
          <Icon name="kitchen-set" class="text-primary" />
          <h3 class="headline-md text-base text-primary-900 font-bold tracking-tight">Porsiegrootte &amp; Tye</h3>
        </div>
        <hr class="border-primary-100 my-4" />
        <div class="grid grid-cols-2 gap-4">
          <Panel class="p-3 col-span-2 grid grid-cols-[1fr_auto_auto_auto] gap-0">
            <div class="space-y-3">
              <div class="flex gap-2 items-center">
                <Icon name="user-group" size={20} class="text-secondary-700" />
                <span class="label-sm uppercase tracking-wider text-primary-900 flex items-center font-normal!">
                  Porsies
                </span>
              </div>
              <div class="text-primary headline-md">{data.servings_label}</div>
            </div>

            <ServingsStepper servings={data.servings} onchange={setServings} />
          </Panel>

          <Panel class="p-3 space-y-2">
            <div class="flex gap-2 items-center">
              <Icon name="spoon" size={20} class="text-secondary-700" />
              <span class="label-sm uppercase tracking-wider flex items-center text-primary-900 font-normal!">
                Werkstyd
              </span>
            </div>
            <div class="headline-md text-center">{data.recipe.work_time} min</div>
          </Panel>

          <Panel class="p-3 space-y-2">
            <div class="flex gap-2 items-center">
              <Icon name="clock" size={20} class="text-secondary-700" />
              <span class="label-sm uppercase tracking-wider flex items-center text-primary-900 font-normal!">
                Wagtyd
              </span>
            </div>
            <div class="headline-md text-center">{data.recipe.wait_time} min</div>
          </Panel>
        </div>
      </Container>

      <Container class="p-5" hidden={!data.ingredients.length}>
        <div class="flex gap-2 items-center mb-4">
          <Icon name="drumstick-bite" class="text-primary" />
          <h3 class="headline-md text-base text-primary-900 font-bold tracking-tight">Bestanddele</h3>
        </div>
        <IngredientChecklist ingredients={data.ingredients} />
      </Container>
    </aside>
  </div>
</main>
