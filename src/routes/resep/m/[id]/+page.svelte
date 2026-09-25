<script>
  import ImageFullScreen from "$lib/ui/comps/media/ImageFullScreen.svelte";

  const { data } = $props();
  const recipe = $derived(data.recipe);
</script>

<main class="p-4 w-full bg-white grow">
  <ImageFullScreen src={recipe.image} alt={recipe.title} />

  <h1 class="my-4 text-[28px] leading-tight tracking-tight font-semibold font-source-serif-4 text-[#231a11]">
    {recipe.title}
  </h1>

  <p class="font-body-lg text-on-surface-variant leading-relaxed text-base sm:text-lg mb-4">{recipe.description}</p>

  <div class="border-y grid grid-cols-[auto_1fr_auto]">
    <div>OB</div>
    <div>
      <div>Resep kom van:</div>
      <div>Ouma Bettie</div>
    </div>
    <div>4.9 (98)</div>
  </div>

  <div class="">
    <button class="bg-primary text-black w-full px-4 py-2 rounded">Begin Kook-modus</button>
    <button class="bg-secondary text-black w-full px-4 py-2 rounded">Bekyk volle bestandele lys</button>
  </div>
</main>
