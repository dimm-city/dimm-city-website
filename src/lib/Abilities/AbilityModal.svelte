<script>
	import ModalShell from '$lib/Shared/Shell/ModalShell.svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import markdownit from 'markdown-it';

	/**
	 * @type {DC.Ability}
	 */
	 export let data;
	const md = new markdownit();

	function loadAbility(id) {
		return data;
	}
</script>

<ModalShell fullscreen={false}>
	<div>
		{#await loadAbility(data?.id)}
			<LoadingIndicator>Loading ability details</LoadingIndicator>
		{:then ability}
			{#if ability?.attributes}
				<div class="ability-header">
					<div>{ability?.attributes.name}</div>
					<div>AP: {ability?.attributes.ap}</div>
				</div>

				<hr />
				<div>{@html md.render(ability?.attributes?.description ?? "")}</div>
			{:else}
				<span>Not found</span>
			{/if}
		{/await}
	</div>
</ModalShell>

<style>
	.ability-header {
		margin-top: 0.5rem;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	/* lets make the modal height 80% vh */
</style>
