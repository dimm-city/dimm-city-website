<script>
	import MenuPanel from './Menu/MenuPanel.svelte';
	import ContentPane from './ContentPane.svelte';
	import MainMenu from './Menu/MainMenu.svelte';
	import { showMenu } from './ShellStore';

	import '../styles/main.css';
	import '../styles/main.mobile.css';
	export let title;
	export let fullsize = true;
	export let showMenuButton = true;
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=false" />
	<title>{title} - Dimm City</title>
	<link rel="icon" type="image/x-icon" href="/assets/icons/acorn256.png" />
	<slot name="head" />
</svelte:head>

<div class="vertical-acordion" class:bottom={$showMenu} class:top={!$showMenu}>
	<div class="top-panel">
		<ContentPane {fullsize}>
			<slot>404</slot>
		</ContentPane>
	</div>
	<div class="accordion-divider">
		<div
			class="acordion-divider-decoration"
			aria-hidden="true"
			data-augmented-ui="tl-clip l-clip t-clip-x b-clip-x tr-clip r-clip bl-clip br-clip"
		/>
		<div class="global-toolbar">
			<a href="/connection" data-augmented-ui="all-hex border"><i class="bi bi-key" /></a>
			{#if showMenuButton}
				<button on:click={() => ($showMenu = !$showMenu)} data-augmented-ui="all-triangle-up border" class="btn-menu" />
			{/if}
			<a href="/help" data-augmented-ui="all-hex border"><i class="bi bi-question-lg" /></a>
		</div>
	</div>
	<div class="bottom-panel">
		<MenuPanel header={title}>
			<slot name="menu">
				<MainMenu />
			</slot>
		</MenuPanel>
	</div>
	<slot name="scripts" />
</div>
