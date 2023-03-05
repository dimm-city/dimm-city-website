<script lang="ts">
	import { config } from '$lib/Shared/config';
	import { jwt, loadWallets } from '$lib/Shared/Stores/UserStore';

	export let wallet = { address: '', network: { chainId: 0 } };

	async function detachWallet() {
		const response = await fetch(
			`${config.apiBaseUrl}/chain-wallets/wallets/detach/${wallet.network.chainId}/${wallet.address}`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${$jwt}`
				}
			}
		);

		if (response.ok) {
			console.log('detached wallet');
			await loadWallets(true);
			document.location = "/console/archive";
		}
	}
</script>

<div>
	<h3>{wallet.address}</h3>

	<button data-augmented-ui class="aug-button" on:click={() => detachWallet()}
		>Detach Archive</button
	>
</div>
