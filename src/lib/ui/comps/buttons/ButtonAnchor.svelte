<script lang="ts">
  interface Props {
    children: () => any;
    type?: "button" | "submit" | "reset";
    href: string;
    disabled?: boolean;
    outline?: boolean;
    solid?: boolean;
  }

  const {
    children,
    type,
    href,
    disabled,
    outline = false,
    solid = true,
    ...rest
  }: Props & Record<string, any> = $props();
</script>

<a
  {...rest}
  {type}
  class={[
    "rounded transition-colors py-3.5 px-4 outline-none w-full duration-300",
    "flex items-center justify-center gap-2",
    "headline-md text-base!",
    {
      "opacity-50 cursor-not-allowed": disabled,
      "text-white bg-primary": solid && !outline,
      "hover:bg-primary-600 active:bg-primary-600 focus:bg-primary-600": solid && !outline && !disabled,
      "text-primary border-2 border-primary ": outline,
      "focus:bg-primary-500 focus:text-white hover:bg-primary-500 hover:text-white active:bg-primary-500 active:text-white":
        outline && !disabled,
    },
    rest.class || "",
  ]}
  href={disabled ? undefined : href}
>
  {@render children()}
</a>
