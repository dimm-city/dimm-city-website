<style>
	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: var(--primary-accent); /* rgba(255, 255, 255, 0.8);*/
	}
	.backdrop.open {
		z-index: 1999;
		filter: blur(10rem);
	}
</style>

<svelte:head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=false" />
	<title>{title} - Dimm City</title>
	<meta name="description" content="" />
	<link rel="icon" type="image/x-icon" href="/assets/icons/shroom256.png" />
	<link rel="preload" as="font" href="/assets/dimm-city.woff2" type="font/woff2" crossorigin="anonymous" />
	<slot name="head" />
</svelte:head>

<Modals>
	<div
		slot="backdrop"
		class="backdrop"
		transition:fade={{ delay: 0, duration: 350 }}
		on:introstart
		on:outroend
		class:open={showModal}
		on:click={() => {
			closeModal();
			$showModal = false;
		}}
	/>
</Modals>
<div class="vertical-acordion {title.toLowerCase()}" class:bottom={$showMenu} class:top={!$showMenu}>
	<div class="top-panel slide-in-down">
		<slot><ContentPane fullsize={true}>404</ContentPane></slot>
		<div class="content-toolbar-container">
			<div class="toolbar fade-in">
				<slot name="content-toolbar" />
			</div>
		</div>
	</div>
	<div class="accordion-divider">
		<div
			class="acordion-divider-decoration fade-in"
			aria-hidden="true"
			data-augmented-ui="tl-clip l-clip t-clip-x b-clip-x tr-clip r-clip bl-clip br-clip"
		/>
		<div class="version"><small>v {config.version}</small></div>
		<div class="global-toolbar">
			<a href="/console" data-augmented-ui="all-hex border">
				{#if $loggedIn}
					<i class="bi bi-window-dock fade-in" />
				{:else}
					<i class="bi bi-window-dash fade-in" />
				{/if}
			</a>
			{#if showMenuButton}
				<button on:click={() => ($showMenu = !$showMenu)} data-augmented-ui="all-triangle-up border" class="btn-menu" />
			{/if}
			<!-- <a href="/help" data-augmented-ui="all-hex border"><i class="bi bi-question-lg fade-in" /></a> -->
			<span />
		</div>
	</div>
	<div class="bottom-panel">
		<MenuPanel header={title} {showMainMenuButton}>
			<slot name="menu">
				<MainMenu />
			</slot>
		</MenuPanel>
	</div>
	<slot name="scripts" />
</div>

<script>
	import { fade } from "svelte/transition";
	import MenuPanel from './Components/Menu/MenuPanel.svelte';
	import ContentPane from './Components/ContentPane.svelte';
	import MainMenu from './Components/Menu/MainMenu.svelte';
	import { Modals, closeModal, openModal } from 'svelte-modals';
	import Modal from './Modal.svelte';
	import { showMenu, loggedIn, showModal, modalComponent } from './ShellStore';
	import '../styles/main.css';
	import '../styles/main.mobile.css';
	import '../styles/animations.css';
	import 'animate.css';
	import { onMount } from 'svelte';
	import { config } from './config';
	export let title;
	export let showMenuButton = true;
	export let showMainMenuButton = true;

	onMount(async () => {
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

	$: if ($showModal) {
		openModal(Modal);
	} else {
		closeModal();
	}
</script>
