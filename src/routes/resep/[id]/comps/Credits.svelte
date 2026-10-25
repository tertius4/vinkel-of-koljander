<script lang="ts">
  import Icon from "$lib/ui/comps/Icon.svelte";

  interface Props {
    credits: { label: string; name: string }[];
    class?: string;
  }

  const { credits, ...rest }: Props = $props();
</script>

{#if credits.length}
  <div class={["border-y grid grid-cols-[auto_1fr] gap-2 py-2 border-[#dbc1b8] items-center", rest.class || ""]}>
    <div class="size-9 flex items-center justify-center rounded-lg bg-secondary-200 text-secondary-900">
      <Icon name="book-open" size={18} />
    </div>
    <div class="font-source-serif-4 italic text-[#55433c] text-[15px] leading-snug">
      {#each credits as { label, name }}
        <div>{label} <span class="font-semibold text-black">{name}</span></div>
      {/each}
    </div>
  </div>
{/if}
