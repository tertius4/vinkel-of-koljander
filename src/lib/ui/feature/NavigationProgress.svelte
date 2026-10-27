<script lang="ts">
  import { navigating } from "$app/state";

  const FINISH_MS = 300;

  // Width in percent. While loading it creeps towards 90%; once the page is there it runs to 100% and fades.
  let width = $state(0);
  let visible = $state(false);
  let transition = $state("none");
  let finish_timer: ReturnType<typeof setTimeout> | undefined;

  $effect(() => {
    if (navigating.to) start();
    else if (visible) finish();
  });

  function start() {
    clearTimeout(finish_timer);
    visible = true;
    transition = "none";
    width = 0;
    // Next frame, so the browser draws 0% first and the width can transition from there.
    requestAnimationFrame(() => {
      transition = "width 8s cubic-bezier(0.1, 0.7, 0.3, 1)";
      width = 90;
    });
  }

  function finish() {
    transition = `width ${FINISH_MS}ms ease-out`;
    width = 100;
    // Fades only once the bar has reached the end.
    finish_timer = setTimeout(() => (visible = false), FINISH_MS);
  }
</script>

<div
  class="absolute inset-x-0 bottom-0 h-0.75 transition-opacity duration-200"
  class:opacity-0={!visible}
  role="progressbar"
  aria-label="Laai bladsy"
  aria-hidden={!visible}
>
  <div class="h-full bg-primary" style:width="{width}%" style:transition></div>
</div>
