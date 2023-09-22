<script>
	import { signerAddress, attachWallet } from '$lib/Shared/Stores/ethersStore';

</script>

<div>
	<h3>Attach existing archive</h3>

	<p>You are currently connected to {$signerAddress}. Would you like to attach this address to your account?</p>
	<button data-augmented-ui class="aug-button" on:click={() => attachWallet()}>Attach Archive</button
	>
</div>
