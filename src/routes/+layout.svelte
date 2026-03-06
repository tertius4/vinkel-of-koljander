<script>
  import "./layout.css";

  let { children } = $props();
</script>

<main class="bg-alabaster-100 w-dvw h-dvh">
  <div class="max-w-3xl mx-auto md:pb-4 bg-alabaster-50 md:rounded-lg h-full overflow-hidden">
    <div class="w-full flex justify-center items-center bg-alabaster-950 md:py-4 h-20">
      <a href="/" class="shrink-0">
        <img
          src="/vinkel-of-koljander-icon.png"
          alt="Vinkel of Koljander Logo"
          class="w-12 md:w-16 md:h-16 h-12 mr-2 md:mr-4 shrink-0"
        />
      </a>

      <h1
        class="text-alabaster-50 text-nowrap text-2xl sm:text-4xl font-bold"
        style="font-family: 'Times New Roman', Times, serif;"
      >
        Vinkel of Koljander
      </h1>
    </div>

    {@render children()}
    <!-- <div class="flex flex-col items-center justify-center h-full gap-4 p-4">
      <h2 class="text-2xl font-bold text-alabaster-950">In Onderhoud</h2>
      <p class="text-alabaster-700 text-center">Hierdie webwerf word tans aan gewerk. Kyk asseblief oor 15 min weer!</p>
      <span class="text-4xl">🏗️</span>
    </div> -->
  </div>
</main>
