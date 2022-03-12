<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import MainMenu from '$lib/Menu/MainMenu.svelte';
	import { showMenu } from '$lib/ShellStore';
</script>

<Shell title="Console">
	<div>Connection</div>
	<MainMenu slot="menu" />
</Shell>
