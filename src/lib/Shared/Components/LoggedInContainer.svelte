<script>
	import { setSessionValue } from '$lib/Shared/Stores/StoreUtils';
	import { loggedIn } from '$lib/Shared/Stores/UserStore';
	import { config } from '$lib/Shared/config';
	import Button from './Button.svelte';
	import { onMount } from 'svelte';
	import WalletLoginButton from './WalletLoginButton.svelte';
	onMount(async () => {
		console.log('login container mounted', $loggedIn);

		if (!$loggedIn) {
			console.log('setting redirect', document.location);

			setSessionValue('redirect', document.location);
		}
	
	});
</script>

{#if $loggedIn}
	<slot />
{:else}
	<slot name="public-header"></slot>
	<slot name="public">
		<div class="content-container fade-in">
			<Button height="5rem" url={config.apiBaseUrl + '/connect/google'}
				><i class="bi bi-google" />Login with Google</Button
			>
			<Button height="5rem" url={config.apiBaseUrl + '/connect/reddit'}
				><i class="bi bi-reddit" />Login with Reddit</Button
			>
			<Button height="5rem" url={config.apiBaseUrl + '/connect/itchio'}
				><i class="bi bi-reddit" />Login with itch.io</Button
			>
			<WalletLoginButton />	
		</div>
	</slot>
{/if}

<style>
	.content-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-inline: 1rem;
		align-items: center;
		justify-content: center;
		height: 100%;
		max-width: 65ch;
		margin: auto;
	}
	:global(.content-container > a) {
		width: 100%;
	}


	.bi {
		margin: 0.5rem;
	}
</style>
