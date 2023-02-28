<script lang="ts">
	import ListItemLink from './ListItemLink.svelte';

	export let data: Array<any> = [];
	export let maxHeight = 'auto';
	export let maxItems = 5;
	export let viewAllLink: String;

	let items: any[] = [];
	$: if (data && data?.length > maxItems) {
		items = [...data?.slice(0, maxItems)];
	} else if(data?.length > 0) {
		items = [...data?.slice(0, data?.length)];
	} else {
		items = [];
	}
</script>

<div class="list">
	{#if items && items.length > 0}
		{#each items as item}
			<div class="list-item" data-augmented-ui>
				<slot name="item" {item}>{item.name}</slot>
			</div>
		{/each}
		{#if viewAllLink > ''}
			<div class="list-item" data-augmented-ui>
				<ListItemLink url={viewAllLink} text="View All" />
			</div>
		{/if}
	{:else}
		<div class="list-item" data-augmented-ui>No items found</div>
	{/if}
</div>

<style>
	div.list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-block: 1rem;
	}
	.list-item {
		padding: 1rem;
		--aug-clip-tl1: initial;
		--aug-clip-tr1: initial;
		--aug-clip-bl1: initial;
		--aug-clip-br1: initial;
		--aug-border: initial;
		--aug-border-all: 1px;
		--aug-tl1: 0.5rem;
		--aug-tr1: 1rem;
		--aug-br1: 0.5rem;
		--aug-bl1: 0.5rem;
		--aug-border-bg: radial-gradient(circle at top left, var(--pink) 40px, transparent 50px),
			radial-gradient(circle at top right, var(--blue) 20px, transparent 30px),
			radial-gradient(circle at bottom right, var(--pink) 40px, transparent 50px),
			radial-gradient(circle at bottom left, var(--blue) 20px, transparent 30px);

		--aug-inlay: initial;
		--aug-inlay-bg: #ffffff1e;
	}

	.list-item:hover,
	.list-item:focus {
		color: var(--pink);
		--aug-inlay-bg: transparent;
		background: #050505b4;
		transition: background 500ms;
	}
</style>
