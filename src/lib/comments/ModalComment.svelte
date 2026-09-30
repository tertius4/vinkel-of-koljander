<script lang="ts">
  import Modal from "$lib/ui/comps/Modal.svelte";
  import Button from "$lib/ui/comps/buttons/Button.svelte";
  import Icon from "$lib/ui/comps/Icon.svelte";
  import TextInput from "$lib/ui/comps/inputs/TextInput.svelte";
  import type { CommentForm } from "./CommentsState.svelte";

  interface Props {
    data: CommentForm;
    onclose: () => void;
    onsubmit: () => void;
  }

  const { data, onclose, onsubmit }: Props = $props();

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    onsubmit();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") onclose();
  }
</script>

<svelte:body onkeydown={handleKeydown} />

<Modal>
  <form
    aria-labelledby="comment-title"
    class="space-y-3 bg-white p-4 rounded-lg relative"
    onsubmit={handleSubmit}
  >
    <button
      class="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 transition-colors outline-none rounded-full focus:text-neutral-800 active:text-neutral-800"
      type="button"
      aria-label="Sluit"
      onclick={onclose}
    >
      <Icon name="xmark" size={20} />
    </button>

    <h2 id="comment-title" class="text-xl font-bold pr-8">Lewer Kommentaar</h2>

    <label class="block space-y-1">
      <span class="text-sm font-semibold text-neutral-800">Jou naam</span>
      <TextInput bind:value={data.name} placeholder="Naam" maxlength={40} autofocus={!data.name} />
    </label>

    <label class="block space-y-1">
      <span class="text-sm font-semibold text-neutral-800">Kommentaar (opsioneel)</span>
      <textarea
        bind:value={data.text}
        rows="4"
        maxlength="500"
        placeholder="Wat dink jy van hierdie resep?"
        class="w-full rounded-lg border border-primary-200 bg-tertiary-50 px-4 py-2 text-primary-950 placeholder:text-primary-400 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:outline-none"
      ></textarea>
    </label>

    <Button
      type="button"
      outline={!data.thumbs_up}
      aria-pressed={data.thumbs_up}
      onclick={() => (data.thumbs_up = !data.thumbs_up)}
    >
      <span class="leading-none">👍</span>
      <span>{data.thumbs_up ? "Duimpie gegee" : "Gee 'n duimpie"}</span>
    </Button>

    <p class="text-sm text-red-600" hidden={!data.error} role="alert">{data.error}</p>

    <Button type="submit" disabled={data.saving}>
      <span>{data.saving ? "Stoor..." : "Plaas Kommentaar"}</span>
    </Button>
  </form>
</Modal>
