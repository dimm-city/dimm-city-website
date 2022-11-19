<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Shell from '$lib/Components/Shell.svelte';
	import MainMenu from '$lib/Components/Menu/MainMenu.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';

	import D20 from '$lib/Components/Dice/d20.svelte';
	import { showMenu } from '$lib/Shared/ShellStore';

	$showMenu = false;
</script>

<Shell title="Home">
	<ContentPane>
		<div style="overflow: hidden; max-height: 100%"><D20 /></div>
	</ContentPane>
	<MainMenu slot="menu" />
</Shell>
