<script lang="ts">
  import Icon from "$lib/ui/comps/Icon.svelte";
  import Panel from "$lib/ui/comps/layouts/Panel.svelte";
  import { ICON_BUTTON_CLASS, INPUT_CLASS } from "./styles";

  interface Props {
    ingredient: DB.Ingredient;
    is_first: boolean;
    is_last: boolean;
    onmove: (direction: -1 | 1) => void;
    onremove: () => void;
  }

  let { ingredient = $bindable(), is_first, is_last, onmove, onremove }: Props = $props();

  // svelte-ignore state_referenced_locally
  let show_comment = $state(!!ingredient.comment);
</script>

<Panel class="p-3 grid grid-cols-[6rem_1fr] sm:grid-cols-[minmax(0,1fr)_6rem_9rem_auto] gap-2 items-center">
  <input
    bind:value={ingredient.ingredient}
    placeholder="Bestanddeel"
    aria-label="Bestanddeel"
    class={[INPUT_CLASS, "col-span-2 sm:col-span-1"]}
  />
  <input
    type="number"
    min="0"
    step="any"
    inputmode="decimal"
    bind:value={ingredient.amount}
    placeholder="Aantal"
    aria-label="Aantal"
    class={INPUT_CLASS}
  />
  <input bind:value={ingredient.unit} placeholder="Eenheid" aria-label="Eenheid" class={INPUT_CLASS} />

  <div class="col-span-2 sm:col-span-1 flex justify-end">
    <button type="button" class={ICON_BUTTON_CLASS} aria-label="Skuif op" disabled={is_first} onclick={() => onmove(-1)}>
      <Icon name="chevron-down" size={20} class="rotate-180" />
    </button>
    <button type="button" class={ICON_BUTTON_CLASS} aria-label="Skuif af" disabled={is_last} onclick={() => onmove(1)}>
      <Icon name="chevron-down" size={20} />
    </button>
    <button
      type="button"
      class={[ICON_BUTTON_CLASS, show_comment && "bg-primary-100"]}
      aria-label="Wenk"
      aria-pressed={show_comment}
      onclick={() => (show_comment = !show_comment)}
    >
      <Icon name="lightbulb" size={20} />
    </button>
    <button type="button" class={[ICON_BUTTON_CLASS, "text-red-600"]} aria-label="Verwyder bestanddeel" onclick={onremove}>
      <Icon name="trash" size={20} />
    </button>
  </div>

  {#if show_comment}
    <textarea
      bind:value={ingredient.comment}
      rows="2"
      placeholder="Wenk (opsioneel)…"
      aria-label="Wenk"
      class={[INPUT_CLASS, "col-span-full resize-none text-sm! bg-stone-100 border-l-8 border-l-secondary-700"]}
    ></textarea>
  {/if}
</Panel>
