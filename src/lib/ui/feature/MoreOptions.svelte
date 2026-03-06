<script>
  import { fly } from "svelte/transition";
  import Icon from "../comps/Icon.svelte";
  import Modal from "../Modal.svelte";

  /** @type {{ comment?: string, ondelete?: () => void }} */
  let { comment = $bindable(""), ondelete } = $props();

  let open = $state(false);
  let commentOpen = $state(false);
  let draft = $state("");

  /** @type {HTMLElement | null} */
  let wrapper = $state(null);

  function toggle() {
    open = !open;
  }

  function openComment() {
    draft = comment;
    open = false;
    commentOpen = true;
  }

  function saveComment() {
    comment = draft;
    commentOpen = false;
  }

  function handleDelete() {
    open = false;
    ondelete?.();
  }

  /**
   * @param {MouseEvent} e
   */
  function handleOutside(e) {
    if (wrapper && !wrapper.contains(/** @type {Node} */ (e.target))) {
      open = false;
    }
  }
</script>

<svelte:window onclick={handleOutside} />

<div class="relative" bind:this={wrapper}>
  <button
    type="button"
    class="rounded hover:bg-alabaster-100"
    onclick={(e) => {
      e.stopPropagation();
      toggle();
    }}
    aria-label="Meer opsies"
  >
    <Icon name="ellipsis" size={16} class="text-alabaster-700" />
  </button>

  {#if open}
    <div
      transition:fly={{ y: -4, duration: 120 }}
      class="absolute right-0 top-full z-20 mt-1 w-44 rounded border border-alabaster-200 bg-white shadow-md py-1 text-sm"
      role="menu"
    >
      <button
        type="button"
        class="flex w-full items-center gap-2 px-3 py-2 hover:bg-alabaster-50 text-left"
        role="menuitem"
        onclick={openComment}
      >
        <Icon name="message" size={14} class="text-alabaster-500" />
        Voeg opmerking by
      </button>
      <button
        type="button"
        class="flex w-full items-center gap-2 px-3 py-2 hover:bg-red-50 text-red-600 text-left"
        role="menuitem"
        onclick={handleDelete}
      >
        <Icon name="trash" size={14} />
        Verwyder
      </button>
    </div>
  {/if}
</div>

<Modal bind:open={commentOpen}>
  <h3 class="text-base font-semibold mb-3">Opmerking</h3>
  <textarea
    class="w-full rounded border border-alabaster-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-rust-400 resize-none"
    rows="4"
    placeholder="Voeg 'n opmerking by..."
    bind:value={draft}
  ></textarea>
  <div class="flex justify-end gap-2 mt-3">
    <button
      type="button"
      class="px-4 py-2 rounded text-sm hover:bg-alabaster-100"
      onclick={() => (commentOpen = false)}
    >
      Kanselleer
    </button>
    <button
      type="button"
      class="px-4 py-2 rounded bg-rust-500 text-white text-sm hover:bg-rust-600"
      onclick={saveComment}
    >
      Stoor
    </button>
  </div>
</Modal>
