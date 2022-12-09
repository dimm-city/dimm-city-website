<script context="module">
	export const prerender = false;
</script>

<script>
	import { page } from '$app/stores';
	import ImportCharacter from '$lib/Characters/ImportCharacter.svelte';
	import CharacterMenu from '$lib/Characters/Components/CharacterMenu.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Menu from '$lib/Shared/Components/Menu/Menu.svelte';
	import Shell from '$lib/Shared/Components/Shell.svelte';
	let tokenId = $page.params.tokenId;
</script>

<Shell title="Citizens" fullscreen={true}>
	<ContentPane>
		<ImportCharacter {tokenId} />
	</ContentPane>
	<Menu slot="menu">
		<CharacterMenu on:character.selected={(t) => (tokenId = t.detail)} />
	</Menu>
</Shell>
