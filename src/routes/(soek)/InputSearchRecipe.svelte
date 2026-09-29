<script lang="ts">
  import { FOOD_CATEGORIES, normalise } from "$lib";
  import Icon from "$lib/ui/comps/Icon.svelte";

  interface Props {
    value?: string;
    selected_categories?: string[];
    placeholder?: string;
    oninput?: (event: Event) => void;
    onclear?: () => void;
    onchange_categories?: () => void;
  }

  let {
    value = $bindable(),
    selected_categories = $bindable([]),
    placeholder,
    oninput,
    onclear,
    onchange_categories,
  }: Props = $props();

  let focused = $state(false);

  const suggestions = $derived.by(() => {
    const q = normalise(value ?? "");
    return FOOD_CATEGORIES.filter(
      (c) => !selected_categories.includes(c.label) && (!q || normalise(c.label).includes(q)),
    );
  });

  function select(label: string) {
    selected_categories = [...selected_categories, label];
    value = "";
    onchange_categories?.();
  }

  function deselect(label: string) {
    selected_categories = selected_categories.filter((c) => c !== label);
    onchange_categories?.();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Backspace" && !value && selected_categories.length) {
      deselect(selected_categories[selected_categories.length - 1]);
    }
  }
</script>

<div class="relative">
  <div
    class="flex items-center flex-wrap rounded-lg border border-primary-200 bg-white p-2 gap-1 focus-within:bg-primary-50 focus-within:border-primary-300 transition-colors"
  >
    <Icon name="search" class="text-primary-400" />
    {#each selected_categories as label (label)}
      <button
        type="button"
        aria-label={`Verwyder ${label}`}
        onclick={() => deselect(label)}
        class="bg-primary-100 text-primary-900 flex items-center select-none gap-1 rounded-full text-sm pl-2 pr-1"
      >
        <span>
          {label}
        </span>
        <span class="text-primary-500 hover:text-primary-700 px-1">×</span>
      </button>
    {/each}
    <input
      type="text"
      aria-label={placeholder}
      class="flex-1 min-w-24 h-full text-primary-950 placeholder:text-primary-400 outline-none"
      bind:value
      {placeholder}
      {oninput}
      onfocus={() => (focused = true)}
      onblur={() => (focused = false)}
      onkeydown={handleKeydown}
    />
    {#if (value || selected_categories.length) && onclear}
      <button
        type="button"
        aria-label="Maak soek skoon"
        class="text-primary-400 hover:text-primary-600 px-1"
        onclick={onclear}
      >
        ×
      </button>
    {/if}
  </div>

  {#if focused && suggestions.length}
    <ul
      class="absolute left-0 right-0 top-full mt-1 z-11 max-h-60 overflow-y-auto rounded-lg border border-primary-200 bg-white shadow-lg"
      role="listbox"
      aria-label="Kategorieë"
    >
      {#each suggestions as category (category.label)}
        <li role="option" aria-selected="false">
          <button
            type="button"
            class="w-full text-left px-3 py-2 text-primary-950 hover:bg-primary-50"
            onmousedown={(e) => e.preventDefault()}
            onclick={() => select(category.label)}
          >
            {category.label}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
