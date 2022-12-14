<script lang="ts">
	import { loggedIn } from '$lib/Shared/Stores/UserStore';
	import { config } from '$lib/Shared/config';
	import { connect } from '$lib/Shared/Stores/ContractsStore';
	import Button from './Button.svelte';
</script>

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

{#if $loggedIn}
	<slot />
{:else}
	<slot name="public">
		<div class="content-container fade-in">
			<Button height="5rem" url={config.apiBaseUrl + '/connect/reddit'}
				><i class="bi bi-reddit" />Login with Reddit</Button
			>
			<Button height="5rem" on:click={connect}><i class="bi bi-safe" /> Login with Metamask</Button>
		</div>
	</slot>
{/if}
