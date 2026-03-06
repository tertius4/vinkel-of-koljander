<script>
	/**
	 * @typedef {Object} Props
	 * @property {TableColumn[]} headings - Array of heading titles for the table.
	 */

	/** @type {Props & Record<string, any>} */
	const { children, headings, ...rest } = $props();

	const heading_info = $derived({ width: headings.map(({ width }) => width || '1fr').join(' ') });
</script>

<div class="table-wrapper w-full overflow-x-auto">
	<div
		{...rest}
		class={['grid', rest.class || '']}
		style="grid-template-columns: {heading_info.width}; grid-template-rows: auto 1fr; {rest.style ||
			''}"
	>
		{@render children()}
	</div>
</div>
