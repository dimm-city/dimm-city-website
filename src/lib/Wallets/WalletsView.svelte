<script>
	import TokensList from '$lib/Tokens/TokensList.svelte';
	import {  loadWallets, wallets } from '$lib/Shared/Stores/UserStore';
	import { onMount } from 'svelte';
	onMount(async () => {
		await loadWallets();
	});
</script>

<div>
	<div class="toolbar">
		<button data-augmented-ui class="aug-button">Create New Archive</button>
		<a href="/console/archive/import" data-augmented-ui class="aug-button"
			>Attach Existing Archive</a
		>
	</div>
	{#if $wallets?.length > 0}
		{#each $wallets as wallet}
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
