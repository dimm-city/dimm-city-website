<script>
	import ListItemLink from './ListItemLink.svelte';

	/**
	 * @type {any[]}
	 */
	export let data = [];
	export let maxItems = 5;
	export let viewAllLink = '';
	export let noItemsText = 'No items found';

	/**
	 * @type {ArrayLike<any>}
	 */
	let items = [];
	$: if (data && maxItems > 0 && data?.length > maxItems) {
		items = [...data?.slice(0, maxItems)];
	} else if (data?.length > 0) {
		items = [...data?.slice(0, data?.length)];
		//console.log('list items', viewAllLink, items);
	} else {
		items = [];
	}

</script>

<div class="list">
	{#if items && items.length > 0}
		{#each items as item (item)}
			<slot name="item" {item}>
				<ListItemLink url="" text={item.name} />
			</slot>
		{/each}
		{#if viewAllLink > ''}
			<div class="list-item" data-augmented-ui>
				<ListItemLink url={viewAllLink} text="View All" />
			</div>
		{/if}
	{:else}
		<div class="list-item" data-augmented-ui>{noItemsText}</div>
	{/if}
</div>

<style>
	:root {
		--list-gap: 1rem;
	}
	.list {
		display: flex;
		flex-direction: column;
		gap: var(--list-gap) 1rem;
		margin-block: var(--list-gap) 1rem;
	}
</style>
