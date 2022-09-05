<script lang="ts">
	import MenuPanel from './Menu/MenuPanel.svelte';
	import ContentPane from './ContentPane.svelte';

	import { Modals, closeModal, closeAllModals } from 'svelte-modals';
	import { pageImage, showMenu } from '../Shared/ShellStore';
	import '../styles/main.css';
	import 'animate.css';
	import { onMount } from 'svelte';
	import { config } from '../Shared/config';
	import { loggedIn } from '../Shared/ChainStore';
	import Toolbar from './Toolbar.svelte';
	import TopMenu from './TopMenu.svelte';

	export let title;
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
	.main-container {
		position: absolute;
		left: 50%;
		width: 90vw;
		max-width: calc(90vh / 9 * 16);
		top: 0;
		bottom: 0;
		transform: translateX(-50%);
	}
	.content-panel {
		height: calc(100vh - var(--divider-height));
		margin-top: 8vh;
		transition: all var(--easing);
		overflow: hidden;
		padding-top: 1rem;
		animation-duration: 400ms;
		animation-delay: 200ms;
		--animate-delay: 200ms;
	}

	.fullscreen .content-panel {
		height: 100vh;
	}

	.content-panel-grid {
		height: 100%;
		display: grid;
		grid-template-rows: 1fr min-content;
	}

	.content-panel-content-row {
		display: flex;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	.content-panel-toolbar-row {
		width: 100%;
		overflow: hidden;
		padding: 1rem;
	}
	@media all and (max-width: 768px), (max-aspect-ratio: 0.74) {
		:root {
			--divider-gap: 3em;
		}
		.main-container {
			overflow: hidden;
		}
		.content-panel {
			height: calc(95vh - var(--divider-height));
		}
	}

	@media (max-width: 750px) {
		.main-container {
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

<div class="main-container {title.toLowerCase()}">
        
	<div class="content-panel animate__animated animate__backInUp">
		<div class="content-panel-grid">
			<div class="content-panel-content-row">
				<slot><ContentPane fullsize={true}>404</ContentPane></slot>
			</div>
			<div class="content-panel-toolbar-row">
				<slot name="content-toolbar" />
			</div>
		</div>
	</div>
	{#if !fullscreen}
		<TopMenu />
	{/if}
	<!-- <div class="menu-panel">
		<MenuPanel header={title} {showMainMenuButton}>
			<slot name="menu">
				<MainMenu />
			</slot>
		</MenuPanel>
	</div> -->
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
