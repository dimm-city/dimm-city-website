<script lang="ts">
	import Shell from '$lib/Components/Shell.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import CharacterMenu from '$lib/Characters/Components/CharacterMenu.svelte';
</script>

<Shell title="Citizen Files" enableSearch="{true}" fullscreen={false}>
	<ContentPane padding={0}>
		<CharacterMenu />
	</ContentPane>
</Shell>
