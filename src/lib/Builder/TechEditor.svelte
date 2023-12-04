<script>
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import List from '$lib/Shared/Components/List.svelte';

	import { selectedCharacter } from './BuilderStore.js';

	/**
	 * @param {any} item
	 */
	function viewItem(item) {}
</script>

<ContentPane scrollable={true}>
	<div class="section-container">
		<section data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
			<h3 class="section-title">Items</h3>
			<List
				data={character.attributes.items?.data}
				maxItems={-1}
				noItemsText="no inventory recorded"
			>
				<div let:item slot="item">
					<button data-augmented-ui class="aug-button" on:click={() => viewItem(item)}
						>{item.attributes.name}</button
					>
				</div>
			</List>
		</section>
		<section data-augmented-ui="tl-clip tr-clip br-clip bl-clip border">
			<h3 class="section-title">Cybernetics</h3>
			<List
				data={character.attributes.cybernetics?.data}
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
				data={character.attributes.scripts?.data}
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
