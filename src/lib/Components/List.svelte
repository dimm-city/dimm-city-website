<script lang="ts">
	export let data;
    export let maxHeight = "auto";
</script>

<style>
	div.list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
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
</style>

<div class="list" >
	{#if data && data.length > 0}
		{#each data as item}
			<div class="list-item" data-augmented-ui>{item.name}</div>
		{/each}
	{:else}
		<div class="list-item" data-augmented-ui>No items found</div>
	{/if}
</div>
