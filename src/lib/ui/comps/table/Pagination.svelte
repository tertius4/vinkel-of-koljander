<script>
	import { Icon } from '$comps/elements/media';

	/**
	 * @typedef {Object} Props
	 * @property {number} skip - Current offset
	 * @property {number} limit - Items per page
	 * @property {number} total_count - Total number of items
	 * @property {(skip: number) => void} onpagechange - Callback when page changes
	 */

	/** @type {Props} */
	const { skip, limit, total_count, onpagechange } = $props();

	const current_page = $derived(Math.floor(skip / limit) + 1);
</script>

<div class="text-body-sm flex items-center gap-0.5 text-slate-600">
	<button
		onclick={() => {
			if (skip == 0) return;
			onpagechange(0);
		}}
		type="button"
		class="group flex aspect-square h-5 w-5 items-center justify-center rounded-full p-1 transition-colors outline-none hover:bg-slate-200 hover:text-black focus:bg-slate-200 focus:text-black"
	>
		<Icon
			icon="far fa-sharp fa-arrow-left-to-line"
			class="transition-scale group-focus:scale-110"
		/>
	</button>
	<button
		onclick={() => {
			if (skip == 0) return;
			onpagechange(skip - limit);
		}}
		type="button"
		class="group flex aspect-square h-5 w-5 items-center justify-center rounded-full p-1 transition-colors outline-none hover:bg-slate-200 hover:text-black focus:bg-slate-200 focus:text-black"
	>
		<Icon icon="far fa-sharp fa-arrow-left" class="transition-scale group-focus:scale-110" />
	</button>
	<div class="w-3 text-center text-black">
		<!-- PAGE NUMBER -->
		{current_page}
	</div>
	<button
		onclick={() => {
			if (skip + limit >= total_count) return;
			onpagechange(skip + limit);
		}}
		type="button"
		class="group flex aspect-square h-5 w-5 items-center justify-center rounded-full p-1 transition-colors outline-none hover:bg-slate-200 hover:text-black focus:bg-slate-200 focus:text-black"
	>
		<Icon icon="far fa-sharp fa-arrow-right" class="transition-scale group-focus:scale-110" />
	</button>
	<button
		onclick={() => {
			if (skip + limit >= total_count) return;
			onpagechange(total_count - (total_count % limit));
		}}
		type="button"
		class="group flex aspect-square h-5 w-5 items-center justify-center rounded-full p-1 transition-colors outline-none hover:bg-slate-200 hover:text-black focus:bg-slate-200 focus:text-black"
	>
		<Icon
			icon="far fa-sharp fa-arrow-right-to-line"
			class="transition-scale group-focus:scale-110"
		/>
	</button>
</div>
