<script lang="ts">
  import Modal from "$lib/ui/comps/Modal.svelte";
  import Button from "$lib/ui/comps/buttons/Button.svelte";
  import Icon from "$lib/ui/comps/Icon.svelte";

  interface Props {
    recipe_name: string;
    onclose: () => void;
    onremove: () => void;
  }

  const { onclose, onremove, recipe_name }: Props = $props();

  function handleRemove() {
    onremove();
    onclose();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") onclose();
  }
</script>

<svelte:body onkeydown={handleKeydown} />

<Modal>
  <div
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="remove-recipe-title"
    aria-describedby="remove-recipe-desc"
    class="space-y-2 bg-white p-4 rounded-lg relative"
  >
    <button
      class="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 transition-colors outline-none rounded-full focus:text-neutral-800 active:text-neutral-800"
      type="button"
      onclick={onclose}
    >
      <Icon name="xmark" size={20} />
    </button>
    <div class="flex items-start gap-3">
      <div class="space-y-1 min-w-0">
        <h2 id="remove-recipe-title" class="text-xl font-bold">Skrap resep?</h2>
        <p id="remove-recipe-desc" class="text-neutral-500">
          <span class="font-semibold text-neutral-800 wrap-break-word">{recipe_name}</span> sal permanent geskrap word. Dit kan nie
          ongedaan gemaak word nie.
        </p>
      </div>
    </div>

    <footer class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
      <Button
        type="button"
        autofocus
        class="sm:w-auto bg-red-600! hover:bg-red-700! focus:bg-red-700! active:bg-red-700!"
        onclick={handleRemove}
      >
        <Icon name="trash" size={18} />
        <span class="text-white">Skrap</span>
      </Button>
    </footer>
  </div>
</Modal>
