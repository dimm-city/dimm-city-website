<script lang="ts">
	import './locations.css';
	import Shell from '$lib/Components/Shell.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import { getLocation } from './getLocationBySlug';
	import { Location } from './Location';
	import Article from '$lib/Components/Article.svelte';
	export let slug;
	let location = new Location();

	$: if (slug > '') {
		getLocation(slug).then((data) => (location = data));
	}
</script>

<Shell title={location.name}>
	<ContentPane padding={0} scrollable={true}>
		<div class="location">
			<Article model={location} />
		</div>
	</ContentPane>
</Shell>
