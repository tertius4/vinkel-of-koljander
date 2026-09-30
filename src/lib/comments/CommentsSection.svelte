<script lang="ts">
  import { onMount } from "svelte";
  import Button from "$lib/ui/comps/buttons/Button.svelte";
  import Icon from "$lib/ui/comps/Icon.svelte";
  import Container from "$lib/ui/comps/layouts/Container.svelte";
  import CommentItem from "./CommentItem.svelte";
  import { CommentsState } from "./CommentsState.svelte";

  interface Props {
    recipe_id: string;
  }

  const { recipe_id }: Props = $props();

  // svelte-ignore state_referenced_locally
  const comments = new CommentsState(recipe_id);

  // Queried after the page has rendered so it never delays the recipe itself.
  onMount(() => comments.load());
</script>

<section class="space-y-4">
  <div>
    <h2 class="headline-lg text-primary text-2xl sm:text-3xl mt-2">Gemeenskaps Kommentaar</h2>
    <p class="text-neutral-900 text-sm">Wat ander mense sê oor hierdie resep</p>
  </div>

  <Button onclick={() => comments.openForm()}>
    <Icon name="comment" size={20} />
    <span>Lewer Kommentaar</span>
  </Button>

  <p class="text-sm text-neutral-600 font-medium" hidden={comments.loading || !!comments.load_error}>
    {comments.summary.comments}
    {comments.summary.comments === 1 ? "kommentaar" : "kommentare"} · 👍 {comments.summary.thumbs_up}
    {comments.summary.thumbs_up === 1 ? "duim" : "duime"}
  </p>

  <Container class="px-4">
    <p class="py-4 text-sm text-neutral-600" hidden={!comments.loading}>Laai kommentaar...</p>
    <p class="py-4 text-sm text-red-600" hidden={!comments.load_error}>{comments.load_error}</p>
    <p class="py-4 text-sm text-neutral-600" hidden={comments.loading || !!comments.load_error || !!comments.items.length}>
      Wees die eerste om kommentaar te lewer.
    </p>

    <ul class="divide-y divide-primary-200" hidden={!comments.items.length}>
      {#each comments.items as comment (comment.id)}
        <CommentItem {comment} />
      {/each}
    </ul>
  </Container>
</section>
