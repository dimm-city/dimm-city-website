<script lang="ts">
	import { config } from '$lib/Shared//config';
	import { loggedIn } from '$lib/Shared/Stores/UserStore';
	import { searchText } from '$lib/Shared/Stores/ShellStore';
	import MainMenuModal from './MainMenuModal.svelte';
	import { openModal } from 'svelte-modals';

	export let enableSearch = false;
	export let title = '';
	export let titleUrl = '';
	export let fullscreen = false;
	function showModalMenu() {
		openModal(MainMenuModal, { fullscreen: true });
	}
</script>

<style>
	h4 {
		position: absolute;
		color: var(--light);
		margin-top: 0px;
	}
	h4 a {
		text-decoration: none;
		color: var(--fourth-accent);
	}

	.top-panel {
		--ds: drop-shadow(0 0 0.2vh var(--pink));
		filter: var(--ds);
		animation-duration: 150ms;
		animation-delay: 50ms;
		--animate-delay: 50ms;
	}

	.top-panel,
	.top-panel-decoration {
		height: var(--divider-height);
		position: absolute;
		top: 0;
		width: 100%;
		;
	}

	.top-panel-decoration {
		background: rgba(0, 0, 0, 0.74);
		--aug-tl1: 0px;
		--aug-tr1: 0px;
		--aug-t1: 0px;
		--aug-t2: 0px;
		--aug-t-extend1: (80% - 10vh);
		--aug-b1: 1vh;
		--aug-b2: 1vh;
		--aug-b-extend1: (80% - 10vh);
		--aug-l1: 2vh;
		--aug-l2: 2vh;
		--aug-r1: 2vh;
		--aug-r2: 2vh;
		--aug-border: initial;
		--aug-border-bg: var(--pink);
		--aug-border-all: 0.5vh;
		--aug-border-top: 0px;
		--aug-border-bottom: 1px;
		--aug-bl1: 1rem;
		--aug-br1: 1rem;
	}

	.top-panel-decoration,
	.top-panel-decoration::before,
	.top-panel-decoration::after {
		transition: clip-path var(--easing);
	}

	.top-panel .global-toolbar {
		display: flex;
		justify-content: space-between;
	}

	.top-panel button.panel-button,
	.top-panel a.panel-button {
		cursor: pointer;
		border: none;
		background: var(--pink);
		transform: translate(0, -25%) rotateZ(0deg);
		--aug-border-all: 1px;
		--aug-border-bg: var(--blue);
		--aug-all-width: max(5vh, 2vw);
		transition: transform var(--easing);
	}
	.top-panel .global-toolbar a {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.active .top-panel .global-toolbar a {
		transform: translate(0, 0%) rotateZ(360deg);
	}

	.version {
		color: var(--third-accent);
		position: absolute;
		bottom: 0.5rem;
		padding-right: 1.5rem;
		width: 100%;
		display: flex;
		justify-content: end;
		transition: all var(--transition-in-time);
		font-size: 0.75rem;
	}
	
	.global-toolbar i {
		margin: 0;
		font-size: 1.5rem;
		color: var(--light);
	}

	.top-panel {
		transition: bottom var(--easing), transform var(--easing);
	}

	.search-container {
		margin-top: -2.125rem;
		padding-inline: 3rem;
		display: flex;
		justify-content: center;
		justify-self: center;
	}

	.search-container > .aug-input {
		--aug-border-bg: var(--secondary-accent);
		color: var(--secondary-accent);
		background-color: transparent;
	}
	.search-container > .aug-input > input {
		text-align: center;
	}
	.search-container > .aug-input > i.bi {
		position: absolute;
		color: var(--third-accent);
		top: 0.3rem;
		cursor: pointer;
	}
	.search-container > .aug-input > i.bi-gear {
		left: 1rem;
	}
	.search-container > .aug-input > i.bi-search {
		right: 1rem;
	}

	:global(.fullscreen .top-panel-decoration) {
		display: none;
	}
	@media (max-width: 750px) {
		.top-panel-decoration {
			--aug-border-all: 0.25vh;
		}
	}
</style>

<div class="top-panel fade-in  animate__animated animate__fadeInDown">
	<div
		class="top-panel-decoration fade-in"
		aria-hidden="true"
		data-augmented-ui="tl-clip l-clip t-clip-x b-clip-x tr-clip r-clip bl-clip br-clip"
	/>

	{#if !fullscreen}
	<div class="version"><small>DCC v{config.version}</small></div>
	{/if}
	<div class="global-toolbar">
		<button on:click={showModalMenu} class="panel-button" data-augmented-ui="all-hex border"
			><i class="bi bi-menu-button" title="home screen" /></button
		>

		<a href="/console"  class="panel-button" data-augmented-ui="all-hex border" title="op console">
			{#if $loggedIn}
				<i class="bi bi-person-check-fill fade-in" />
			{:else}
				<i class="bi bi-person-x-fill fade-in" />
			{/if}
		</a>
	</div>
	<div class="search-container">
		{#if enableSearch}
			<div data-augmented-ui class="aug-input">
				<!-- <i class="bi bi-gear" /> -->
				<input bind:value={$searchText} type="text" placeholder="Search {title}..." />
				<i class="bi bi-search" />
			</div>
		{:else}
			<h4><a href={titleUrl}>{title}</a></h4>
		{/if}
	</div>
</div>
