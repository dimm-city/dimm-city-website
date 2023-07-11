<script lang="ts">
	import CharacterPanel from './Components/CharacterPanel.svelte';
	import DicePanel from './Components/DicePanel.svelte';
	import DreamGuidePanel from './Components/DreamGuidePanel.svelte';
	import DreamMasterPanel from './Components/DreamMasterPanel.svelte';
	import { getSpore } from '$lib/Spores/Queries/getSpore';
	import { Spore } from './Spore';
	import { pageTitle } from '$lib/Shared/Stores/ShellStore';
	export let slug: string;
	let spore: Spore = new Spore();
	if (slug > '') {
		getSpore(slug).then((s) => {
			spore = s;
			$pageTitle = `${spore.name} Spore`;
		});
	}
</script>

{#if spore}
	<div class="toolbar">
		<a
			href={'/spores/' + spore.slug + '/print'}
			data-augmented-ui
			class="aug-button"
			target="_blank">Print</a
		>
	</div>

	<div class="col front">
		<div class="panel front-cover" data-augmented-ui>
			<div class="container" data-update>
				<h1>{spore.name}</h1>
				<h3>{spore.subtitle}</h3>
				{@html spore.introduction}
			</div>
		</div>
	</div>
	<div class="col dream-guide">
		<hr />
		<DreamGuidePanel {spore} />
	</div>
	<div class="col character">
		<CharacterPanel />
	</div>
	<div class="col dice">
		<hr />
		<DicePanel />
	</div>
	<div class="col dream-master">
		<hr />
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
