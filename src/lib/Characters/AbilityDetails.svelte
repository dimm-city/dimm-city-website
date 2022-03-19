<script lang="ts">
	import LoadingIndicator from '$lib/Components/LoadingIndicator.svelte';
	import { selectedAbility } from './CharacterStore';
	import markdownit from 'markdown-it';

	export let ability: any = $selectedAbility || {};
	const md = new markdownit();
	

	function loadAbility(id: Number): any {
		return ability;
	}
</script>

<div>
	{#await loadAbility(ability.id)}
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

<style>
	.ability-header{
		margin-top: 0.5rem;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
</style>
