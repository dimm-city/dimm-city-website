<script>
	import DefaultItemResult from '$lib/Shared/Components/DefaultItemResult.svelte';

	/**
	 * @type DC.Character | { attributes: any}
	 */
	export let result = { attributes: {} };
	let specialties = 'Unknown';
	const temp = result.attributes.specialties?.data ?? result.attributes.specialties ?? [];

	$: if (temp.length > 0) {
		specialties = temp.length > 1 ? 'Multiple' : temp[0].attributes.name;
	} else {
		specialties = 'Unknown';
	}
</script>

<DefaultItemResult
	item={result.attributes}
	subtitle={result.attributes.tokenId ?? 'Unknown'}
	description={result.attributes.age}
	icon="bi-shield-lock"
	class="citizen-menu-item"
>
	<div class="citizen-menu-item-content">
		<div>{specialties}</div>
		<div>{result.attributes.race?.data?.attributes?.name ?? 'Unknown'}</div>
		<div>{result.attributes.currentLocation?.data?.attributes.name ?? 'Unknown'}</div>
	</div>
</DefaultItemResult>

<style>
	.citizen-menu-item-content {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 0.5rem;
		margin-block: 0;
	}

	.citizen-menu-item-content div {
		text-align: end;
	}
	:global(.menu-item) {
		--menu-item-height: 175px;
		--thumb-aspect-ratio: 1;
		--thumb-height: 100px;
		height: var(--menu-item-height);
	}
</style>
