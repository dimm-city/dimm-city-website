<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import { getLocation } from './getLocationBySlug';
	import { Location } from './Location';
	import Article from '$lib/Shared/Components/Article.svelte';
	export let slug: string;
	let location = new Location();

	$: if (slug > '') {
		getLocation(slug).then((data) => (location = data));
	}
</script>

<Shell title="Locations" titleUrl="/locations">
	<ContentPane padding={2} scrollable={true}>
		<div class="location">
			<Article model={location} />
		</div>
	</ContentPane>
</Shell>
<style>
	.location{
		--dc-image-aspect-ratio: 4/4;
	}
</style>