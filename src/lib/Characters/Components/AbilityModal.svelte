<style>
	.ability-header {
		margin-top: 0.5rem;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
</style>

<ModalShell fullscreen={false}>
	<div>
		{#await loadAbility(data.id)}
			<LoadingIndicator>Loading ability details</LoadingIndicator>
		{:then ability}
			{#if ability.attributes}
				<div class="ability-header">
					<div>{ability.attributes.name}</div>
					<div>AP: {ability.attributes.ap}</div>
				</div>

				<hr />
				<div>{@html md.render(ability.attributes.description)}</div>
			{:else}
				<span>Not found</span>
			{/if}
		{/await}
	</div>
</ModalShell>

<script lang="ts">
	import ModalShell from '../../ModalShell.svelte';
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import markdownit from 'markdown-it';

	export let data: any = {};
	const md = new markdownit();

	function loadAbility(id: Number): any {
		return data;
	}
</script>
