<script>
  import { on } from "svelte/events";
  import Icon from "../Icon.svelte";

  const { description } = $props();

  let is_expanded = $state(false);
  let is_overflowing = $state(false);

  /** @type {HTMLDivElement | null} */
  let content_wrapper = $state(null);
  /** @type {HTMLDivElement | null} */
  let inner_content = $state(null);

  $effect(() => {
    if (inner_content && description) {
      checkDescriptionOverflow(inner_content);
    }
  });

  /**
   *
   * @param {HTMLDivElement} inner_content
   */
  function checkDescriptionOverflow(inner_content) {
    console.trace(inner_content);
    if (!inner_content || !content_wrapper) return;

    // Get the actual rendered height with line-clamp applied
    const clamped_height = inner_content.offsetHeight;

    // Temporarily remove line-clamp to get full height
    const original_class = inner_content.className;
    inner_content.className = "";
    const full_height = inner_content.scrollHeight;
    inner_content.className = original_class;

    is_overflowing = full_height > clamped_height + 1;

    // Set wrapper to actual content height
    content_wrapper.style.height = is_expanded ? `${full_height}px` : `${clamped_height}px`;
  }

  function toggleExpanded() {
    if (!inner_content || !content_wrapper) return;

    // const currentHeight = inner_content.offsetHeight;

    // Get full height
    const original_class = inner_content.className;
    inner_content.className = "";
    const full_height = inner_content.scrollHeight;
    inner_content.className = original_class;

    is_expanded = !is_expanded;

    if (is_expanded) {
      content_wrapper.style.height = `${full_height}px`;
    } else {
      // Get clamped height after state change
      setTimeout(() => {
        const clamped_height = inner_content.offsetHeight;
        content_wrapper.style.height = `${clamped_height}px`;
      }, 0);
    }

    if (!is_expanded) {
      setTimeout(() => {
        checkDescriptionOverflow(inner_content);
      }, 300);
    }
  }

  /** @param {HTMLDivElement} node */
  function resize(node) {
    return on(node, "resize", (event) => checkDescriptionOverflow(node));
  }
</script>

<div>
  <div class="text-slate-900 text-p-md">
    <div class="transition-all duration-225 ease-in-out overflow-hidden" bind:this={content_wrapper}>
      <div
        {@attach resize}
        bind:this={inner_content}
        class:clamped={!is_expanded}
        style={!is_expanded ? `--clamp-mobile: 3; --clamp-desktop: 5;` : ""}
      >
        {@html description}
      </div>
    </div>
  </div>
  {#if is_overflowing || is_expanded}
    <div class="mx-auto w-fit">
      <button
        class="rounded-full bg-neutral-50 uppercase text-[12px] font-medium focus:bg-neutral-100 outline-none items-center px-2 py-0.5 flex gap-1"
        type="button"
        onclick={toggleExpanded}
      >
        {#if is_expanded}
          minder
        {:else}
          meer
        {/if}
        <Icon
          name="chevron-down"
          size={18}
          class="transition-transform duration-225 {is_expanded ? 'rotate-180' : ''}"
        />
      </button>
    </div>
  {/if}
</div>

<style>
  .clamped {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--clamp-mobile, 10);
  }
  @media (min-width: 768px) {
    .clamped {
      -webkit-line-clamp: var(--clamp-desktop, 15);
    }
  }
</style>
