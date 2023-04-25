<script>
	import PageBackground from './PageBackground.svelte';
	import ContentPane from './ContentPane.svelte';
	import { Modals, closeModal, closeAllModals } from 'svelte-modals';
	import { pageImage, pageTitle } from '$lib/Shared/Stores/ShellStore';
	import '$lib/Shared/Styles/main.css';
	import 'animate.css';
	import { onMount } from 'svelte';
	import MenuBar from './MenuBar.svelte';
	import { config } from '$lib/Shared/config';

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
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta
		name="viewport"
		content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0"
	/>
	<title>{$pageTitle ?? title} - Dimm City</title>
	<meta name="description" content="" />
	<meta name="twitter:image" content={$pageImage} />
	<link rel="icon" type="image/x-icon" href="/assets/icons/shroom256.png" />
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-TJ2LB9K4M4"></script>
	<link as="font" href="/assets/dimm-city.woff2" type="font/woff2" crossorigin="anonymous" />
	<slot name="head" />
</svelte:head>
<PageBackground />
<div class="main-container {title.toLowerCase()}" class:fullscreen>
	<div class="content-panel animate__animated animate__fadeInUp">
		<slot><ContentPane fullsize={true}>404</ContentPane></slot>
	</div>
	<div class="menu-container">
		<MenuBar {title} {enableSearch} {titleUrl}>
			<svelte:fragment slot="action-menu">
				<slot name="action-menu" />
			</svelte:fragment>
		</MenuBar>
	</div>
</div>


<slot name="scripts" />
<Modals>
	<div
		slot="backdrop"
		class="backdrop fade-in"
		on:introstart
		on:outroend
		on:keyup
		on:click={() => {
			closeModal();
		}}
	/>
</Modals>

<style>
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
		grid-template-columns: 1fr;
		grid-template-rows: min-content auto;
		height: 100dvh;
		width: 100dvw;
	}

	.content-panel {
		grid-row: 2;
		display: flex;
		width: 95vw;
		margin: 5.5vh auto 0;
		flex-direction: column;
		overflow: hidden;
		transition: all var(--easing);
		animation-duration: 400ms;
		animation-delay: 200ms;
		--animate-delay: 200ms;
	}

	.menu-container {
		grid-row: 1;
		height: min-content;
		z-index: 10;
		
	}

	@media screen and (max-width: 767px), (max-aspect-ratio: 0.74) {
		.main-container {
			grid-template-rows: auto min-content;
		}

		.menu-container {
			grid-row: 2;
		}

		.content-panel {
			grid-row: 1;
			margin: 0 auto 4vh;
		}
	}
</style>
