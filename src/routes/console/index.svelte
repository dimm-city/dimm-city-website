<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import Menu from '$lib/Menu/Menu.svelte';
	import { showMenu } from '$lib/ShellStore';
	import { getNumberSporos } from '$lib/ChainStore';
	import { provider, signerAddress, connected, defaultEvmStores } from 'svelte-ethers-store';
	import MenuItem from '$lib/Menu/MenuItem.svelte';
	import ContentPane from '$lib/ContentPane.svelte';
	import { onMount } from 'svelte';
	$showMenu = true;
	
	$: network = $connected ? $provider.getNetwork() : {} as any;
	// $: account = $connected && $signer ? $signer.getAddress() : '';

	onMount(() => {
		// add a test to return in SSR context
		defaultEvmStores.setProvider();
	});
</script>

<Shell title="Console">
	<ContentPane>
		<div>Connection</div>
	</ContentPane>

	<Menu slot="menu" columns={$connected ? '2' : '1'}>
		{#if $connected}
			<MenuItem>
				<small>{$signerAddress}</small>
				{#await network then value}
					{value.name}
				{/await}

				<!-- <button on:click={disconnect}>disconnect</button> -->
			</MenuItem>
			<MenuItem>
				<div>
					<h5>Your Sporos</h5>
					{#await getNumberSporos()}
						<span>Locating sporos...</span>
					{:then count}
						{count}
					{/await}
				</div>
			</MenuItem>
		{:else}
			<MenuItem on:click={() => defaultEvmStores.setProvider()}>Connect</MenuItem>
		{/if}
	</Menu>
</Shell>
