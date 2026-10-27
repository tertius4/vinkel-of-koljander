<script lang="ts">
  import { navigating, page } from "$app/state";
  import Icon from "$lib/ui/comps/Icon.svelte";

  interface Props {
    data: RecipeCardData;
  }

  const { data }: Props = $props();

  // Also true for the follow-up redirect to /resep/m/[id] on phones, since the id stays the same.
  const is_opening = $derived(navigating.to?.params?.id === data.id);
</script>

<article
  class={[
    "bg-white rounded-xl h-full overflow-hidden border border-neutral-100 flex flex-col relative group hover:shadow-md hover:shadow-secondary/5 transition-shadow duration-300",
    !data.published && "shadow-md border-secondary",
    is_opening && "ring-2 ring-primary",
  ]}
  aria-busy={is_opening}
>
  {#if is_opening}
    <div class="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-white/70 backdrop-blur-[1px]">
      <Icon name="loading" size={36} class="animate-spin text-primary" />
      <span class="font-semibold text-primary">Laai resep…</span>
    </div>
  {/if}
  {#if page.data.is_logged_in}
    <a
      href="/wysig/{data.id}"
      aria-label="Wysig {data.title}"
      class="absolute top-4 right-4 bg-neutral-800/90 p-2 z-10 rounded-xl text-white hover:text-primary-500 transition-colors shadow-sm"
    >
      <Icon name="edit" class="text-white" />
    </a>
  {/if}
  {#if !data.published}
    <span
      class="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-lg bg-secondary-200 border border-secondary text-secondary-950 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm"
    >
      <Icon name="edit" size={14} />
      Konsep
    </span>
  {/if}
  <a href="/resep/{data.id}" class="flex flex-col grow">
    <div
      class={[
        "h-56 overflow-hidden bg-surface-container-low flex items-center justify-center",
        !data.published && "opacity-60",
      ]}
    >
      {#if data.cover_image}
        <img
          alt={data.cover_image.alt}
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={data.cover_image.src}
          loading="lazy"
        />
      {:else}
        <div class="w-full h-full bg-neutral-100 flex items-center justify-center">
          <Icon name="camera" class="text-neutral-400 text-[48px]" />
        </div>
      {/if}
    </div>
    <div class="p-4 grow flex flex-col justify-between">
      <div>
        <h2 class="font-source-serif-4 headline-md text-primary-700 mb-4">{data.title}</h2>
        <div class="flex flex-wrap gap-2 mb-4">
          {#each data.tags as tag}
            <span
              class="bg-secondary-100 text-secondary-700 font-sans text-[12px] px-3 py-1 rounded-full font-bold"
            >
              {tag}
            </span>
          {/each}
        </div>
      </div>

      <div class="flex items-center gap-6 text-on-surface-variant">
        {#if data.tyd}
          <div class="flex gap-4 text-neutral-700 font-source-serif-4 text-[13px]">
            <div class="flex gap-1" hidden={data.tyd.werk == null}>
              <Icon name="spoon" class="w-4 h-4 shrink-0" />
              <span>Werk: {data.tyd.werk} min</span>
            </div>
            <div class="flex gap-1" hidden={data.tyd.wag == null}>
              <Icon name="clock" class="w-4 h-4 shrink-0" />
              <span>Wag: {data.tyd.wag} min</span>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </a>
</article>
