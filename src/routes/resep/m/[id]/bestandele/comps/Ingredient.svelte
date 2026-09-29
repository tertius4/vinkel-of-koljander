<script lang="ts">
  interface Props {
    data: {
      title: string;
      amount: string;
      unit: string;
      comments: string[];
    };
    checked?: boolean;
    onchange?: (value: boolean) => void;
  }

  const { data, checked = false, onchange, ...rest }: Props & Record<string, any> = $props();

  function handleChange(event: Event) {
    onchange?.((event.target as HTMLInputElement).checked);
  }
</script>

<label {...rest} class={["grid grid-cols-[auto_1fr] gap-3 cursor-pointer has-checked:opacity-50", rest.class]}>
  <div>
    <input type="checkbox" {checked} onchange={handleChange} class="size-6 rounded shrink-0 accent-primary-600" />
  </div>
  <div>
    <div class="font-bold text-lg flex justify-between items-center gap-2">
      <span>{data.title}</span>
      <span class="text-primary text-base text-nowrap">{data.amount} {data.unit}</span>
    </div>
    <span class="italic text-neutral-900" hidden={!data.comments.length}
      ><span class="font-semibold not-italic">Wenk:</span> {data.comments.join("; ")}</span
    >
  </div>
</label>
