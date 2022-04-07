<script lang="ts">
	import { showMenu } from '../ShellStore';
	import { config } from '../config';
	import DiceRollerModal from './DiceRollerModal.svelte';
	import { loggedIn } from '../ChainStore';
	import Toolbar from './Toolbar.svelte';
	import { openModal } from 'svelte-modals';
	export let showMenuButton = true;
	function showDice() {
		openModal(DiceRollerModal, { fullscreen: true });
	}
</script>

<style>
	.accordion-divider {
		--ds: drop-shadow(0 0 2vh var(--blue));
		filter: var(--ds) var(--ds);
	}

	.accordion-divider,
	.accordion-divider-decoration {
		height: var(--divider-height);
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	.accordion-divider-decoration {
		background: rgb(17 17 17 / 0.75);
		--aug-tl1: 2vh;
		--aug-tr1: 2vh;
		--aug-t1: 1vh;
		--aug-t2: 1vh;
		--aug-t-extend1: (80% - 10vh);
		--aug-b1: 0px;
		--aug-b2: 0px;
		--aug-b-extend1: (80% - 10vh);
		--aug-l1: 2vh;
		--aug-l2: 2vh;
		--aug-r1: 2vh;
		--aug-r2: 2vh;
		--aug-border: initial;
		--aug-border-bg: var(--pink);
		--aug-border-all: 0.5vh;
		--aug-border-bottom: 0px;
		--aug-bl1: 0px;
		--aug-br1: 0px;
	}

	.accordion-divider-decoration,
	.accordion-divider-decoration::before,
	.accordion-divider-decoration::after {
		transition: clip-path var(--easing);
	}

	.bottom.accordion-divider-decoration {
		--aug-t1: 0px;
		--aug-t2: 0px;
		--aug-border-top: 0px;
		--aug-border-bottom: 0.5vh;
		--aug-b1: 1vh;
		--aug-b2: 1vh;
		--aug-bl1: 2vh;
		--aug-br1: 2vh;
		--aug-tl1: 0px;
		--aug-tr1: 0px;
	}
	.accordion-divider .global-toolbar {
		display: flex;
		justify-content: space-between;
	}

	.accordion-divider button,
	.accordion-divider a {
		cursor: pointer;
		border: none;
		background: var(--pink);
		/* transform: translate(0, -30%) rotateZ(0deg); */
		--aug-border-all: 0.2vh;
		--aug-border-bg: var(--blue);
		--aug-all-width: 5vh;
		transition: transform var(--easing);
	}
	.accordion-divider .global-toolbar a {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bottom.accordion-divider .global-toolbar a {
		transform: translate(0, 0%) rotateZ(360deg);
	}

	.accordion-divider .global-toolbar button.btn-menu {
		transform: translate(0, 0%) rotateZ(360deg);
	}
	.bottom.accordion-divider .global-toolbar button.btn-menu {
		transform: translate(0, 100%) rotateZ(180deg);
	}

	.version {
		color: var(--third-accent);
		position: absolute;
		bottom: 0em;
		padding-right: 1rem;
		width: 100%;
		display: flex;
		justify-content: end;
		transition: all var(--transition-in-time);
		font-size: 0.75rem;
	}

	.bottom .version {
		bottom: 0.3em;
		padding-right: 1.2rem;
	}
	.global-toolbar i {
		margin: 0;
		font-size: 1.5rem;
		color: var(--light);
	}

	.accordion-divider {
		transition: bottom var(--easing), transform var(--easing);
	}

	.bottom.accordion-divider {
		bottom: 100%;
		transform: translateY(100%);
	}

	@media (max-width: 750px) {
		.accordion-divider-decoration {
			--aug-border-all: 0.25vh;
		}
		.bottom.accordion-divider-decoration {
			--aug-border-bottom: 0.25vh;
		}
		.bottom .accordion-divider .global-toolbar button.btn-menu {
			transform: translate(0, 75%) rotateZ(180deg);
		}
	}
</style>

<div class="accordion-divider" class:bottom={$showMenu}>
	<div
		class="accordion-divider-decoration fade-in"
		class:bottom={$showMenu}
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
		<button on:click={showDice} data-augmented-ui="all-hex border"
			><img src="/assets/icons/dice256.png" height="24" width="24" alt="dice icon" /></button
		>
	</div>
</div>
