<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import Menu from '$lib/Menu/Menu.svelte';
	import MenuItem from '$lib/Menu/MenuItem.svelte';
	import { showMenu } from '$lib/ShellStore';
	import ContentPane from '$lib/ContentPane.svelte';
	import CharacterMenu from '$lib/Characters/CharacterMenu.svelte';
	$showMenu = true;
</script>

<Shell title="Citizens" showMenuButton={false}>
	<ContentPane>
		<Menu />
	</ContentPane>
	<Menu slot="menu">
		<CharacterMenu />
	</Menu>
</Shell>
