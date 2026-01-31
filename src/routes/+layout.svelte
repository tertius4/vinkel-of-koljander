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

<main class="bg-bandicoot-100 w-dvw h-dvh md:p-2">
  <div class="max-w-3xl mx-auto md:py-4 bg-bandicoot-50 rounded-lg h-full overflow-hidden">
    <div class="w-full flex justify-center">
      <h1 class="text-4xl font-bold mt-4 mb-2">Vinkel of Koljander</h1>
    </div>

    {@render children()}
  </div>
</main>
