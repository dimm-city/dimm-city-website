<script>
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import List from '$lib/Shared/Components/List.svelte';
	import { openModal } from 'svelte-modals';

	import { selectedCharacter } from './BuilderStore.js';
	import InventoryItemModal from './InventoryItemModal.svelte';

	/**
	 * @param {any} item
	 */
	function viewItem(item) {
		selectedInventoryItem = item;
		isEditingInventory = true;
	}
	/**
	 * @type {any}
	 */
	let selectedInventoryItem;
	let isEditingInventory = false;
	function addItem() {
		viewItem({ id: null, text: '', item: { data: null } });
	}
</script>

<InventoryItemModal bind:data={selectedInventoryItem} bind:show={isEditingInventory} isEditing={isEditingInventory} />
<ContentPane scrollable={true}>
	{#if $selectedCharacter}
		<div class="section-container">
			<section data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
				<h3 class="section-title">Items</h3>
				<button on:click={() => addItem()} class="aug-button">Add Item</button>
				<List
					data={$selectedCharacter?.attributes.inventory}
					maxItems={-1}
					noItemsText="no inventory recorded"
				>
					<div let:item slot="item">
						{#if item.item?.data?.attributes}
							<button data-augmented-ui class="aug-button" on:click={() => viewItem(item)}>
								{item.item?.data.attributes.name ?? 'Unknown'}
							</button>
						{:else}
							<button data-augmented-ui class="aug-button" on:click={() => viewItem(item)}>
								{item.text}
							</button>
						{/if}
					</div>
				</List>
			</section>
			<section data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
				<h3 class="section-title">Cybernetics</h3>
				<List
					data={$selectedCharacter?.attributes.cybernetics?.data}
					maxItems={-1}
					noItemsText="no cybernetics detected"
				>
					<div let:item slot="item">
						<button data-augmented-ui class="aug-button" on:click={() => viewItem(item)}
							>{item.attributes.name}</button
						>
					</div>
				</List>
			</section>
			<section data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
				<h3 class="section-title">Scripts</h3>
				<List
					data={$selectedCharacter.attributes.scripts?.data}
					maxItems={-1}
					noItemsText="no scripts detected"
				>
					<div let:item slot="item">
						<button data-augmented-ui class="aug-button" on:click={() => viewItem(item)}
							>{item.attributes.name}</button
						>
					</div>
				</List>
			</section>
		</div>
	{/if}
</ContentPane>

<style>
	.section-container {
		position: relative;
		padding-top: 1.5rem;
		padding-bottom: 3rem;
		padding-inline: 1.5rem;
		display: grid;
		grid-template-columns: 1fr;
		width: 100%;
		gap: 3rem;
	}

	:global(.list) {
		--list-gap: 0.5rem;
		padding-inline: 0.5rem;
	}

	section {
		min-height: 10rem;
		display: grid;
		grid-template-rows: min-content 1fr;
		text-align: start;
		padding-inline: 1.25rem;
		--aug-border-all: 1px;
		--aug-border-bg: var(--fourth-accent);
		align-items: start;
		align-content: stretch;
		height: 100%;
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
