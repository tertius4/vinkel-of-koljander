<script>
    const { children, ...rest } = $props();
</script>

<div {...rest} class={["col-span-full bg-slate-50 border-t border-slate-200 text-body-sm rounded-b-lg font-medium", rest.class]}>
    {@render children()}
</div>