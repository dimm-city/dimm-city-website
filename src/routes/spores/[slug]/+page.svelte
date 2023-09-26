<script>
	import Shell from '$lib/Shared/Shell/LandingShell.svelte';
	import ViewSpore from '$lib/Spores/ViewSpore.svelte';
	import {loggedIn} from '$lib/Shared/Stores/UserStore';
	export let data;
</script>

<Shell title="Spores" titleUrl="/spores">
	{#if $loggedIn}
	<article class="form-container">
		<ViewSpore spore={data} />
	</article>
	{/if}
</Shell>
