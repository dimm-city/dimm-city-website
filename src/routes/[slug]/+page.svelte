<script>
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
    
	export let data;

	onMount(() => {
		const styleElement = document.getElementById('page-style');
		if (styleElement) styleElement.innerHTML = data.attributes?.styles;
	});
</script>

<svelte:head>
	<meta name="description" content={data.attributes?.description} />
	<meta name="keywords" content={data.attributes?.tags} />
</svelte:head>
<LandingShell title={data?.attributes?.title}>
	<style id="page-style"></style>
	<article class="content-container" style={data.attributes?.styles}>
		<h1>{data.attributes?.title}</h1>
		{@html marked.parse(data.attributes?.content ?? '')}
	</article>
</LandingShell>
