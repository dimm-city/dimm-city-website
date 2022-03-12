<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import MainMenu from '$lib/Menu/MainMenu.svelte';
	import { showMenu } from '$lib/ShellStore';
	$showMenu = false;
</script>

<Shell title="Help">
	<div>Need help?</div>
	<MainMenu slot="menu" />
</Shell>
