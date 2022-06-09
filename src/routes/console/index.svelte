<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import Button from '$lib/Components/Button.svelte';
	import { showMenu, myCollection } from '$lib/ShellStore';
	import { provider, signer, signerAddress, connected, defaultEvmStores, chainId } from 'svelte-ethers-store';
	import MenuItem from '$lib/Components/Menu/MenuItem.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import { onMount } from 'svelte';
	import { connect, loggedIn, contract, getSporos, signMessage, sessionToken } from '$lib/ChainStore';
	import Character from '$lib/Characters/Tabs/Character.svelte';
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import TokenViewModal from '$lib/Tokens/TokenViewModal.svelte';
	import { openModal } from 'svelte-modals';
	import { ethers } from 'ethers';
	import Thumbnail from '$lib/Components/Thumbnail.svelte';
	import TextContainer from '$lib/Components/TextContainer.svelte';

	let loadingTask: Promise<void>;
	let selectedSporo = {} as any;
	let tokenView;

	$: tokenId = `${selectedSporo.release}-${selectedSporo.edition}`;
	$showMenu = true;
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

	$: if ($connected && $myCollection.length < 1) {
		loadingTask = getSporos().then((data) => ($myCollection = data));
	}

	function viewSporos() {
		$showMenu = false;
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

<Shell title="Console" showMenuButton={false}>
	<ContentPane padding={0}>
		<div class="content-container">
			{#if $loggedIn}
				{#if selectedSporo.edition > 0}
					<div class="fade-in">
						<Character {tokenId} />
					</div>
				{:else}
					<div class="fade-in">
						<h2>Your Sporos</h2>
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
				{/if}
			{/if}
		</div>
	</ContentPane>
	<Menu slot="menu" columns={3}>
		<div class="fade-in" slot="menu-toolbar">
			{#if $connected && $signerAddress}
				<TextContainer>
					<small>Profile: {$signerAddress}</small>
					<div>
						{#await $contract.balanceOf($signerAddress)}
							<LoadingIndicator>
								<span>Locating sporos...</span>
							</LoadingIndicator>
						{:then count}
							<h4>Sporos Located: {count}</h4>

							{#if $myCollection.some((s) => !s.hasCharacter)}
								<span class="text-highlight"
									>{$myCollection.filter((s) => !s.hasCharacter).length} Sporos missing citizen profiles</span
								>
							{/if}
						{/await}
					</div>
				</TextContainer>
				{#if $myCollection.length == 0}
				<div class="fade-in" style="margin-top: 1rem;">
					<LoadingIndicator>Extracting Sporo's data...</LoadingIndicator>
				</div>
					
				{/if}
			{:else}
				<MenuItem on:click={connect}>Connect</MenuItem>
			{/if}
		</div>
		{#if $connected && $signerAddress}
			{#each $myCollection as sporo}
				<MenuItem on:click={() => showToken(sporo)} classes="console-menu-item fade-in">
					<div class="menu-item-grid">
						<div class="name-column">{sporo.name}</div>
						<div class="id-column"><small> {sporo.release}-{sporo.edition}</small></div>
						<div class="image-column"><Thumbnail title="thumbnail" imageUrl={sporo.thumbnail_uri} height="4rem" /></div>
						<div class="toolbar-column">
							{#if sporo.hasCharacter}
								<i class="bi bi-file-person text-primary" title="Has citizen file in the archives" />
							{:else}
								<i class="bi bi-file text-highlight" title="Citizen file not found in the archives" />
							{/if}
						</div>
					</div>
				</MenuItem>
			{/each}
		{/if}
	</Menu>
</Shell>
