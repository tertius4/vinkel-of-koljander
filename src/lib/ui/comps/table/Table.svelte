<script>
	const { children, ...rest } = $props();
</script>


<div {...rest} class={["rounded-lg border border-slate-200 overflow-hidden", rest.class]}>
	{@render children()}
</div>