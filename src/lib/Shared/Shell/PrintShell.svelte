<script>
	import ContentPane from '../Components/ContentPane.svelte';
	import { pageTitle, pageDescription } from '$lib/Shared/Stores/ShellStore';
	import { onMount } from 'svelte';
	import { config } from '$lib/Shared/config';

	export let title = '';

	onMount(async () => {
		$pageTitle = title;

		if (config.googleKey > '') {
			// @ts-ignore
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				// @ts-ignore
				window.dataLayer.push(arguments);
			}
			gtag('js', new Date());

			gtag('config', config.googleKey);
		}
	});
</script>

<svelte:head>
	<title>{$pageTitle ?? title} - Dimm City</title>

	<meta name="description" content={$pageDescription} />
	<script async src="https://www.googletagmanager.com/gtag/js?id={config.googleKey}"></script>
	<!-- <link rel="stylesheet" type="text/css" href="https://unpkg.com/augmented-ui@2/augmented-ui.min.css"> -->
<!-- 
	<link rel="stylesheet" type="text/css" href="/assets/styles/main.css" /> -->
	<slot name="head" />
</svelte:head>
<div class="main-container {title?.toLowerCase()}">
	<div class="content-panel">
		<slot><ContentPane>404</ContentPane></slot>
	</div>
</div>

<slot name="scripts" />

<!-- <style>
	:root {
		--menu-bar-height: 7dvh;
	}
	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: var(--primary-accent); /* rgba(255, 255, 255, 0.8);*/
		--transition-in-delay: 50ms;
		--transition-in-duration: 1s;
		filter: blur(10rem);
	}
	.main-container {
		display: grid;
		grid-template-areas:
			'menu'
			'content';
		grid-template-rows: min-content auto;
		height: 100dvh;
		width: 100dvw;
	}

	.content-panel {
		grid-area: content;
		display: flex;
		margin: auto;
		width: 100%;
		height: calc(100dvh - var(--menu-bar-height));
		padding: 0.5rem;
		flex-direction: column;
		overflow: hidden;
		transition: all var(--easing);
		animation-duration: 400ms;
		animation-delay: 200ms;
		--animate-delay: 200ms;
	}

	.menu-container {
		grid-area: menu;
		height: min-content;
		z-index: 10;
	}

	@media screen and (max-width: 767px), (max-aspect-ratio: 0.74) {
		.main-container {
			grid-template-areas:
				'content'
				'menu';
			grid-template-columns: 1fr;
			grid-template-rows: auto min-content;
		}
	}
</style> -->
