<script lang="ts">
  import Icon from "$lib/ui/comps/Icon.svelte";
  import { fade } from "svelte/transition";

  interface Props {
    servings: number;
    onchange: (value: number) => void;
    border?: string;
    original_servings: number;
  }

  const { servings, onchange, border = "border-primary-400", original_servings }: Props = $props();

  const button_class = $derived(
    `size-9 rounded-xl border flex items-center justify-center my-auto ${border} bg-white text-black outline-none focus:bg-primary-100 active:bg-primary-100 disabled:opacity-40`,
  );

  // Always rendered (just hidden) so the other buttons don't shift when it appears.
  const modified = $derived(original_servings != null && servings !== original_servings);
</script>

{#if modified}
  <button
    transition:fade
    type="button"
    aria-label="Herstel porsies"
    title="Herstel na {original_servings}"
    onclick={() => onchange(original_servings)}
    class="{button_class} mr-2"
  >
    <Icon name="restore" size={20} />
  </button>
{/if}
<button
  type="button"
  aria-label="Verminder porsies"
  disabled={servings <= 1}
  onclick={() => onchange(servings - 1)}
  class={button_class}
>
  <Icon name="minus" size={20} />
</button>
<div class="flex items-center justify-center mx-3">
  <span class="font-bold">{servings}</span>
</div>
<button type="button" aria-label="Verhoog porsies" onclick={() => onchange(servings + 1)} class={button_class}>
  <Icon name="plus" size={20} />
</button>
