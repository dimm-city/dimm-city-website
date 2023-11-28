<script>
	import List from '$lib/Shared/Components/List.svelte';

	/**
	 * @type {DC.Character}
	 */
	export let character;

	/**
	 * @param {any} item
	 */
	function viewItem(item) {}
</script>

<div class="gear-container">
	<div class="items-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
		<h3 class="section-title">Items</h3>
		<List data={character.attributes.items?.data} maxItems={-1} noItemsText="no inventory recorded">
			<div let:item slot="item">
				<button data-augmented-ui class="aug-button" on:click={() => viewItem(item)}
					>{item.attributes.name}</button
				>
			</div>
		</List>
	</div>
	<div class="scripts-container" data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
		<h3 class="section-title">Scripts</h3>
		<List data={character.attributes.scripts?.data} maxItems={-1} noItemsText="no scripts recorded">
			<div let:item slot="item">
				<button data-augmented-ui class="aug-button" on:click={() => viewItem(item)}
					>{item.attributes.name}</button
				>
			</div>
		</List>
	</div>
</div>

<style>
	:global(.list) {
		--list-gap: 0.5rem;
		padding-inline: 0.5rem;
	}
    .gear-container {        
        display: grid;
        gap: 1rem;
    }
	.gear-container > div {
		position: relative;
        min-height: 10rem;
		text-align: start;
		padding-inline: 1.25rem;
		--aug-border-all: 1px;
		--aug-border-bg: var(--fourth-accent);
	}
	h3 {
		margin: 0;
		color: var(--fourth-accent);
		margin-top: 0.25rem;
		justify-content: start;
		padding-inline-start: 0.5em;
	}

	button {
		--aug-border-bg: var(--menu-item-aug-border-bg);
		width: 100%;
		font-size: 0.8rem;
	}
</style>
