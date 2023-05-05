<script lang="ts">
	import { config } from '$lib/Shared/config';
	import { jwt, loadWallets } from '$lib/Shared/Stores/UserStore';

	export let wallet = { address: '', chain: '' };

	async function detachWallet() {
		const response = await fetch(
			`${config.apiBaseUrl}/chain-wallets/wallets/detach/${wallet.chain}/${wallet.address}`,
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
			document.location = "/console";
		}
	}
</script>

<div>
	<h3>{wallet.address}</h3>

	<button data-augmented-ui class="aug-button" on:click={() => detachWallet()}
		>Detach Archive</button
	>
</div>
