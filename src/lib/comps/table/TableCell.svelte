<script>
	const { children, ...rest } = $props();
</script>

<div
	{...rest}
	class={[
		'p-2 transition-all',
		rest.class ?? ''
	]}
>
	{@render children()}
</div>
