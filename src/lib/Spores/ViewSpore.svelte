<script lang="ts">
	import BackCoverPanel from './Components/BackCoverPanel.svelte';
	import CharacterPanel from './Components/CharacterPanel.svelte';
	import DicePanel from './Components/DicePanel.svelte';
	import DreamGuidePanel from './Components/DreamGuidePanel.svelte';
	import DreamMasterPanel from './Components/DreamMasterPanel.svelte';
	import FrontCoverPanel from './Components/FrontCoverPanel.svelte';
	import type { Spore } from './Spore';
	export let spore: Spore;
</script>

<div>
	<section class="page">
		<div class="col dream-guide">
			<DreamGuidePanel {spore} />
		</div>
		<div class="col back">
			<BackCoverPanel />
		</div>
		<div class="col front">
			<FrontCoverPanel {spore} />
		</div>
	</section>
	<section class="page">
		<div class="col character">
			<CharacterPanel />
		</div>
		<div class="col dice">
			<DicePanel />
		</div>
		<div class="col dream-master">
			<DreamMasterPanel {spore} />
		</div>
	</section>
</div>
