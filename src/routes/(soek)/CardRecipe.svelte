<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import Icon from "$lib/ui/comps/Icon.svelte";

  interface Props {
    data: RecipeCardData;
    onclick?: () => any;
  }

  const { data, onclick }: Props = $props();
</script>

<article
  class="bg-white rounded-xl overflow-hidden border border-neutral-100 flex flex-col relative group hover:shadow-md hover:shadow-secondary/5 transition-shadow duration-300"
>
  <button
    hidden={!page.data.is_logged_in}
    class="absolute top-4 right-4 bg-neutral-800/90 p-2 z-10 rounded-xl text-white hover:text-primary-500 transition-colors shadow-sm"
    onclick={async (e) => {
      e.preventDefault();
      await goto(`/resep/${data.id}/wysig`);
    }}
  >
    <Icon name="edit" class="text-white" />
  </button>
  <a href="/resep/{data.id}" class="flex flex-col grow" {onclick}>
    <div class="h-56 overflow-hidden bg-surface-container-low flex items-center justify-center">
      {#if data.cover_image}
        <img
          alt={data.cover_image.alt}
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={data.cover_image.src}
        />
      {:else}
        <div class="w-full h-full bg-neutral-100 flex items-center justify-center">
          <Icon name="camera" class="text-neutral-400 text-[48px]" />
        </div>
      {/if}
    </div>
    <div class="p-6 grow flex flex-col justify-between">
      <div>
        <div class="flex flex-wrap gap-2 mb-4">
          {#each data.tags as tag}
            <span class="bg-secondary-100 text-secondary-950 font-sans text-[12px] px-3 py-1 rounded-full font-bold">
              {tag}
            </span>
          {/each}
        </div>
        <h2 class="font-serif text-[24px] leading-7 font-semibold text-neutral-900 mb-4">{data.title}</h2>
      </div>

      <div class="flex items-center gap-6 text-on-surface-variant font-label-sm text-label-sm">
        {#if data.tyd}
          <div class="flex gap-4 text-neutral-500 font-sans text-[13px]">
            <div class="flex gap-1" hidden={data.tyd.werk == null}>
              <Icon name="running-man" class="w-4 h-4 shrink-0" />
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
