<script lang="ts">
	import CharacterPanel from './Components/CharacterPanel.svelte';
	import DicePanel from './Components/DicePanel.svelte';
	import DreamGuidePanel from './Components/DreamGuidePanel.svelte';
	import DreamMasterPanel from './Components/DreamMasterPanel.svelte';
	import FrontCoverPanel from './Components/FrontCoverPanel.svelte';
	import { getSpore } from '$lib/Spores/Queries/getSpore';
	import { Spore } from './Spore';
	import Button from '$lib/Shared/Components/Button.svelte';
	export let slug: string;
	let spore: Spore = new Spore();
	if (slug > '') {
		getSpore(slug).then((s) => {
			spore = s;
			console.log(spore);
		});
	}
</script>

<style>
	:global(.print-only) {
		display: none;
	}
	.toolbar{
		display: flex;
		justify-content: flex-end;
	}
</style>

{#if spore}
	<div class="toolbar">
		<Button target="_blank" url={'/spores/' + spore.slug + '/print'}>Print</Button>
	</div>

	<div class="col front">
		<FrontCoverPanel {spore} />
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
