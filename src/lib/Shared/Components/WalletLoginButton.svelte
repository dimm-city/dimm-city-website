<script>
	
	import { connected,signerAddress,  connect, loginWithWallet } from "$lib/Shared/Stores/ethersStore";
	import Button from './Button.svelte';
	import { onMount } from 'svelte';

	export let showInstallButton = false;
	let ethereumEnabled = false;
	onMount(async () => {	
		ethereumEnabled = window && window?.ethereum;		
	});
</script>

<div>
	{#if ethereumEnabled}
		{#if $connected && $signerAddress}
			<Button height="5rem" on:click={loginWithWallet}
				><i class="bi bi-safe" />
				Login with Metamask
				<small class="connection-details">(address: {$signerAddress})</small>
				<small> you will be prompted to sign a message to login with your connected wallet </small>
			</Button>
		{:else}<Button height="5rem" on:click={connect}
				><i class="bi bi-safe" />
				Connect Metamask
				<p>
					<small>to login with metamask you will first be asked to connect to the site</small>
				</p>
			</Button>
		{/if}
	{:else if showInstallButton}
		<Button height="5rem" url="https://metamask.io" target="_blank"
			><i class="bi bi-safe" /> Metamask not installed
			<p><small>please install metamask to enable this option</small></p>
		</Button>
	{/if}
</div>

<style>
	.connection-details {
		display: block;
		padding: 0.25rem;
	}
</style>
