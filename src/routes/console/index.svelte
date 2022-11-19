<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import Shell from '$lib/Components/NewShell.svelte';
	import { showMenu, myCollection } from '$lib/Shared/ShellStore';
	import { provider, signer, signerAddress, connected, defaultEvmStores, chainId } from 'svelte-ethers-store';
	import MenuItem from '$lib/Components/Menu/MenuItem.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import { onMount } from 'svelte';
	import { connect, loggedIn, contract, getSporos, signMessage, sessionToken } from '$lib/Shared/ChainStore';
	import Character from '$lib/Characters/Tabs/Character.svelte';
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import TokenViewModal from '$lib/Tokens/TokenViewModal.svelte';
	import { openModal } from 'svelte-modals';
	import { ethers } from 'ethers';
	import Thumbnail from '$lib/Components/Thumbnail.svelte';
	import TextContainer from '$lib/Components/TextContainer.svelte';
	import Button from '$lib/Components/Button.svelte';

	let loadingTask: Promise<void>;
	let selectedSporo = {} as any;
	let tokenView;
	let loaded = false;
	$: tokenId = `${selectedSporo.release}-${selectedSporo.edition}`;

	//$: contractConfig = config.releases.s1r1.networks.find((n) => n.chainId === $chainId);
	//$: network = $connected ? $provider.getNetwork() : ({} as any);
	//$: contract = $connected ? new Contract(contractConfig.address, abiJson.abi, $signer) as unknown as ContractContext : null;
	//$: loggedIn = $connected && $signerAddress;
	onMount(() => {
		// add a test to return in SSR context
		// defaultEvmStores.setProvider();
		if (window.ethereum && $loggedIn && !$connected) {
			connect();
		}
	});

	$: if ($connected && loaded == false && $myCollection.length < 1) {
		loaded = true;
		loadingTask = getSporos().then((data) => ($myCollection = data));
	}

	function viewSporos() {
		selectedSporo = {};
	}

	function showToken(token: any) {
		openModal(TokenViewModal, { data: token });
	}
</script>

<style>
	.content-container {
		padding: 1rem;
	}
	h2 {
		text-align: center;
	}

	ul {
		padding: 0;
	}
	:global(.console-menu-item) {
		display: flex;
		justify-content: space-between;
	}

	small {
		white-space: nowrap;
		font-size: clamp(0.3rem, 0.7rem, 1.25rem);
	}

	.menu-item-grid {
		width: 100%;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-template-rows: min-content auto;
		grid-template-areas:
			'name-column id-column'
			'image-column toolbar-column';
	}
	.name-column {
		grid-area: name-column;
	}
	.id-column {
		grid-area: id-column;
		display: flex;
		justify-content: end;
	}
	.image-column {
		grid-area: image-column;
		display: flex;
		justify-content: start;
	}
	.toolbar-column {
		grid-area: toolbar-column;
		display: flex;
		height: 100%;
		justify-content: end;
		align-items: end;
	}
</style>

<Shell title="Console">
	<ContentPane padding={0}>
		<div class="content-container">
			{#if $loggedIn}
				<div class="fade-in">
					<h2>Your Sporos</h2>
					<Button url="/console/characters/create">Create new Sporo</Button>
					{#await loadingTask}
						<LoadingIndicator>
							<span>Locating sporos...</span>
						</LoadingIndicator>
					{:then}
						<ul>
							{#each $myCollection as sporo}
								<li data-augmented-ui class="small-menu-item" on:click={() => showToken(sporo)}>
									{sporo.name} <small> {sporo.release}-{sporo.edition}</small>
								</li>
							{/each}
						</ul>
					{/await}
				</div>
			{:else}
				<MenuItem on:click={connect}>Connect</MenuItem>
			{/if}
		</div>
	</ContentPane>
</Shell>
