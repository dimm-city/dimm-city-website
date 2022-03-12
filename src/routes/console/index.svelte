<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import Menu from '$lib/Menu/Menu.svelte';
	import { showMenu, isConnected } from '$lib/ShellStore';
	import MenuItem from '$lib/Menu/MenuItem.svelte';
</script>

<Shell title="Console">
	<div>Connection</div>

	<Menu slot="menu">
		{#if $isConnected}
			<MenuItem>Wallet</MenuItem>
		{:else}
			<MenuItem>Connect</MenuItem>
		{/if}
	</Menu>
</Shell>

<style>
	:global(.console .page-menu .menu-items) {
		grid-template-columns: repeat(1, 1fr);
	}
</style>
