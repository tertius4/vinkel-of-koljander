<script>
	import { InputText } from "../inputs";
	import Icon from "../media/Icon.svelte";

    /**
     * @typedef {Object} Props
     * @property {string} [search_text]
     * @property {(text: string) => void} onsearch
     */

    /** @type {Props & Record<string, any>} */
    const { search_text = '', onsearch, ...rest } = $props();
</script>

<div {...rest} class={["relative", rest.class]}>
	<InputText
		id="search"
		value={search_text}
		placeholder="Search…"
		oninput={(/** @type {{ target: { value: string; }; }} */ event) => onsearch(event.target.value)}
		class="pr-5"
	/>

    <button
        class:hidden={!search_text}
        class="absolute top-0 right-2 text-slate-400 hover:text-slate-600 flex items-center justify-center h-full outline-none focus:scale-110 focus:text-black transition-all"
        type="button"
        onclick={() => {
            onsearch('');
            // Focus on the input after clearing
            document.getElementById('search')?.focus();
        }}
    >
        <Icon icon="fa fa-xmark" />
    </button>

    <div
        class="absolute top-0 right-2 text-slate-400 h-full flex items-center justify-center pointer-events-none"
        class:hidden={!!search_text}
    >
        <Icon icon="fa fa-magnifying-glass" />
    </div>
</div>