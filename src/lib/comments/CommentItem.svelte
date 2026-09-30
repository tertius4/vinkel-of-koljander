<script lang="ts">
  import type { CommentView } from "$lib/api/comments";

  interface Props {
    comment: CommentView;
  }

  const { comment }: Props = $props();
</script>

<li class="grid grid-cols-[auto_1fr] gap-3 py-3">
  <div class="size-9 flex items-center justify-center rounded-lg bg-secondary-200 text-secondary-900 font-bold text-md">
    {comment.initials}
  </div>
  <div class="min-w-0">
    <div class="flex items-center gap-2 flex-wrap">
      <span class="font-semibold text-black text-sm wrap-break-word">{comment.name}</span>
      <span class="text-neutral-600 text-xs">{comment.when}</span>
      <span class="ml-auto text-sm" hidden={!comment.thumbs_up} title="Duimpie" aria-label="Duimpie">👍</span>
    </div>
    <p class="text-neutral-800 text-sm whitespace-pre-line wrap-break-word" hidden={!comment.text}>{comment.text}</p>
  </div>
</li>
