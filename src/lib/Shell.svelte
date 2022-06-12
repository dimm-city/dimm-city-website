<script lang="ts">
	import MenuPanel from './Components/Menu/MenuPanel.svelte';
	import ContentPane from './Components/ContentPane.svelte';
	import MainMenu from './Components/Menu/MainMenu.svelte';
	import { Modals, closeModal, closeAllModals } from 'svelte-modals';
	import { pageImage, showMenu } from './ShellStore';
	import '../styles/main.css';
	import 'animate.css';
	import { onMount } from 'svelte';
	import { config } from './config';
	import { loggedIn } from './ChainStore';
	import Toolbar from './Components/Toolbar.svelte';
	import AccordionDivider from './Components/AccordionDivider.svelte';
	export let title;
	export let showMainMenuButton = true;
	export let showMenuButton = true;
	export let fullscreen = false;
	onMount(async () => {
		closeAllModals();
		// if(window.ethereum && window.ethereum.isConnected()){
		// 	connect();
		// }
		// window.ethereum.on('connect', (connectInfo) => {
		// 	connect();
		// });
		// window.ethereum.on('disconnect', (error) => {
		// 	disconnect();
		// });
	});
</script>

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
	.vertical-accordion {
		position: absolute;
		left: 50%;
		width: 90vw;
		max-width: calc(90vh / 9 * 16);
		top: 0;
		bottom: 0;
		transform: translateX(-50%);
	}
	.top-panel {
		height: calc(100vh - var(--divider-height));
		transition: all var(--easing);
		overflow: hidden;
		padding-top: 1rem;
		animation-duration: 500ms;
		animation-delay: 300ms;
		--animate-delay: 300ms;
	}
	.bottom .top-panel {
		margin-top: -100vh;
	}

	.bottom-panel {
		height: calc(100vh - var(--divider-height));
		position: absolute;
		width: 100%;
		top: 115vh;
		transition: top var(--easing);
	}
	.fullscreen .top-panel,
	.fullscreen .bottom-panel {
		height: 100vh;
	}
	.bottom .bottom-panel {
		top: 15vh;
	}

	.top-panel-grid {
		height: 100%;
		display: grid;
		grid-template-rows: 1fr min-content;
	}

	.top-panel-content-row {
		display: flex;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	.top-panel-toolbar-row {
		width: 100%;
		overflow: hidden;
		padding: 1rem;
	}
	@media all and (max-width: 768px), (max-aspect-ratio: 0.74) {
		:root {
			--divider-gap: 3em;
		}
		.vertical-accordion {
			overflow: hidden;
		}
		.top-panel {
			height: calc(95vh - var(--divider-height));
		}

		.bottom-panel {
			height: 94vh;
			max-width: 98vw;
		}
		.bottom .bottom-panel {
			top: 0vh;
			transform: translateY(10vh);
		}
	}

	@media (max-width: 750px) {
		.vertical-accordion {
			width: 99vw;
		}
		.content-toolbar-container {
			width: 100%;
			padding: 1rem;
			top: 77vh;
		}
	}
</style>

<svelte:head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=false" />
	<title>{title} - Dimm City</title>
	<meta name="description" content="" />
	<meta name="twitter:image" content={$pageImage} />
	<link rel="icon" type="image/x-icon" href="/assets/icons/shroom256.png" />
	<link rel="preload" as="font" href="/assets/dimm-city.woff2" type="font/woff2" crossorigin="anonymous" />
	<slot name="head" />
</svelte:head>

<div class="vertical-accordion {title.toLowerCase()}" class:bottom={$showMenu} class:top={!$showMenu} class:fullscreen>
	<div class="top-panel animate__animated animate__backInDown">
		<div class="top-panel-grid">
			<div class="top-panel-content-row">
				<slot><ContentPane fullsize={true}>404</ContentPane></slot>
			</div>
			<div class="top-panel-toolbar-row">
				<slot name="content-toolbar" />
			</div>
		</div>
	</div>
	{#if !fullscreen}
		<AccordionDivider {showMenuButton} />
	{/if}
	<div class="bottom-panel">
		<MenuPanel header={title} {showMainMenuButton}>
			<slot name="menu">
				<MainMenu />
			</slot>
		</MenuPanel>
	</div>
	<slot name="scripts" />
</div>

<Modals>
	<div
		slot="backdrop"
		class="backdrop fade-in"
		on:introstart
		on:outroend
		on:click={() => {
			closeModal();
		}}
	/>
</Modals>
