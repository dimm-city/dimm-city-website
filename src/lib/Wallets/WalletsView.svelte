<script>
	import TokensList from '$lib/Tokens/TokensList.svelte';
	import { config } from '$lib/Shared/config';
	import { connect, signMessage } from '$lib/Shared/Stores/ContractsStore';
	import { jwt, loadWallets, wallets } from '$lib/Shared/Stores/UserStore';
	import { connected, chainId } from 'svelte-ethers-store';
	import { onMount } from 'svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';

	let loading = new Promise((resolve)=> resolve(null));
	onMount(async () => {
		loading = loadWallets(false);
	});
	async function attachWallet() {
		if (!$connected && window.ethereum) {
			await connect();
		}
		const signature = await signMessage('Attach this wallet');

		const response = await fetch(`${config.apiBaseUrl}/chain-wallets/wallets/attach/${$chainId}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${$jwt}`,
				sig: signature
			}
		});

		if (response.ok) {
			console.log('attached wallet');
			await loadWallets(true);
		}
	}

</script>

<div>
	<div class="toolbar">
		<!-- <button data-augmented-ui class="aug-button">Create New Archive</button> -->
		{#if window.ethereum}
			<button on:click={() => attachWallet()} data-augmented-ui class="aug-button"
				>Attach Existing Archive</button
			>
		{/if}
	</div>
	{#await loading}
	<div class="loading-container">
		<LoadingIndicator>Locating archives...</LoadingIndicator>
	</div>		
	{:then w}
		{#if $wallets.length > 0}
			{#each $wallets as wallet}
				<div style="margin-bottom: 2rem">
					<div class="wallet-title">
						<h4>
							<a href="/console/archive/{wallet.address}">{wallet.name ?? wallet.address}</a>
						</h4>
						<span>({wallet.tokens?.length ?? 0}) </span>
					</div>
					<TokensList tokens={wallet.tokens} />
				</div>
			{/each}
		{:else}
			<h4>no archives located for current operator</h4>
		{/if}
	{/await}
</div>

<style>
	.wallet-title {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	h4 {
		display: inline;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	span {
		align-self: center;
	}
	.wallet-title h4 span {
		margin-right: 0.5rem;
	}
	.toolbar {
		display: flex;
		justify-content: space-between;
	}

	.loading-container{
		display:flex;
		height: 100%;
		padding: 3rem;
		align-content: center;
	}

</style>
