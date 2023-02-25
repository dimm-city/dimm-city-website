<script lang="ts">
	import { page } from '$app/stores';
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import ViewSpore from '$lib/Spores/ViewSpore.svelte';
	export let slug = $page.params.slug;
</script>

<Shell title="Spores" titleUrl="/spores">
	<ContentPane padding={2} scrollable={true}>
		<ViewSpore {slug} />
	</ContentPane>
</Shell>
