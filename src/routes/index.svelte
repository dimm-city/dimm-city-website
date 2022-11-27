<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { config } from '$lib/Shared/config';
	import Shell from '$lib/Components/Shell.svelte';
	import MainMenu from '$lib/Components/Menu/MainMenu.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import { showMenu } from '$lib/Shared/ShellStore';
	import MenuItem from '$lib/Components/Menu/MenuItem.svelte';
	import TextContainer from '$lib/Components/TextContainer.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import Dashboard from '$lib/Dashboard/Dashboard.svelte';
	$showMenu = false;

	let currentText = 'op-console';
	function updateText(key: string) {
		currentText = key == '' ? 'op-console' : key;
	}
</script>

<Shell title="DCC Dashboard" fullscreen={true}>
	<ContentPane padding={0}>
		<Dashboard />
	</ContentPane>
</Shell>
