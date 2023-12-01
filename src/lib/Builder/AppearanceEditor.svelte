<script>
	import StatsEditor from './StatsEditor.svelte';
	import ImageEditor from './ImageEditor.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';

	/**
	 * @type {DC.Character}
	 */
	export let character;
</script>

<ContentPane scrollable={true}>
	<div class="appearance-row">
		<div class="image-cell">
			<div class="image">
				<ImageEditor bind:character />
			</div>
		</div>
		<div class="stats-container">
			<StatsEditor bind:character />
		</div>
	</div>
</ContentPane>

<style>
	.appearance-row {
		display: grid;
		height: 100%;
		width: 100%;
		grid-template-columns: min-content 1fr;
		grid-template-rows: min-content;
		padding-block: 1.25em;
		padding-inline: 1.25rem;
		column-gap: 2rem;
		row-gap: 1rem;
	}

	.image {
		--dc-image-aspect-ratio: 1/1;
		--dc-image-height: 320px;
		--dc-image-width: auto;
	}

	:global(.image > div) {
		--aug-b: 3px;
		--aug-l: 3px;
		--aug-t: 3px;
		--aug-tr: 7px;
		--aug-border-all: 2px;
		--aug-border-bg: var(--fourth-accent);
		margin: auto;
	}

	@media screen and (max-width: 900px) {
		.appearance-row {
			grid-template-columns: min-content 1fr;
			grid-template-rows: min-content auto;
		}
	}
	@media screen and (max-width: 767px) {
		.appearance-row {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: auto;
			row-gap: 0.5rem;
		}
		.image {
			padding: 0.5rem;
			--dc-image-aspect-ratio: 3/4;
			--dc-image-height: min-content;
			--dc-image-width: 75dvw;
		}

		:global(.image > div) {
			--aug-b: 3px;
			--aug-l: 3px;
			--aug-t: 3px;
			--aug-tr: 7px;
			--aug-border-all: 2px;
			--aug-border-bg: var(--fourth-accent);
		}
	}
</style>
