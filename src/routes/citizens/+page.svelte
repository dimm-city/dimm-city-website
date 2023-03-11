<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import CharacterMenu from '$lib/Characters/Components/CharacterMenu.svelte';
</script>

<Shell title="Citizen Files" enableSearch="{true}" fullscreen={false}>
	<ContentPane padding={1}>
		<CharacterMenu />
	</ContentPane>
</Shell>
