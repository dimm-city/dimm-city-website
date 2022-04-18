<script context="module">
	export const prerender = false;
</script>

<script>
	import { page } from '$app/stores';
	import ImportToken from '$lib/Characters/ImportCharacter.svelte';
	import CharacterMenu from '$lib/Characters/Components/CharacterMenu.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import Shell from '$lib/Shell.svelte';
	import { showMenu } from '$lib/ShellStore';

	$showMenu = false;
	let tokenId = $page.params.tokenId;
</script>

<Shell title="Citizens" fullscreen={true}>
	<ContentPane>
		<ImportToken {tokenId} />
	</ContentPane>
	<Menu slot="menu">
		<CharacterMenu on:character.selected={(t) => (tokenId = t.detail)} />
	</Menu>
</Shell>
