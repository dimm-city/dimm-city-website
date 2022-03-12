<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import MainMenu from '$lib/Menu/MainMenu.svelte';
	import ContentPane from '$lib/ContentPane.svelte';
</script>

<Shell title="Home" showMenuButton={false} showMainMenuButton={false}>
	<ContentPane>&nbsp;</ContentPane>
	<MainMenu slot="menu" />
</Shell>
