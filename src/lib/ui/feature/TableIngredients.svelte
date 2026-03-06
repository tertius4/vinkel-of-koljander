<script>
  import { flip } from "svelte/animate";
  import Icon from "../comps/Icon.svelte";
  import Table from "../comps/table/Table.svelte";
  import TableBody from "../comps/table/TableBody.svelte";
  import TableCell from "../comps/table/TableCell.svelte";
  import TableColumns from "../comps/table/TableColumns.svelte";
  import TableHeading from "../comps/table/TableHeading.svelte";
  import TableHeadingRow from "../comps/table/TableHeadingRow.svelte";
  import TableCellInput from "../comps/table/TableCellInput.svelte";
  import MoreOptions from "./MoreOptions.svelte";

  /**
   * @typedef {Object} Props
   * @property {DB.Ingredient[]} ingredients
   */

  /** @type {Props} */
  let { ingredients = $bindable([]) } = $props();

  /** @type {TableColumn[]} */
  const headings = [
    { title: "", width: "40px" },
    { title: "Bestandeel" },
    { title: "Aantal", width: "80px" },
    { title: "Eenheid" },
    { title: "", width: "40px" },
  ];

  /**
   * Appends a new empty ingredient row to the list.
   */
  function handleAddIngredient() {
    ingredients.push({ ingredient: "", amount: 0, unit: "", comment: "" });
  }

  /** @type {number} Index of the row currently being dragged, or -1 if none. */
  let drag_index = $state(-1);
  /** @type {number} Index of the row currently being dragged over, or -1 if none. */
  let drag_over_index = $state(-1);

  /**
   * Records the dragged row index and sets the allowed drag effect.
   * @param {DragEvent} e
   * @param {number} index - Row index being dragged.
   */
  function handleHandleDragStart(e, index) {
    drag_index = index;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
    }
  }

  /**
   * Updates the current drag-over row index to show the drop indicator.
   * @param {DragEvent} e
   * @param {number} index - Row index being dragged over.
   */
  function handleDragOver(e, index) {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "move";
    }
    drag_over_index = index;
  }

  /**
   * Moves the dragged ingredient to the target position and resets drag state.
   * @param {number} targetIndex - The index at which to insert the dragged item.
   */
  function commitDrop(targetIndex) {
    if (drag_index === -1 || drag_index === targetIndex) {
      drag_index = -1;
      drag_over_index = -1;
      return;
    }
    const [item] = ingredients.splice(drag_index, 1);
    ingredients.splice(targetIndex, 0, item);
    drag_index = -1;
    drag_over_index = -1;
  }

  /**
   * Handles the drop event and commits the reorder.
   * @param {DragEvent} e
   * @param {number} index - Row index where the item was dropped.
   */
  function handleDrop(e, index) {
    e.preventDefault();
    commitDrop(index);
  }

  /**
   * Resets drag state when a drag operation ends without a valid drop.
   */
  function handleDragEnd() {
    drag_index = -1;
    drag_over_index = -1;
  }

  /**
   * Records the touched row index to begin a touch-based drag.
   * @param {TouchEvent} e
   * @param {number} index - Row index where the touch started.
   */
  function handleTouchStart(e, index) {
    drag_index = index;
  }

  /**
   * Tracks the row being touched over during a touch drag and updates
   * {@link drag_over_index} to show the drop indicator.
   * @param {TouchEvent} e
   */
  function handleTouchMove(e) {
    if (drag_index === -1) return;

    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const row = el?.closest("[data-row-index]");
    if (row) {
      drag_over_index = parseInt(row.dataset.rowIndex);
    }
  }

  /**
   * Commits the touch drag reorder when the finger is lifted.
   * Falls back to the original index if no target row was identified.
   */
  function handleTouchEnd() {
    commitDrop(drag_over_index === -1 ? drag_index : drag_over_index);
  }
</script>

<div class="flex justify-between p-2">
  <h2 class="text-lg font-semibold my-auto">Bestandele</h2>
  <button
    class="bg-rust-500 text-white px-4 py-2 rounded hover:bg-rust-600 transition-colors items-center justify-center"
    type="button"
    onclick={handleAddIngredient}
  >
    <svg class="w-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
    </svg>
    <span class="leading-none">Voeg By</span>
  </button>
</div>

<Table>
  <TableColumns {headings}>
    <TableHeadingRow>
      {#each headings as heading}
        <TableHeading title={heading.title} />
      {/each}
    </TableHeadingRow>
    <TableBody
      class="*:even:bg-slate-25! relative transition-[height] duration-150 *:odd:bg-white overflow-x-hidden"
      style="height: {ingredients.reduce(
        (acc, ingredient) => acc + (!!ingredient.comment ? 107 : 42),
        4,
      )}px !important; min-height: 42px;"
    >
      {#each ingredients as ingredient, index (ingredient)}
        <div
          role="region"
          class="border-rust-500"
          class:border-b-4={drag_over_index > drag_index && drag_over_index === index}
          class:border-t-4={drag_over_index < drag_index && drag_over_index === index}
          class:opacity-40={drag_index === index}
          data-row-index={index}
          style="display: grid; grid-template-columns: subgrid; grid-column: 1 / -1;"
          ondragover={(e) => handleDragOver(e, index)}
          ondrop={(e) => handleDrop(e, index)}
          animate:flip={{ duration: 200 }}
        >
          <TableCell>
            <div
              role="button"
              tabindex="0"
              aria-label="Sleep om te herrangskik"
              draggable="true"
              class="flex items-center justify-center cursor-grab group-hover:opacity-100 transition-opacity h-full w-full touch-none"
              ondragstart={(e) => handleHandleDragStart(e, index)}
              ondragend={handleDragEnd}
              ontouchstart={(e) => handleTouchStart(e, index)}
              ontouchmove={handleTouchMove}
              ontouchend={handleTouchEnd}
            >
              <Icon name="grid-dots-v" size={16} class="text-alabaster-700" />
            </div>
          </TableCell>
          <TableCellInput placeholder="Bestandeel" bind:value={ingredient.ingredient} type="text" />
          <TableCellInput
            placeholder="Aantal"
            bind:value={ingredient.amount}
            type="number"
            min="0"
            step="any"
            class={!ingredient.amount ? "text-alabaster-500" : ""}
          />
          <TableCellInput placeholder="Eenheid" bind:value={ingredient.unit} type="text" />
          <TableCell class="p-0! my-auto">
            <MoreOptions bind:comment={ingredient.comment} ondelete={() => ingredients.splice(index, 1)} />
          </TableCell>
          {#if ingredient.comment}
            <TableCell class="col-span-full py-1! px-3! bg-alabaster-50 border-t border-alabaster-100">
              <div class="flex items-center gap-1.5 text-alabaster-500">
                <Icon name="message" size={12} />
                <textarea
                  class="w-full outline-0 text-ellipsis text-sm italic text-alabaster-500 bg-transparent placeholder:text-alabaster-400 resize-none h-14"
                  placeholder="Opmerking..."
                  bind:value={ingredient.comment}
                ></textarea>
              </div>
            </TableCell>
          {/if}
        </div>
      {:else}
        <TableCell class="col-span-full text-center text-alabaster-500 italic" colspan={headings.length}>
          Geen bestandele bygevoeg nie.
        </TableCell>
      {/each}
    </TableBody>
  </TableColumns>
</Table>
