
<script lang="ts">
    // import Game from "$lib/RootTerminal/Game.svelte";
	import { Game } from "@dimm-city/dc-cyberwar";
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import SpecialtyMenu from '$lib/Specialties/SpecialtyMenu.svelte';
</script>

<Shell title="Dimm City: Cyberwar">
	<ContentPane>		
        <Game />
	</ContentPane>
</Shell>
