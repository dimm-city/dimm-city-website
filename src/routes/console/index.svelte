<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	// import abiJson from '../../contracts/DimmCityV1Base.json';
	// import { config } from "$lib/config";
	import Shell from '$lib/Shell.svelte';
	import Menu from '$lib/Menu/Menu.svelte';
	import Button from '$lib/Components/Button.svelte';
	import { showMenu, loggedIn, myCollection } from '$lib/ShellStore';
	import { provider, signer, signerAddress, connected, defaultEvmStores, chainId } from 'svelte-ethers-store';
	import MenuItem from '$lib/Menu/MenuItem.svelte';
	import ContentPane from '$lib/ContentPane.svelte';
	import { onMount } from 'svelte';
	import { Contract } from 'ethers';
	import { connect, contract, contractConfig } from '$lib/ChainStore';
	import type { ContractContext } from 'src/contracts/DimmCityV1Base';
	import Character from '$lib/Characters/Character.svelte';

	let loadingTask: Promise<void>;
	let selectedSporo = {} as any;

	$: tokenId = `${selectedSporo.release}-${selectedSporo.edition}`;
	$showMenu = true;
	//$: contractConfig = config.releases.s1r1.networks.find((n) => n.chainId === $chainId);
	$: network = $connected ? $provider.getNetwork() : ({} as any);
	//$: contract = $connected ? new Contract(contractConfig.address, abiJson.abi, $signer) as unknown as ContractContext : null;
	//$: loggedIn = $connected && $signerAddress;
	onMount(() => {
		// add a test to return in SSR context
		// defaultEvmStores.setProvider();
	});

	$: if ($connected) {
		loadingTask = getSporos();
	}

	async function getSporos(): Promise<void> {
		if (!$connected || !$contract) return;
		const address = $signerAddress;
		const number = (await $contract.balanceOf(address)).toNumber();

		const tasks = new Array<Promise<any>>();
		for (let index = 0; index < number; index++) {
			const sporo = await $contract.tokenOfOwnerByIndex(address, index);
			const tokenId = sporo.toNumber();
			tasks.push(await downloadSporo(tokenId));
		}

		return Promise.all(tasks).then((sporos) => ($myCollection = sporos));
	}

	async function downloadSporo(tokenId: number): Promise<any> {
		let json = {};
		try {
			const response = await fetch(`${$contractConfig.metadataBaseUri}/${tokenId}`);

			if (response.ok) {
				json = await response.json();
			}
		} catch (error) {
			console.error(error);
		}
		return json;
	}

	function viewSporos() {
		$showMenu = false;
		selectedSporo = {};
	}
</script>

<Shell title="Console">
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
							<span>Locating sporos...</span>
						{:then}
							<ul>
								{#each $myCollection as sporo}
									<li data-augmented-ui class="small-menu-item" on:click={() => (selectedSporo = sporo)}>
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
	<div slot="content-toolbar">
		{#if selectedSporo.edition > 0}
			<Button on:click={() => (selectedSporo = {})}>edit</Button>
			<Button on:click={() => (selectedSporo = {})}>back</Button>
		{/if}
	</div>
	<Menu slot="menu" columns={$loggedIn ? '2' : '1'}>
		{#if $connected && $signerAddress}
			<MenuItem>
				<strong>Profile</strong>
				<div>
					<small>{$signerAddress}</small>
					{#await network then value}
						{value.name}
					{/await}
				</div>
			</MenuItem>
			<MenuItem on:click={viewSporos}>
				<strong>Your Sporos</strong>
				<div>
					{#await $contract.balanceOf($signerAddress)}
						<span>Locating sporos...</span>
					{:then count}
						{count}
					{/await}
				</div>
			</MenuItem>
		{:else}
			<MenuItem on:click={connect}>Connect</MenuItem>
		{/if}
	</Menu>
</Shell>

<style>
	.content-container {
		padding: 1rem;
	}
	h2 {
		text-align: center;
	}
</style>
