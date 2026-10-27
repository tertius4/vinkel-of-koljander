<script lang="ts">
  import Button from "$lib/ui/comps/buttons/Button.svelte";
  import Icon from "$lib/ui/comps/Icon.svelte";

  interface Props {
    /** iOS has no install prompt, so the banner explains the share menu instead of showing a button. */
    is_ios: boolean;
    oninstall?: () => void;
    ondismiss: () => void;
  }

  const { is_ios, oninstall, ondismiss }: Props = $props();
</script>

<div
  class="fixed inset-x-0 bottom-0 z-30 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pointer-events-none"
  role="dialog"
  aria-label="Installeer die app"
>
  <div
    class="pointer-events-auto mx-auto max-w-md flex items-center gap-3 rounded-lg border border-primary-100 bg-white p-3 shadow-lg"
  >
    <img src="/icons/icon-192.png" alt="" class="size-12 shrink-0 rounded-lg" />

    <div class="grow min-w-0 text-sm">
      <div class="font-bold text-primary-900">Installeer Vinkel of Koljander</div>
      {#if is_ios}
        <div class="text-[#55433c]">
          Tik op <Icon name="share" size={14} class="inline align-[-2px] text-primary" /> en dan
          <span class="font-semibold">Voeg by tuisskerm</span>.
        </div>
      {:else}
        <div class="text-[#55433c]">Kry die resepte vinnig vanaf jou tuisskerm.</div>
      {/if}
    </div>

    {#if oninstall}
      <Button onclick={oninstall} class="w-auto! px-3! py-2! shrink-0">Installeer</Button>
    {/if}

    <button
      type="button"
      onclick={ondismiss}
      class="shrink-0 rounded p-1 text-neutral-500 hover:text-primary focus:text-primary outline-none"
      aria-label="Nie nou nie"
    >
      <Icon name="xmark" size={20} />
    </button>
  </div>
</div>
