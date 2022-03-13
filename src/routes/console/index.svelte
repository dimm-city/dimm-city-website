<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import Menu from '$lib/Menu/Menu.svelte';
	import { showMenu } from '$lib/ShellStore';
	import { connect, connected, disconnect, address, network, updateDetails } from '$lib/ChainStore';
	import MenuItem from '$lib/Menu/MenuItem.svelte';
</script>

<Shell title="Console">
	<div>Connection</div>

	<Menu slot="menu">
		{#if $connected}
			<MenuItem>				
				<small>{$address}</small>
				<div>Network: {$network.name}</div>
			</MenuItem>
			<MenuItem on:click={disconnect}>Disconnect</MenuItem>
		{:else}
			<MenuItem on:click={connect}>Connect</MenuItem>
		{/if}
	</Menu>
</Shell>

<style>
	:global(.console .page-menu .menu-items) {
		grid-template-columns: repeat(1, 1fr);
	}
</style>
