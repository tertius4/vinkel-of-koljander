<script>

const { children, ...rest } = $props();
</script>

<div {...rest} style="display: grid; grid-template-columns: subgrid; grid-column: 1 / -1;">
	{@render children()}
</div>
