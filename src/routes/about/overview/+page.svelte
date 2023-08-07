<script>
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';
	export let data;
</script>

<LandingShell>
	<article class="content-container">
		{@html data.content}
	</article>
</LandingShell>
