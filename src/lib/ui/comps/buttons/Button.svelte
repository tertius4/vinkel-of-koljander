<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  interface Props {
    children: () => any;
    type?: "button" | "submit" | "reset";
    onclick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    outline?: boolean;
    solid?: boolean;
  }

  const {
    children,
    type,
    onclick,
    disabled,
    outline = false,
    solid = true,
    ...rest
  }: Props & Record<string, any> = $props();
</script>

<button
  {...rest}
  {type}
  class={[
    "border-2 rounded transition-colors py-2.5 px-4 outline-none w-full duration-300",
    "headline-md text-base!",
    "flex items-center justify-center gap-2",
    {
      "opacity-50 cursor-not-allowed": disabled,
      "text-white bg-primary": solid && !outline,
      "border-transparent hover:bg-primary-600 active:bg-primary-600 focus:bg-primary-600":
        solid && !outline && !disabled,
      "text-primary border-primary ": outline,
      "focus:bg-primary-500 focus:text-white hover:bg-primary-500 hover:text-white active:bg-primary-500 active:text-white":
        outline && !disabled,
    },

    rest.class || "",
  ]}
  {onclick}
  {disabled}
>
  {@render children()}
</button>
