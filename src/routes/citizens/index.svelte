<script lang="ts">
	import Shell from '$lib/Components/NewShell.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import CharacterMenu from '$lib/Characters/Components/CharacterMenu.svelte';
</script>

<Shell title="Citizen Files" enableSearch="{true}">
	<ContentPane>
		<CharacterMenu />
	</ContentPane>
</Shell>
