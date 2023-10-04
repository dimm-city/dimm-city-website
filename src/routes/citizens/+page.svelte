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
					>
						<dl>
							<dt>Specialty</dt>
							<dd>{result.attributes.specialty?.attributes.name ?? 'Unknown'}</dd>
							<dt>Race</dt>
							<dd>{result.attributes.race?.attributes.name ?? 'Unknown'}</dd>
							<dt>Location</dt>
							<dd>{result.attributes.currentLocation?.attributes.name ?? 'Unknown'}</dd>
							<dt>Vibe</dt>
							<dd>{result.attributes.vibe ?? 'Unknown'}</dd>
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
		gap: 0.5rem;
	}
	dt {
		display: inline;
		color: var(--secondary-accent);
	}
	dt::after{
		content: ': ';
	}
	
	dd {
		display: inline;
		margin: 0;
	}
</style>
