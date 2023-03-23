<script lang="ts">
	import ListItemLink from './ListItemLink.svelte';

	export let data: Array<any> = [];
	export let maxItems = 5;
	export let viewAllLink: String = "";
	export let noItemsText = "No items found";

	let items: any[] = [];
	$: if (data && maxItems > 0 && data?.length > maxItems) {
		items = [...data?.slice(0, maxItems)];
	} else if (data?.length > 0) {
		items = [...data?.slice(0, data?.length)];
	} else {
		items = [];
	}
</script>

<div class="list">
	{#if items && items.length > 0}
		{#each items as item}
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
	div.list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-block: 1rem;
	}

</style>
