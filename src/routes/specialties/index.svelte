<script lang="ts">
	import Shell from '$lib/Components/Shell.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import { showMenu } from '$lib/Shared/ShellStore';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import SpecialtyMenu from '$lib/Specialties/SpecialtyMenu.svelte';
	$showMenu = true;
</script>

<Shell title="Specialties" showMenuButton={false}>
	<ContentPane>
		<Menu />
	</ContentPane>
	<Menu slot="menu">
		<SpecialtyMenu />
	</Menu>
</Shell>
