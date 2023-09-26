<script>
	import List from '$lib/Shared/Components/List.svelte';

	export let header = 'Items';
	export let noItemsText = 'No items found';

	export let viewItem = (/** @type {any} */ item) => {
		console.log(item);
	};
	/**
	 * @type {object[]}
	 */
	export let data = [];
</script>

<h3 class="section-title">{header}</h3>
<List {data} maxItems={-1} {noItemsText}>
	<div let:item slot="item">
		<button data-augmented-ui class="aug-button" on:click={() => viewItem(item)}
			>{item.attributes.name}</button
		>
	</div>
</List>

<style>
	:global(.list) {
		--list-gap: 0.5rem;
	}
	h3 {
		margin: 0;
		color: var(--fourth-accent);
		margin-top: 0.25rem;
	}



	button {
		--aug-border-bg: var(--menu-item-aug-border-bg);
		width: 100%;
		font-size: 0.8rem;
	}
</style>
