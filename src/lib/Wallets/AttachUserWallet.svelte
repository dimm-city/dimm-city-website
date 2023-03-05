<script lang="ts">
	import { config } from '$lib/Shared/config';
	import { connect, signMessage } from '$lib/Shared/Stores/ContractsStore';
	import { jwt, loadWallets } from '$lib/Shared/Stores/UserStore';
	import { connected, chainId } from 'svelte-ethers-store';
	import { onMount } from 'svelte';

	onMount(async () => {
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
            await loadWallets(true);
			document.location = '/console/archive';
		}
	}
</script>

<div>
	<h3>Attach existing archive</h3>

	<!-- {#if $connected}
		<button data-augmented-ui class="aug-button" on:click={attachWallet}>Import</button>
	{:else} -->
	<button data-augmented-ui class="aug-button" on:click={() => attachWallet()}
		>Attach Archive</button
	>
	<!-- {/if} -->
</div>
