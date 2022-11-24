<script lang="ts">
	import { provider, signer, signerAddress, connected, defaultEvmStores, chainId } from 'svelte-ethers-store';
	import MenuItem from '$lib/Components/Menu/MenuItem.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import { onMount } from 'svelte';
	import { connect, loggedIn, contract, getSporos, signMessage, sessionToken } from '$lib/Shared/ChainStore';
	import Character from '$lib/Characters/Tabs/Character.svelte';
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import { ethers } from 'ethers';
	import Button from '$lib/Components/Button.svelte';

	// //$: contractConfig = config.releases.s1r1.networks.find((n) => n.chainId === $chainId);
	// //$: network = $connected ? $provider.getNetwork() : ({} as any);
	// //$: contract = $connected ? new Contract(contractConfig.address, abiJson.abi, $signer) as unknown as ContractContext : null;
	// //$: loggedIn = $connected && $signerAddress;
	// onMount(() => {
	// 	// add a test to return in SSR context
	// 	// defaultEvmStores.setProvider();
	// 	if (window.ethereum && $loggedIn  && !$connected) {
	// 		connect();
	// 	}
	// });
</script>

{#if $loggedIn && $sessionToken > ''}
	<slot />
{:else}
	<MenuItem on:click={connect}>
        Connect
    </MenuItem>
{/if}
