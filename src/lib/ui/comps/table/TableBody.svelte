<script>
    const { children, pagination = false, ...rest } = $props();
</script>

<div
        {...rest}
		class={['contents overflow-x-hidden ', {
			"overflow-y-hidden!": pagination,
			"overflow-y-auto max-h-60": !pagination
		}, rest.class]}
		
		style="grid-row: 2; grid-column: 1 / -1; {rest.style || ''}"
	>
		<div
			class={['grid last:rounded-b-lg *:ring *:ring-slate-200', {
			"overflow-y-hidden!": pagination,
			"overflow-y-auto max-h-60": !pagination
		}, rest.class]}
			style="grid-template-columns: subgrid; grid-column: 1 / -1; {rest.style || ''}"
		>
			{@render children()}
		</div>
	</div>