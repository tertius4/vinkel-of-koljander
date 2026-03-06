<script>
	const { children, ...rest } = $props();
</script>

<div
	{...rest}
	class={[
		'p-2 transition-all hover:bg-gray-50',
		rest.class ?? ''
	]}
>
	{@render children()}
</div>
