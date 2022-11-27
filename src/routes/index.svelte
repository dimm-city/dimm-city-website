<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Shell from '$lib/Components/Shell.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import { showMenu } from '$lib/Shared/ShellStore';
	import Dashboard from '$lib/Dashboard/Dashboard.svelte';
	$showMenu = false;
</script>

<Shell title="DCC Dashboard" fullscreen={true}>
	<ContentPane padding={0}>
		<Dashboard />
	</ContentPane>
</Shell>
