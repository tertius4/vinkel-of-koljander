<script>
  import ButtonAuth from "$lib/ui/feature/ButtonAuth.svelte";
  import { browser } from "$app/environment";
  import "./layout.css";
  import Icon from "$lib/ui/comps/Icon.svelte";

  const { data, children } = $props();
</script>

<main class="background w-dvw h-dvh flex flex-col overflow-hidden">
  {#if data.is_maintenance_mode}
    <div class="flex flex-col items-center justify-center h-full gap-4 p-4">
      <h2 class="text-2xl font-bold text-alabaster-950">In Onderhoud</h2>
      <p class="text-alabaster-700 text-center">Hierdie webwerf word tans aan gewerk. Kyk asseblief oor 15 min weer!</p>
      <span class="text-4xl">🏗️</span>
    </div>
  {:else}
    <header class="relative w-full bg-tertiary-50 border-b border-tertiary-400 py-2">
      {#if data.is_create_page || data.is_edit_page || data.is_recipe_page}
        <a href="/" class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2">
          <Icon name="arrow-left" size={24} class="text-primary-500" />
        </a>
      {/if}

      <a
        href="/"
        class="shrink-0 w-fit mx-auto flex gap-2 md:gap-4 justify-center items-center outline-none hover:scale-105 focus:scale-105 active:scale-105 transition-transform"
      >
        <img src="/vinkel-of-koljander-icon.png" alt="Vinkel of Koljander Logo" class="size-12 md:size-16" />

        <h1
          class="text-primary-500 text-nowrap font-bold leading-none"
          style="font-family: 'Times New Roman', Times, serif;"
        >
          <div class="text-lg md:text-xl leading-none">Vinkel of</div>
          <span class="text-2xl md:text-3xl leading-none">Koljander</span>
        </h1>
      </a>

      <ButtonAuth hidden={!browser} class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2" />
    </header>

    <div class="max-w-4xl mx-auto grow min-h-0 w-full px-4 flex flex-col">
      {@render children()}
    </div>
  {/if}
</main>

<style>
  .background {
    background-color: #f8efeb;
    opacity: 0.8;
    background-image: conic-gradient(
        from 60deg at 56.25% calc(425% / 6),
        transparent 0deg,
        transparent 0.5deg,
        #ffffff 0.5deg,
        #ffffff 119.5deg,
        transparent 119.5deg,
        transparent 120deg
      ),
      conic-gradient(
        from 60deg at 56.25% calc(425% / 6),
        transparent 0deg,
        transparent 0.5deg,
        #ffffff 0.5deg,
        #ffffff 119.5deg,
        transparent 119.5deg,
        transparent 120deg
      ),
      conic-gradient(
        from 180deg at 43.75% calc(425% / 6),
        transparent 0deg,
        transparent 0.5deg,
        #ffffff 0.5deg,
        #ffffff 119.5deg,
        transparent 119.5deg,
        transparent 120deg
      ),
      conic-gradient(
        from 180deg at 43.75% calc(425% / 6),
        transparent 0deg,
        transparent 0.5deg,
        #ffffff 0.5deg,
        #ffffff 119.5deg,
        transparent 119.5deg,
        transparent 120deg
      ),
      conic-gradient(
        from -60deg at 50% calc(175% / 12),
        transparent 0deg,
        transparent 0.5deg,
        #ffffff 0.5deg,
        #ffffff 119.5deg,
        transparent 119.5deg,
        transparent 120deg
      ),
      conic-gradient(
        from -60deg at 50% calc(175% / 12),
        transparent 0deg,
        transparent 0.5deg,
        #ffffff 0.5deg,
        #ffffff 119.5deg,
        transparent 119.5deg,
        transparent 120deg
      );
    background-position:
      0 0,
      10px 17px,
      0 0,
      10px 17px,
      10px 0,
      0 17px;
    background-size: 20px 34px;
  }
</style>
