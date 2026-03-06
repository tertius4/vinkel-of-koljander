<script>
  import Form from "$lib/ui/CreateForm.svelte";
  import PageHeader from "$lib/ui/PageHeader.svelte";

  /**
   * @typedef {Object} Props
   * @property {DB.Resep} recipe
   */

  /** @type {Props} */
  const { recipe } = $props();

  let scrollY = $state(0);

  const has_scrolled = $derived(scrollY > 0);
</script>

<svelte:window bind:scrollY />

<div class="rounded-b-lg pb-4 transition-shadow" class:shadow-[0_10px_10px_rgba(1,1,1,0.08)]={has_scrolled}>
  <PageHeader>Wysig Resep</PageHeader>
</div>

{#if !recipe}
  <p class="text-center text-gray-500">Laai resep...</p>
{:else}
  <div class="h-full overflow-y-auto scrollbar-none pb-25 px-4">
    <Form {recipe} />
  </div>
{/if}
