<script lang="ts">
	import { loggedIn } from '$lib/Shared/Stores/UserStore';
	import { config } from '$lib/Shared/config';
	import { connect, loginWithWallet } from '$lib/Shared/Stores/ContractsStore';
	import Button from './Button.svelte';
	import { defaultEvmStores, chainId, connected, signerAddress } from 'svelte-ethers-store';
	import { onMount } from 'svelte';

	let ethereumEnabled =  false; 
	onMount(async ()=>{
		ethereumEnabled = window && window?.ethereum;
		// if(!$connected && ethereumEnabled){
		// 	connect();
		// }

	});
</script>

{#if $loggedIn}
	<slot />
{:else}
	<slot name="public">
		<div class="content-container fade-in">
			<Button height="5rem" url={config.apiBaseUrl + '/connect/reddit'}
				><i class="bi bi-reddit" />Login with Reddit</Button
			>
			{#if ethereumEnabled}
				{#if $connected && $signerAddress}
					<Button height="5rem" on:click={loginWithWallet}
						><i class="bi bi-safe" />
						Login with Metamask
						<small class="connection-details">(chain: {$chainId} | address: {$signerAddress})</small
						>
						<small>
							you will be prompted to sign a message to login with your connected wallet
						</small>
					</Button>
				{:else}<Button height="5rem" on:click={connect}
						><i class="bi bi-safe" />
						Connect Metamask
						<p>
							<small>to login with metamask you will first be asked to connect to the site</small>
						</p>
					</Button>
				{/if}
			{:else}
				<Button height="5rem" url="https://metamask.io" target="_blank"
					><i class="bi bi-safe" /> Metamask not installed
					<p><small>please install metamask to enable this option</small></p>
				</Button>
			{/if}
		</div>
	</slot>
{/if}

<style>
	.content-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-inline: 1rem;
		align-items: stretch;
		justify-content: center;
		height: 100%;
	}
	.connection-details {
		display: block;
		padding: 0.25rem;
	}

	.bi {
		margin: 0.5rem;
	}
</style>
