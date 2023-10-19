<script>
	import PageBackground from './PageBackground.svelte';
	import ContentPane from '../Components/ContentPane.svelte';
	import { Modals, closeModal, closeAllModals } from 'svelte-modals';
	import {
		pageImage,
		pageTitle,
		pageDescription,
		pageKeywords
	} from '$lib/Shared/Stores/ShellStore';
	import { onMount } from 'svelte';
	import MenuBar from './MenuBar.svelte';
	import { config } from '$lib/Shared/config';
	import MainMenu from './MainMenu.svelte';
	import { fade } from 'svelte/transition';

	export let title = '';
	export let titleUrl = '';
	export let fullscreen = false;
	export let enableSearch = false;

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
		closeAllModals();
	});
</script>

<svelte:head>
	<!-- <meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta
		name="viewport"
		content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0"
	/>
	<link rel="stylesheet" type="text/css" href="/assets/styles/main.css"> -->
	<title>{$pageTitle ?? title} - Dimm City</title>

	<meta name="description" content={$pageDescription} />
	<meta name="keywords" content={$pageKeywords} />
	<meta name="twitter:image" content={$pageImage} />
	<!-- <link rel="icon" type="image/x-icon" href="/assets/icons/shroom256.png" /> -->
	<!-- <link rel="icon" type="image/x-icon" href="/assets/icons/shroom256.png" /> -->
	<!-- <link rel="icon" type="image/x-icon" href="/assets/icons/shroom256.png" /> -->
	<!-- <link rel="icon" type="image/x-icon" href="/assets/icons/shroom256.png" /> -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-TJ2LB9K4M4" />
	<!-- <link rel="stylesheet" type="text/css" href="https://unpkg.com/augmented-ui@2/augmented-ui.min.css"> -->

	<link rel="stylesheet" type="text/css" href="/assets/styles/main.css" />
	<slot name="head" />
</svelte:head>
<PageBackground />
<div class="main-container {title?.toLowerCase()}" class:fullscreen>
	<div class="content-panel">
		<slot><ContentPane>404</ContentPane></slot>
	</div>
	<div class="menu-container">
		<MenuBar {title} {enableSearch} {titleUrl}>
			<svelte:fragment slot="left-button">
				<slot name="left-button">
					<MainMenu />
				</slot>
			</svelte:fragment>
			<svelte:fragment slot="action-menu">
				<slot name="action-menu" />
			</svelte:fragment>
		</MenuBar>
	</div>
</div>

<slot name="scripts" />
<Modals>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		slot="backdrop"
		class="backdrop"
		out:fade
		in:fade
		on:introstart
		on:outroend
		on:keyup
		on:click={() => {
			closeModal();
		}}
	/>
</Modals>

<style>
	:root {
		--menu-bar-height: 7dvh;
		--backdrop-padding: 10%;
	}
	.backdrop {
		position: fixed;
		top: var(--backdrop-padding);
		bottom: var(--backdrop-padding);
		right: var(--backdrop-padding);
		left: var(--backdrop-padding);
		background: var(--backdrop);
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
		padding: 0.75rem;
		flex-direction: column;
		overflow: hidden;
		transition: opacity var(--easing);
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

		.content-panel {
			padding-bottom: 2rem;
		}
	}
</style>
