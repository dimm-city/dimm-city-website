<script>
	import TokensList from '$lib/Tokens/TokensList.svelte';
	import { config } from '$lib/Shared/config';
	import { connect, signMessage } from '$lib/Shared/Stores/ContractsStore';
	import { jwt, loadWallets, wallets } from '$lib/Shared/Stores/UserStore';
	import { connected, chainId } from 'svelte-ethers-store';
	import { onMount } from 'svelte';

	onMount(async () => {
		await loadWallets(true);
		if (!$connected) {
			await connect();
		}
	});
	async function attachWallet() {
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
            myWallets = await loadWallets(true);
		}
	}

	$: myWallets = $wallets;
</script>

<div>
	<div class="toolbar">
		<!-- <button data-augmented-ui class="aug-button">Create New Archive</button> -->
		<button on:click={() => attachWallet()} data-augmented-ui class="aug-button"
			>Attach Existing Archive</button>
	</div>
	{#if myWallets?.length > 0}
		{#each myWallets as wallet}
			<div style="margin-bottom: 2rem">
				<h4>
					<a href="/console/archive/{wallet.address}">{wallet.name ?? wallet.address}</a>
					<span>({wallet.tokens?.length ?? 0}) </span>
				</h4>
				<TokensList tokens={wallet.tokens} />
			</div>
		{/each}
	{:else}
		<h4>no archives located for current operator</h4>
	{/if}
</div>

<style>
	h4 {
		display: flex;
		justify-content: space-between;
	}
	h4 span {
		margin-right: 0.5rem;
	}
	.toolbar {
		display: flex;
		justify-content: space-between;
	}
</style>
