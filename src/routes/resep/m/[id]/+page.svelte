<script lang="ts">
  import { page } from "$app/state";
  import Description from "$lib/ui/comps/display/Description.svelte";
  import Icon from "$lib/ui/comps/Icon.svelte";
  import ImageFullScreen from "$lib/ui/comps/media/ImageFullScreen.svelte";

  const { data } = $props();

  let current_step_index = $state(0);
  let wakeLock: WakeLockSentinel;

  const recipe = $derived(data.recipe);
  const current_step = $derived(recipe.steps[current_step_index]);

  function nextStep() {
    if (current_step_index < recipe.steps.length - 1) {
      current_step_index += 1;
    }
  }

  function prevStep() {
    if (current_step_index > 0) {
      current_step_index -= 1;
    }
  }

  function goToStep(index: number) {
    if (index >= 0 && index < recipe.steps.length) {
      current_step_index = index;
    }
  }

  async function startCookMode() {
    if ("wakeLock" in navigator) {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Cook Mode: Screen stay-on active");
      } catch (err) {
        console.error("Cook Mode failed:", err);
      }
    }
  }
</script>

<main class="p-4 w-full bg-white grow overflow-y-auto">
  <div class="relative">
    <ImageFullScreen src={recipe.image} alt={recipe.title} />
    <div class="absolute bottom-4 left-2 flex gap-1 flex-wrap pointer-events-none" tabindex="-1">
      {#each recipe.categories as category}
        <div class="bg-black/80 text-white px-2 py-1 rounded w-fit">{category}</div>
      {/each}
    </div>
  </div>

  <h1 class="my-4 text-[28px] leading-tight tracking-tight font-semibold font-source-serif-4 text-[#231a11]">
    {recipe.title}
  </h1>

  <p class="font-sans! text-[#55433c] leading-relaxed text-base sm:text-lg mb-4">
    <Description description={recipe.description} />
  </p>

  <div class="border-y grid grid-cols-[auto_1fr_auto] gap-2 py-2 mb-2 border-[#dbc1b8]">
    <div
      class="size-9 flex items-center justify-center rounded-lg bg-secondary-200 text-secondary-900 font-bold text-md"
    >
      {recipe.author.initials}
    </div>
    <div class="h-full flex flex-col justify-between">
      <div class="block text-[11px] uppercase tracking-wider text-[#88726b] font-semibold">Resep kom van:</div>
      <div class="font-semibold text-black text-sm">{recipe.author.name}</div>
    </div>
    <div class="rounded-lg bg-primary-50 h-full flex justify-center items-center px-2 border border-primary-200">
      <span class="text-md mr-1.5 leading-none">👍</span>
      <span class="font-bold text-[#231a11] text-md">{recipe.rating.thumbs_up}</span>
      <span class="text-[#88726b] text-sm ml-1 font-medium">duime</span>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-3 py-2 mb-4">
    <button
      class="w-full bg-primary-500 hover:bg-primary-600 text-white py-3.5 px-4 rounded-lg font-headline-md text-base flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99]"
      onclick={startCookMode}
    >
      <Icon name="circle-play" />
      <span class="">Begin Kook-modus</span>
    </button>

    <a
      class="w-full border-2 border-primary text-primary focus:bg-primary-500 focus:text-white py-3.5 px-4 rounded-lg font-headline-md text-base flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] text-center"
      href="{page.url.pathname}/bestandele"
    >
      <Icon name="drumstick-bite" />
      <span class="">Bekyk alle Bestandele</span>
    </a>
  </div>

  <div class="rounded-lg border border-primary-100 p-4 bg-primary-100">
    <div class="flex gap-2 items-center">
      <Icon name="kitchen-set" class="text-primary" />
      <h3 class="headline-md text-base text-primary-900 font-bold tracking-tight">Porsiegrootte &amp; Tye</h3>
    </div>
    <hr class="border-primary-100 my-4" />
    <div class="grid grid-cols-2 gap-4">
      <div class=" bg-white p-2 col-span-2 rounded-lg border border-neutral-100">
        <span class="label-sm uppercase tracking-wider text-primary-800 flex items-center"> Porsies </span>
      </div>

      <div class=" bg-white p-2 rounded-lg border border-neutral-100">
        <span class="label-sm uppercase tracking-wider text-primary-800 flex items-center">Voorbereiding</span>
      </div>

      <div class=" bg-white p-2 rounded-lg border border-neutral-100">
        <span class="label-sm uppercase tracking-wider text-primary-800 flex items-center">Kooktyd</span>
      </div>
    </div>
  </div>

  <div class="flex items-center justify-between flex-wrap gap-2 my-2">
    <h2 class="headline-lg text-primary text-2xl sm:text-3xl">Instruksies</h2>
  </div>
  <p class="text-neutral-900 text-sm mb-4">
    Volg elke fase noukeurig met die aangeduide bestanddele vir die volmaakte potjie.
  </p>
  <div class="bg-primary-100 border border-primary-100 rounded-lg p-2.5">
    <span>Stap {current_step_index + 1}: {current_step.title}</span>
    <div class="flex gap-2 overflow-x-auto">
      {#each recipe.steps as step, i}
        <button
          type="button"
          onclick={() => goToStep(i)}
          class={{
            "shrink-0 size-24 rounded-lg": true,
            "border border-primary-200 bg-white": current_step_index !== i,
            "bg-primary-600 text-white font-medium": current_step_index === i,
          }}
        >
          <div>Stap {i + 1}</div>
          <div>{step.title}</div>
        </button>
      {/each}
    </div>
  </div>

  <div>
    <div class="bg-primary-200 rounded-lg"></div>
    <div>
      <h3>Bestanddele vir hierdie stap:</h3>
      {#each current_step.ingredients as ingredient}
        <div>{ingredient.ingredient}</div>
      {/each}

      <div>
        {#each current_step.instructions as instruction}
          <div>{instruction.label}</div>
        {/each}
      </div>
    </div>
  </div>

  <div class="flex justify-between gap-4 mt-4">
    <button
      type="button"
      onclick={prevStep}
      class="flex gap-1 border border-primary text-primary items-center text-nowrap justify-center w-full px-4 py-2 rounded-lg"
    >
      <Icon name="arrow-left" />
      <span>Vorige Stap</span>
    </button>
    <button
      type="button"
      onclick={nextStep}
      class="flex gap-1 bg-primary items-center justify-center text-nowrap text-white w-full px-4 py-2 rounded-lg"
    >
      <span>Volgende Stap</span>
      <Icon name="arrow-right" />
    </button>
  </div>
</main>
