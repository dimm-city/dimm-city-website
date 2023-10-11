<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import DefaultItemResult from '$lib/Shared/Components/DefaultItemResult.svelte';

	/** @type {DC.Character}*/
	export let data;
	let query = {
		fields: ['name', 'tokenId', 'age'],
		populate: ['mainImage', 'race', 'specialties']
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
					<DefaultItemResult
						item={result.attributes}
						description={result.attributes.age}
						icon="bi-shield-lock"
						class="citizen-menu-item"
					>
						<dl>
							<dt>Specialty</dt>
							{#if result.attributes.specialties?.data?.length > 0}
								<dd>
									{result.attributes.specialties?.data?.map((i) => i.attributes.name)?.join(',')}
								</dd>
							{:else}
								<dd>Unknown</dd>
							{/if}
							<dt>Race</dt>
							<dd>{result.attributes.race?.attributes?.name ?? 'Unknown'}</dd>
							<dt>Location</dt>
							<dd>{result.attributes.currentLocation?.attributes.name ?? 'Unknown'}</dd>
							<!-- <dt>Vibe</dt>
							<dd>{result.attributes.vibe ?? 'Unknown'}</dd> -->
						</dl>
					</DefaultItemResult>
				</MenuItem>
			</slot>
		</svelte:fragment>
	</SearchPage>
</Shell>

<style>
	dl {
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
	}

	:global(.menu-item){
		--menu-item-height: 175px;
		--thumb-aspect-ratio: 1;
		--thumb-height: 100px;
		height: var(--menu-item-height);
	}
	:global(.item-result-title){
		margin-bottom: 0.5rem;		
	}

	
</style>
