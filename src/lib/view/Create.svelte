<script>
  import Form from "$lib/comps/CreateForm.svelte";
  import PageHeader from "$lib/comps/PageHeader.svelte";

  let has_scrolled = $state(false);
  /**
   *
   * @param {HTMLDivElement} node
   */
  function init(node) {
    function onScroll() {
      has_scrolled = node.scrollTop > 0;
    }
    node.addEventListener("scroll", onScroll);
    return {
      destroy() {
        node.removeEventListener("scroll", onScroll);
      },
    };
  }
</script>

<div class="rounded-b-lg pb-4 transition-shadow" class:shadow-[0_10px_10px_rgba(1,1,1,0.08)]={has_scrolled}>
  <PageHeader>Skep 'n Nuwe Resep</PageHeader>
</div>

<div use:init class="h-full overflow-y-auto scrollbar-none pb-25 px-4">
  <Form
    recipe={{
      id: "",
      naam: "",
      beskrywing: "",
      foto: "",
      tyd: { werk: 30, wag: 15 },
      kategorieë: [],
      porsies: 4,
      stappe: [],
    }}
  />
</div>
