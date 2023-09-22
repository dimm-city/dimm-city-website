<script>
	import CharacterPanel from './Components/CharacterPanel.svelte';
	import DicePanel from './Components/DicePanel.svelte';
	import DreamGuidePanel from './Components/DreamGuidePanel.svelte';
	import DreamMasterPanel from './Components/DreamMasterPanel.svelte';
	import { pageTitle } from '$lib/Shared/Stores/ShellStore';
		/**
	 * @type {DC.Spore}
	 */
	export let spore;
	$: if (spore) {
		$pageTitle = `Print ${spore.attributes.name} Spore`;
	}
</script>

{#if spore}
	<div class="toolbar">
		<a
			href={'/spores/' + spore.attributes.slug + '/print'}
			data-augmented-ui
			class="aug-button"
			target="_blank">Print</a
		>
	</div>

	<div class="col front">
		<div class="panel front-cover" data-augmented-ui>
			<div class="container" data-update>
				<h1>{spore.attributes.name}</h1>
				<h3>{spore.attributes.subtitle}</h3>
				{@html spore.attributes.introduction}
			</div>
		</div>
	</div>
	<div class="col dream-guide">
		<DreamGuidePanel {spore} />
	</div>
	<div class="col character">
		<CharacterPanel />
	</div>
	<div class="col dice">
		<DicePanel />
	</div>
	<div class="col dream-master">
		<DreamMasterPanel {spore} />
	</div>
{/if}

<style>
	:global(.print-only) {
		display: none;
	}
	.toolbar {
		display: flex;
		justify-content: flex-end;
	}
</style>
