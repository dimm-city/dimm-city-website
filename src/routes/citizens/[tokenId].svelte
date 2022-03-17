<script context="module">
	export const prerender = false;
</script>

<script>
	import { page } from '$app/stores';
	import Character from '$lib/Characters/Character.svelte';
	import CharacterMenu from '$lib/Characters/CharacterMenu.svelte';
	import ContentPane from '$lib/ContentPane.svelte';
	import Menu from '$lib/Menu/Menu.svelte';
	import Shell from '$lib/Shell.svelte';
	import { showMenu } from '$lib/ShellStore';

	$showMenu = false;
	let tokenId = $page.params.tokenId;
</script>

<Shell title="Citizens">
	<ContentPane>
		<Character {tokenId} />
	</ContentPane>
	<Menu slot="menu">
		<CharacterMenu on:character.selected={(t) => (tokenId = t.detail)} />
	</Menu>
</Shell>
