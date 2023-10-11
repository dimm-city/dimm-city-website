<script>

	import DefaultItemResult from "$lib/Shared/Components/DefaultItemResult.svelte";

    /**
     * @type DC.Character | { attributes: any}
     */
    export let result = { attributes: {}};
    let specialties;
    $: if(result.attributes.specialties?.data.length > 0){
        specialties = result.attributes.specialties?.data.length > 1 ? 'Multiple' : result.attributes.specialties?.data[0].attributes.name;
    } else {
        specialties = 'Unknown';
    }

</script>
<DefaultItemResult
	item={result.attributes}
	subtitle={specialties}
	description={result.attributes.age}
	icon="bi-shield-lock"
	class="citizen-menu-item"
>
	<dl>
		<dt>ID</dt>
		<dd>{result.attributes.tokenId ?? 'Unknown'}</dd>
		<!-- <dt>Specialty</dt>
							{#if result.attributes.specialties?.data?.length > 0}
								<dd>
									{result.attributes.specialties?.data?.map((i) => i.attributes.name)?.join(',')}
								</dd>
							{:else}
								<dd>Unknown</dd>
							{/if} -->
		<dt>Race</dt>
		<dd>{result.attributes.race?.data?.attributes?.name ?? 'Unknown'}</dd>
		<dt>Location</dt>
		<dd>{result.attributes.currentLocation?.data?.attributes.name ?? 'Unknown'}</dd>
		<!-- <dt>Vibe</dt>
							<dd>{result.attributes.vibe ?? 'Unknown'}</dd> -->
	</dl>
</DefaultItemResult>

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
		padding-right: 0.25rem;
	}

	dd {
		display: inline;
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(.menu-item) {
		--menu-item-height: 175px;
		--thumb-aspect-ratio: 1;
		--thumb-height: 100px;
		height: var(--menu-item-height);
	}
</style>
