<script>
	import { page } from '$app/stores';
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
    
	export let data;

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"url": $page.url?.toString(),
		"name": $page.data.attributes.title,
		"description": data.attributes?.description,
		"author": {
			"@type": "Person",
			"name": data.attributes.author
		},
		"image":  data.attributes?.mainImage?.data?.attributes.url
	};

	onMount(() => {
		const styleElement = document.getElementById('page-style');
		if (styleElement) styleElement.innerHTML = data.attributes?.styles;

		const dataElement = document.getElementById('structured-data');
		if (dataElement) dataElement.innerText = JSON.stringify(structuredData);
	});

</script>

<svelte:head>
	<title>{$page.data.title}</title>
	<meta name="description" content={data.attributes?.description} />
	<meta name="keywords" content={data.attributes?.tags} />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="author" content={data.attributes.author}>
	<meta name="robots" content="index, follow">
	<link rel="canonical" href="{$page.url?.toString()}">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="{$page.url?.toString()}">
	<meta property="og:title" content={data.attributes.title}>
	<meta property="og:description" content={data.attributes?.description}>
	<!-- <meta property="og:image" content={window.location.origin + data.attributes?.mainImage?.data?.attributes.url}> -->

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content="{$page.url?.toString()}">
	<meta property="twitter:title" content={$page.data.title}>
	<meta property="twitter:description" content={data.attributes?.description}>
	<meta property="twitter:image" content={data.attributes?.mainImage?.data?.attributes.url}>

	<!-- Structured Data -->
	<script type="application/ld+json" id="structured-data">
	</script>
</svelte:head>
<LandingShell title={data?.attributes?.title}>
	<style id="page-style"></style>
	<article class="content-container" style={data.attributes?.styles}>
		<h1>{data.attributes?.title}</h1>
		{@html marked.parse(data.attributes?.content ?? '')}

		{#if data.attributes.downloads?.data}
			<div class="page-downloads">

			</div>
		{/if}
	</article>
</LandingShell>
