<script>
	import MenuPanel from './Menu/MenuPanel.svelte';
	import ContentPane from './ContentPane.svelte';
	import MainMenu from './Menu/MainMenu.svelte';
	import { showMenu, loggedIn } from './ShellStore';
	import '../styles/main.css';
	import '../styles/main.mobile.css';
	import '../styles/animations.css';
	import 'animate.css';
	import { onMount } from 'svelte';
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
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=false" />
	<title>{title} - Dimm City</title>
	<link rel="icon" type="image/x-icon" href="/assets/icons/acorn256.png" />
	<slot name="head" />
</svelte:head>

<div class="vertical-acordion {title.toLowerCase()}" class:bottom={$showMenu} class:top={!$showMenu}>
	<div class="top-panel slide-in-down">
		<slot><ContentPane fullsize={true}>404</ContentPane></slot>
		<div class="content-toolbar-container">
			<slot name="content-toolbar"></slot>
		</div>
	</div>
	<div class="accordion-divider">
		<div
			class="acordion-divider-decoration fade-in"
			aria-hidden="true"
			data-augmented-ui="tl-clip l-clip t-clip-x b-clip-x tr-clip r-clip bl-clip br-clip"
		/>
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
			<a href="/help" data-augmented-ui="all-hex border"><i class="bi bi-question-lg fade-in" /></a>
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
