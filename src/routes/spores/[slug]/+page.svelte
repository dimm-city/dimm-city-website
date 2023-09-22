<script>
	import Shell from '$lib/Shared/Shell/LandingShell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import ViewSpore from '$lib/Spores/ViewSpore.svelte';
	export let data;
</script>

<Shell title="Spores" titleUrl="/spores">
	<ContentPane padding={2} scrollable={true}>
		<ViewSpore spore={data} />
	</ContentPane>
</Shell>
