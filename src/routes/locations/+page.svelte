<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import SearchPage from '$lib/Shared/Components/SearchPage.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	import Image from '$lib/Shared/Components/Image.svelte';

	export let data;
	const endpoint = '/dimm-city/locations';
</script>

<Shell title="Locations">
	<SearchPage {endpoint} initialData={data}>
		<svelte:fragment slot="result" let:result>
			<div class="menu-item-content-wrapper">
				<MenuItem
					url={`/locations/${result.attributes.slug}`}
					title={result.attributes.name}
					description={result.attributes.shortDescription ?? ''}
				>
					<Image
						classes="image"
						title={result.attributes.name}
						imageUrl={result.attributes.mainImage?.data?.attributes.formats.thumbnail.url}
					/>
					<p>
						{result.attributes.shortDescription}
					</p>
				</MenuItem>
			</div>
		</svelte:fragment>
	</SearchPage>
</Shell>

<style>
	.menu-item-content-wrapper {
		--dc-menu-item-aspect-ratio: 4/3;
	}
	:global(.image) {
		max-width: 40%;
		max-height: 100%;
		float: left;
		margin-right: 1rem;
	}

	p {
		margin: 0;
	}
	@media (width < 800px) {
		.menu-item-content-wrapper {
			--dc-menu-item-aspect-ratio: 2/1;
		}
		:global(.results-list li:nth-child(odd) .image) {
			float: left;
			margin-right: 1rem;
		}
		:global(.results-list li:nth-child(even) .image) {
			float: right;
			margin-left: 1rem;
		}
	}
	@media (width < 600px) {
		:global(.menu-item) {
			--dc-menu-item-aspect-ratio: 3/2;
		}
		/* :global(.menu-item) {
			--dc-menu-item-aspect-ratio: 1;
		}*/
	}
</style>
