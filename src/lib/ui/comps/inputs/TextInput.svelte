<script lang="ts">
  interface Props {
    value?: string;
    placeholder?: string;
    oninput?: (event: Event) => void;
  }

  let { value = $bindable(), placeholder, oninput }: Props = $props();
</script>

<input
  type="text"
  class="w-full rounded-lg border border-primary-200 bg-tertiary-50 px-4 py-2 text-primary-950 placeholder:text-primary-400 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:outline-none"
  bind:value
  {placeholder}
  {oninput}
/>
