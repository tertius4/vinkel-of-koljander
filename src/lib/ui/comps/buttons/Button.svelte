<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  interface Props {
    children: () => any;
    type?: "button" | "submit" | "reset";
    onclick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
  }

  const { children, type, onclick, disabled, ...rest }: Props & Record<string, any> = $props();
</script>

<button
  {...rest}
  {type}
  class={[
    "bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
    rest.class || "",
  ]}
  {onclick}
  {disabled}
>
  {@render children()}
</button>
