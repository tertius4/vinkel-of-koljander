<script lang="ts">
  import Icon from "$lib/ui/comps/Icon.svelte";

  interface Props {
    value?: string;
    placeholder?: string;
    oninput?: (event: Event) => void;
  }

  let { value = $bindable(), placeholder, oninput }: Props = $props();
</script>

<div
  class="flex items-center rounded-lg border border-primary-200 bg-tertiary-50 p-2 gap-1 focus-within:bg-primary-50 focus-within:border-primary-300 transition-colors"
>
  <Icon name="search" class="text-primary-400" />
  <input
    type="text"
    class="w-full h-full text-primary-950 placeholder:text-primary-400 outline-none"
    bind:value
    {placeholder}
    {oninput}
  />
</div>
