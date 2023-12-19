<script>
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import { selectedCharacter } from './BuilderStore.js';
	import ListEditor from './ListEditor.svelte';
	import { getItems, updateInventoryItem } from '$lib/Shared/Stores/getItems.js';
	import { getCybernetics, updateCyberneticsItem } from '$lib/Shared/Stores/cybernetics.js';
	import { getScripts, updateScriptsItem } from '$lib/Shared/Stores/scripts.js';
	import { updateEntity } from '$lib/Shared/SvelteStrapi.js';

	/**
	 * @type {ListEditor}
	 */
	let inventoryEditor;
	/**
	 * @type {ListEditor}
	 */
	let cyberneticsEditor;
	/**
	 * @type {ListEditor}
	 */
	let scriptsEditor;

	/**

	 * @param {any} data
	 */
	export async function updateListItem(data) {
		//if (ownsToken(data.attributes.tokenId)) {

		if (!$selectedCharacter) return;

		const importData = JSON.parse(JSON.stringify(data));
		importData.id = $selectedCharacter.id;

		await updateEntity('dimm-city/characters', {
			...importData
		})
			.then(() => {
				console.log('character saved', importData);
			})
			.catch((reason) => {
				console.error('Error updating citizen file', reason);
			});

		//}
	}
</script>

<ContentPane scrollable={true}>
	{#if $selectedCharacter}
		<div class="section-container">
			<section data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
				<h3 class="section-title">Inventory</h3>
				<button on:click={() => inventoryEditor.addItem()} class="aug-button" data-augmented-ui
					>Add Item</button
				>
				<ListEditor
					bind:this={inventoryEditor}
					bind:data={$selectedCharacter.attributes.inventory}
					saveChanges={(d) =>
						updateListItem({
							inventory: [...d]
						})}
					{getItems}
				/>
			</section>
			<section data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
				<h3 class="section-title">Cybernetics</h3>
				<button on:click={() => cyberneticsEditor.addItem()} class="aug-button" data-augmented-ui
					>Add Item</button
				>
				<ListEditor
					bind:this={cyberneticsEditor}
					bind:data={$selectedCharacter.attributes.cybernetics}
					getItems={getCybernetics}
					saveChanges={(d) =>
						updateListItem({
							cybernetics: [...d]
						})}
					noItemsText="no cybernetics detected"
				/>
			</section>
			<section data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
				<h3 class="section-title">Scripts</h3>
				<button on:click={() => scriptsEditor.addItem()} class="aug-button" data-augmented-ui
					>Add Item</button
				>
				<ListEditor
					bind:this={scriptsEditor}
					bind:data={$selectedCharacter.attributes.scripts}
					getItems={getScripts}
					saveChanges={(d) =>
						updateListItem({
							scripts: [...d]
						})}
					noItemsText="no scripts detected"
				/>
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
