<script>
	const { children, ...rest } = $props();
</script>

<div {...rest} class={["grid", rest.class]} style="grid-template-columns: subgrid; grid-column: 1 / -1;">
	{@render children()}
</div>
