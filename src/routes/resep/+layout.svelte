<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import ScreenSvelte from "$lib/classes/Screen.svelte.js";
  import { untrack } from "svelte";

  const { children } = $props();

  $effect(() => {
    const isMobileScreen = ScreenSvelte.isMobile;

    untrack(() => {
      const isMobilePage = page.url.pathname.startsWith("/resep/m/");

      if (isMobilePage && !isMobileScreen) {
        goto(page.url.pathname.replace("/resep/m", "/resep"));
      } else if (!isMobilePage && isMobileScreen) {
        goto(page.url.pathname.replace("/resep", "/resep/m"));
      }
    });
  });
</script>

{@render children()}
