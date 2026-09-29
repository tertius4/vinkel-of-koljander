<script lang="ts">
  import Icon from "../Icon.svelte";

  interface Props {
    icon: string;
    title: string;
    body: string;
    small: boolean;
  }

  const { icon, title, body, small = false, ...rest }: Props & Record<string, any> = $props();
</script>

<div
  {...rest}
  class={[
    {
      "rounded-r-md border-secondary-700 bg-stone-100": true,
      "border-l-8 px-5 py-4": !small,
      "border-l-3 p-2.5 rounded": small,
    },
    rest.class,
  ]}
>
  <div class="flex items-start gap-3">
    {#if icon}
      <Icon name={icon} class="mt-0.5 size-5 shrink-0 text-secondary-700" />
    {/if}

    <div class="min-w-0">
      <div class={{ "font-semibold text-secondary-800": true, inline: small }}>
        {title}:
      </div>

      <div class={{ "text-md font-normal leading-relaxed text-neutral-950": true, "mt-1": !small, inline: small }}>
        {body}
      </div>
    </div>
  </div>
</div>
