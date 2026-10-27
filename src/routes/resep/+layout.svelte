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

      // Replaces the wrong-layout url, so the back button does not return to it.
      if (isMobilePage && !isMobileScreen) {
        goto(page.url.pathname.replace("/resep/m", "/resep").replace(/\/bestandele$/, "") + page.url.search, {
          replaceState: true,
        });
      } else if (!isMobilePage && isMobileScreen) {
        goto(page.url.pathname.replace("/resep", "/resep/m") + page.url.search, { replaceState: true });
      }
    });
  });
</script>

{@render children()}
