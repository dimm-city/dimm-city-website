<script lang="ts">
	import { showMenu } from '../Shared/ShellStore';
	import { config } from '../Shared/config';
	import { loggedIn } from '../Shared/ChainStore';
	import Toolbar from './Toolbar.svelte';
	export let showMenuButton = true;
	export let visible = true;
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
	.visible.accordion-divider,
	.visible > .accordion-divider-decoration {
		height: var(--divider-height);
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
		--aug-all-width: max(5vh, 2vw);
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

	@media (min-width: 750px) and (min-aspect-ratio: 4/3) {
		.accordion-divider .global-toolbar a {
			transform: translate(0, -60%);
		}
	}
</style>

<div class="accordion-divider" class:bottom={$showMenu} class:test={visible}>
	<div
		class="accordion-divider-decoration fade-in"
		class:bottom={$showMenu}
		aria-hidden="true"
		data-augmented-ui="tl-clip l-clip t-clip-x b-clip-x tr-clip r-clip bl-clip br-clip"
	/>
	<div class="version"><small>v {config.version}</small></div>
	<div class="global-toolbar">
		<a href="/" data-augmented-ui="all-hex border"><i class="bi bi-motherboard" title="home screen" /></a>
		{#if showMenuButton}
			<button
				title="toggle view"
				on:click={() => ($showMenu = !$showMenu)}
				data-augmented-ui="all-triangle-up border"
				class="btn-menu"
			/>
		{/if}
		<a href="/console" data-augmented-ui="all-hex border" title="op console">
			{#if $loggedIn}
				<i class="bi bi-person-workspace fade-in" />
			{:else}
				<i class="bi bi-window-dash fade-in" />
			{/if}
		</a>
	</div>
</div>
