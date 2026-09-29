<script lang="ts">
  import { replaceState } from "$app/navigation";
  import { page } from "$app/state";
  import Button from "$lib/ui/comps/buttons/Button.svelte";
  import ButtonAnchor from "$lib/ui/comps/buttons/ButtonAnchor.svelte";
  import Description from "$lib/ui/comps/display/Description.svelte";
  import Icon from "$lib/ui/comps/Icon.svelte";
  import Callout from "$lib/ui/comps/layouts/Callout.svelte";
  import Container from "$lib/ui/comps/layouts/Container.svelte";
  import Panel from "$lib/ui/comps/layouts/Panel.svelte";
  import ImageFullScreen from "$lib/ui/comps/media/ImageFullScreen.svelte";
  import { scaleAmount } from ".";

  const { data } = $props();

  let wake_lock: WakeLockSentinel | null = null;
  let cook_mode = $state(false);

  const recipe = $derived(data.recipe);

  let current_step_index = $state(0);
  const step_buttons: HTMLButtonElement[] = $state([]);

  // The serving count lives in the URL (?porsies=) so it survives navigating to the ingredients page and back.
  const url_servings = Number(page.url.searchParams.get("porsies"));

  // svelte-ignore state_referenced_locally
  let servings = $state(Number.isInteger(url_servings) && url_servings > 0 ? url_servings : recipe.servings);

  const multiplier = $derived(servings / recipe.servings);
  const current_step = $derived(recipe.steps[current_step_index]);

  $effect(() => {
    step_buttons[current_step_index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });

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

  async function requestWakeLock() {
    if (!("wakeLock" in navigator)) return;
    try {
      wake_lock = await navigator.wakeLock.request("screen");
    } catch (err) {
      console.error("Cook Mode failed:", err);
    }
  }

  async function releaseWakeLock() {
    await wake_lock?.release();
    wake_lock = null;
  }

  async function toggleCookMode() {
    cook_mode = !cook_mode;
    if (cook_mode) await requestWakeLock();
    else await releaseWakeLock();
  }

  // The browser drops the wake lock when the tab is hidden, so request it again when the user comes back.
  $effect(() => {
    if (!cook_mode) return;

    function onVisibilityChange() {
      if (document.visibilityState === "visible") requestWakeLock();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  });

  function setServings(value: number) {
    if (value < 1) return;
    
    servings = value;
    const url = new URL(page.url);
    url.searchParams.set("porsies", String(value));
    replaceState(url, page.state);
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

  <h1 class="my-4 text-[28px] leading-tight tracking-tight font-semibold font-source-serif-4 text-primary">
    {recipe.title}
  </h1>

  <div class="font-sans! text-[#55433c] leading-relaxed text-base sm:text-lg mb-4">
    <Description description={recipe.description} />
  </div>

  <div class="border-y grid grid-cols-[auto_1fr_auto] gap-2 py-2 mb-2 border-[#dbc1b8]" hidden={!recipe.author.name}>
    <div
      class="size-9 flex items-center justify-center rounded-lg bg-secondary-200 text-secondary-900 font-bold text-md"
    >
      {recipe.author.initials}
    </div>
    <div class="h-full flex flex-col justify-between">
      <div class="block text-[11px] uppercase tracking-wider text-[#88726b] font-semibold">Resep kom van:</div>
      <div class="font-semibold text-black text-sm">{recipe.author.name}</div>
    </div>
    <Container class="h-full flex justify-center items-center px-2" hidden={recipe.rating.thumbs_up === 0}>
      <span class="text-md mr-1.5 leading-none">👍</span>
      <span class="font-bold text-[#231a11] text-md">{recipe.rating.thumbs_up}</span>
      <span class="text-[#88726b] text-sm ml-1 font-medium">duime</span>
    </Container>
  </div>

  <div class="grid grid-cols-1 gap-3 py-2 mb-4">
    <Button onclick={toggleCookMode} outline={cook_mode} aria-pressed={cook_mode}>
      <Icon name={cook_mode ? "xmark" : "circle-play"} />
      <span class="">{cook_mode ? "Stop Kook-modus" : "Begin Kook-modus"}</span>
    </Button>

    <ButtonAnchor href="{page.url.pathname}/bestandele?porsies={servings}" outline>
      <Icon name="drumstick-bite" />
      <span class="">Bekyk alle Bestandele</span>
    </ButtonAnchor>
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
          <div class="text-primary headline-md">{servings} Mense</div>
        </div>

        <button
          type="button"
          aria-label="Decrease servings"
          onclick={() => setServings(servings - 1)}
          class="size-9 rounded-xl border flex items-center justify-center my-auto border-primary-400 bg-white text-black outline-none focus:bg-primary-100 active:bg-primary-100"
        >
          <Icon name="minus" size={20} />
        </button>
        <div class="flex items-center justify-center mx-3">
          <span class="font-bold">{servings}</span>
        </div>
        <button
          type="button"
          aria-label="Increase servings"
          onclick={() => setServings(servings + 1)}
          class="size-9 rounded-xl border flex items-center justify-center my-auto border-primary-400 bg-white text-black outline-none focus:bg-primary-100 active:bg-primary-100"
        >
          <Icon name="plus" size={20} />
        </button>
      </Panel>

      <Panel class="p-3 space-y-2">
        <div class="flex gap-2 items-center">
          <Icon name="spoon" size={20} class="text-secondary-700" />
          <span class="label-sm uppercase tracking-wider flex items-center text-primary-900 font-normal!">Werkstyd</span
          >
        </div>
        <div class="headline-md text-center">{recipe.work_time} min</div>
      </Panel>

      <Panel class="p-3 space-y-2">
        <div class="flex gap-2 items-center">
          <Icon name="clock" size={20} class="text-secondary-700" />
          <span class="label-sm uppercase tracking-wider flex items-center text-primary-900 font-normal!">Wagtyd</span>
        </div>
        <div class="headline-md text-center">{recipe.wait_time} min</div>
      </Panel>
    </div>
  </Container>

  <div class="flex items-center justify-between flex-wrap gap-2 my-2">
    <h2 class="headline-lg text-primary text-2xl sm:text-3xl">Instruksies</h2>
  </div>
  <p class="text-neutral-950 text-sm mb-4">
    Volg elke fase noukeurig met die aangeduide bestanddele vir die beste resultaat.
  </p>
  <Container class="p-3 mb-4">
    <div class="flex gap-2 items-center font-semibold mb-3 px-1">
      <Icon name="flag" size={20} class="text-primary shrink-0" />
      <span class="text-primary">Stap {current_step_index + 1}: {current_step.title}</span>
    </div>
    <div class="flex gap-2 overflow-x-auto scrollbar-none">
      {#each recipe.steps as step, i}
        {@const is_current = current_step_index === i}
        <button
          type="button"
          bind:this={step_buttons[i]}
          title={step.title || "Stap " + (i + 1)}
          onclick={() => goToStep(i)}
          class={{
            "p-3 w-fit min-h-10 rounded-lg transition-colors duration-300": true,
            "border border-primary-200 bg-white": !is_current,
            "bg-primary-600 text-white font-medium": is_current,
          }}
        >
          <div class="text-nowrap uppercase {is_current ? 'text-white' : 'text-neutral-950'} font-bold tracking-wider">
            Stap {i + 1}
          </div>
          <div
            hidden={!step.title}
            class="overflow-hidden font-medium capitalize {is_current ? 'text-white' : 'text-neutral-950'}"
          >
            {step.title}
          </div>
        </button>
      {/each}
    </div>
  </Container>

  {#key current_step_index}
    <div>
      <Container class="rounded-b-none! bg-primary-100 p-3 grid grid-cols-[auto_1fr] gap-2">
        <div>
          <div
            class="rounded-xl bg-primary font-source-serif-4 size-9 flex items-center justify-center text-white text-lg font-semibold"
          >
            {current_step_index + 1}
          </div>
        </div>
        <div>
          <span class="block font-source-serif-4 headline-md font-semibold"
            >{current_step.title || "Stap " + (current_step_index + 1)}</span
          >
          <p hidden={!current_step.description} class="text-[#55433c]!">
            {current_step.description}
          </p>
        </div>
      </Container>

      <Container class="rounded-none! p-3 border-t-0" hidden={!current_step.ingredients.length}>
        <div class="flex gap-2 text-primary-600 uppercase tracking-wider items-center py-3">
          <Icon name="carrot" size={20} />
          <h3>Bestanddele vir hierdie stap</h3>
        </div>
        <div class="space-y-2">
          {#each current_step.ingredients as ingredient}
            <Panel class="p-4 font-semibold rounded-none">
              <div class="leading-[2.5]">
                {scaleAmount(ingredient.amount, multiplier)}
                {ingredient.unit} <span class="capitalize">{ingredient.ingredient}</span>
              </div>
              <Callout hidden={!ingredient.comment} icon="lightbulb" title="Wenk" body={ingredient.comment} />
            </Panel>
          {/each}
        </div>
      </Container>
      <Container
        class={{
          "rounded-t-none! p-4 border-t-0 space-y-4": true,
          "bg-primary-100": current_step.ingredients.length,
          "bg-primary-50": !current_step.ingredients.length,
        }}
      >
        {#each current_step.instructions as instruction, i}
          <div class="grid grid-cols-[auto_1fr] gap-2 items-center body-md">
            <div class="mb-auto">
              <div class="bg-primary-200 text-primary-600 px-2 py-0.5 rounded font-semibold">
                {current_step_index + 1}.{i + 1}
              </div>
            </div>
            <div class="text-black">{instruction.label}</div>
            <Callout
              class="col-start-2 bg-secondary/15!"
              hidden={!instruction.note}
              title="Nota"
              body={instruction.note}
              small
            />
          </div>
        {/each}
      </Container>
    </div>
  {/key}

  <div class="flex justify-between gap-4 mt-4">
    <Button outline onclick={prevStep} disabled={current_step_index === 0}>
      <Icon name="arrow-left" />
      <span>Vorige Stap</span>
    </Button>
    <Button onclick={nextStep} disabled={current_step_index === recipe.steps.length - 1}>
      <span>Volgende Stap</span>
      <Icon name="arrow-right" />
    </Button>
  </div>
</main>
