<script>
	import Shell from '$lib/Shared/Shell/LandingShell.svelte';
	import ViewSpore from '$lib/Spores/ViewSpore.svelte';
	export let data;
</script>

<Shell title="Spores" titleUrl="/spores">
	<article class="form-container">
		<ViewSpore spore={data} />
	</article>
</Shell>
