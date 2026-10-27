<script lang="ts">
  import { fly } from "svelte/transition";
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
  class="fixed inset-x-0 bottom-0 z-30 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
  role="dialog"
  aria-labelledby="install-prompt-title"
  transition:fly={{ y: 200, duration: 400 }}
>
  <div
    class="relative mx-auto max-w-md overflow-hidden rounded-2xl border-2 border-primary-200 bg-white shadow-[0_-8px_40px_rgba(70,27,10,0.35)]"
  >
    <button
      type="button"
      onclick={ondismiss}
      class="absolute top-2.5 right-2.5 rounded-full p-1 text-neutral-500 hover:bg-primary-50 hover:text-primary focus:bg-primary-50 focus:text-primary outline-none"
      aria-label="Nie nou nie"
    >
      <Icon name="xmark" size={18} />
    </button>

    <div class="p-4">
      <div class="flex items-center gap-3 pr-5">
        <img src="/icons/icon-192.png" alt="" class="size-12 shrink-0 rounded-xl shadow-md ring-2 ring-primary-100" />
        <div class="min-w-0">
          <div class="text-xs font-bold uppercase tracking-wider text-secondary-700">Kry die gratis app</div>
          <h2 id="install-prompt-title" class="text-xl leading-tight font-semibold font-source-serif-4 text-primary">
            Vinkel of Koljander
          </h2>
        </div>
      </div>

      {#if is_ios}
        <ol class="mt-4 space-y-2 text-[#55433c]">
          <li class="flex items-center gap-3">
            <span
              class="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white"
              >1</span
            >
            <span>Tik op <Icon name="share" size={16} class="inline align-[-3px] text-primary" /> onderaan Safari</span>
          </li>
          <li class="flex items-center gap-3">
            <span
              class="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white"
              >2</span
            >
            <span>Kies <span class="font-semibold">Voeg by tuisskerm</span></span>
          </li>
          <li class="flex items-center gap-3">
            <span
              class="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white"
              >3</span
            >
            <span>Tik op <span class="font-semibold">Voeg by</span></span>
          </li>
        </ol>
      {/if}

      {#if oninstall}
        <Button onclick={oninstall} class="mt-4">
          <Icon name="download" size={18} />
          Installeer nou
        </Button>
      {/if}
    </div>
  </div>
</div>
