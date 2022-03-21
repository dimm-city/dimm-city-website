<Shell title="Home" showMenuButton={true} showMainMenuButton={false}>
	<ContentPane>
		<div style="overflow: hidden; max-height: 100%"><D20 /></div>
	</ContentPane>
	<MainMenu slot="menu" />
</Shell>

<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import MainMenu from '$lib/Components/Menu/MainMenu.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';

	import D20 from '$lib/Components/d20.svelte';
	import { showMenu } from '$lib/ShellStore';

	$showMenu = false;
</script>
