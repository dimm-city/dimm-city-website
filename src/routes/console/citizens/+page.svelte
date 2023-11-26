<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import DefaultItemResult from '$lib/Shared/Components/DefaultItemResult.svelte';
	import CharacterMenuItem from '$lib/Characters/CharacterMenuItem.svelte';

	/** @type {DC.Character}*/
	export let data;
	let query = {
		fields: ['name', 'tokenId', 'age'],
		populate: ['mainImage', 'race', 'specialties', 'currentLocation']
	};
</script>

<Shell title="Citizens">
	<SearchPage
		bind:query
		initialData={data}
		endpoint={'/dimm-city/characters'}
		itemResultBaseUrl="/citizens"
	>
		<svelte:fragment slot="result" let:result>
			<slot name="result" {result}>
				<MenuItem url={`citizens/${result.attributes.tokenId}`}>
					<CharacterMenuItem {result} />
				</MenuItem>
			</slot>
		</svelte:fragment>
	</SearchPage>
</Shell>

<style>
	/* dl {
		display: grid;
		grid-template-columns: 1fr 2fr;
		row-gap: 0.5rem;
		margin-block: 0;
	}
	dt {
		display: inline;
		color: var(--secondary-accent);
	}
	dt::after {
		content: ': ';
		padding-right: .25rem;
	}

	dd {
		display: inline;
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
	} */

	:global(.menu-item){
		--menu-item-height: 175px;
		--thumb-aspect-ratio: 1;
		--thumb-height: 100px;
		height: var(--menu-item-height);
	}

	
</style>
