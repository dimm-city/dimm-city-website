<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import Menu from '$lib/Menu/Menu.svelte';
	import { showMenu } from '$lib/ShellStore';
	import { connect, connected, disconnect, address, network, updateDetails } from '$lib/ChainStore';
	import MenuItem from '$lib/Menu/MenuItem.svelte';
	import ContentPane from '$lib/ContentPane.svelte';
	$showMenu = true;
</script>

<Shell title="Console">
	<ContentPane>
		<div>Connection</div>
	</ContentPane>

	<Menu slot="menu" columns={$connected ? '2' : '1'}>
		{#if $connected}
			<MenuItem>
				<small>{$address}</small>
				<div>Network: {$network.name}</div>
				<button on:click={disconnect}>disconnect</button>
			</MenuItem>
			<MenuItem>
				<div>
					<h5>Your Sporos</h5>
				</div>
			</MenuItem>
		{:else}
			<MenuItem on:click={connect}>Connect</MenuItem>
		{/if}
	</Menu>
</Shell>
