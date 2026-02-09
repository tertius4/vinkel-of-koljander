<script>
  import { onMount } from "svelte";
  import "./layout.css";
  import { App } from "@capacitor/app";
  import { Navigation } from "$lib/classes/Navigation.svelte";

  let { children } = $props();

  onMount(() => {
    if (typeof window === "undefined") return;
    App.addListener("backButton", () => {
      Navigation.navigateTo("/");
    });

    window.addEventListener("popstate", () => {
      Navigation.navigateTo("/");
    });
  });
</script>

<main class="bg-alabaster-100 w-dvw h-dvh">
  <div class="max-w-3xl mx-auto md:pb-4 bg-alabaster-50 md:rounded-lg h-full overflow-hidden">
    <div class="w-full flex justify-center items-center bg-alabaster-950 md:py-4 h-20">
      <button type="button" onclick={() => Navigation.navigateTo("/")}>
        <img
          src="/vinkel-of-koljander-icon.png"
          alt="Vinkel of Koljander Logo"
          class="w-12 md:w-16 md:h-16 h-12 mr-2 md:mr-4"
        />
      </button>

      <h1 class="text-alabaster-50 text-4xl font-bold" style="font-family: 'Times New Roman', Times, serif;">
        Vinkel of Koljander
      </h1>
    </div>

    {@render children()}
  </div>
</main>
