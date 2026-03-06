<script>
	const { children, ...rest } = $props();
</script>

<div {...rest} class={["grid bg-slate-50 border-b border-slate-200 text-body-sm rounded-t-lg font-medium", rest.class]} style="grid-template-columns: subgrid; grid-column: 1 / -1;">
	{@render children()}
</div>
