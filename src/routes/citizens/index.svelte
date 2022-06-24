<script lang="ts">
	import Shell from '$lib/Components/Shell.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import MenuItem from '$lib/Components/Menu/MenuItem.svelte';
	import { showMenu } from '$lib/Shared/ShellStore';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import CharacterMenu from '$lib/Characters/Components/CharacterMenu.svelte';
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
