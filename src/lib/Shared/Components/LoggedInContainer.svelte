<script lang="ts">
	import { loggedIn } from '$lib/Shared/Stores/UserStore';
	import { config } from '$lib/Shared/config';
	import { connect } from '$lib/Shared/Stores/ContractsStore';
	import Button from './Button.svelte';
</script>

{#if $loggedIn}
	<slot />
{:else}
	<slot name="public">
		<div class="content-container fade-in">
			<Button height="5rem" url={config.apiBaseUrl + '/connect/reddit'}
				><i class="bi bi-reddit" />Login with Reddit</Button
			>
			{#if window.ethereum}
				<Button height="5rem" on:click={connect}
					><i class="bi bi-safe" /> Login with Metamask</Button
				>
			{:else}
				<Button height="5rem" url="https://metamask.io" target="_blank"
					><i class="bi bi-safe" /> Metamask not installed
					<p><small>please install metamask to enable this option</small></p>
					</Button
				>
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

	.bi {
		margin: 0.5rem;
	}
</style>
