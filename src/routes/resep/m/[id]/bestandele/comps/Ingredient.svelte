<script lang="ts">
  interface Props {
    data: {
      title: string;
      amount: number;
      unit: string;
      comments: string[];
    };
  }

  const { data, ...rest }: Props & Record<string, any> = $props();
</script>

<label {...rest} class={["grid grid-cols-[auto_1fr] gap-2 cursor-pointer has-checked:opacity-50", rest.class]}>
  <div>
    <input type="checkbox" class="mt-0.5 size-5 shrink-0 accent-primary-600" />
  </div>
  <div>
    <div class="font-bold flex justify-between items-center">
      <span>{data.title}</span>
      <span class="text-primary">{data.amount} {data.unit}</span>
    </div>
    <span class="italics" hidden={!data.comments.length}
      ><span class="font-semibold">Wenk: </span>{data.comments.map((comment) => comment).join("; ")}</span
    >
  </div>
</label>
