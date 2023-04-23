<script lang="ts">
	import { config } from '$lib/Shared//config';
	import { searchText } from '$lib/Shared/Stores/ShellStore';
	import HexMenu from './Menu/HexMenu.svelte';
	import MainMenu from './Menu/MainMenu.svelte';

	export let enableSearch = false;
	export let title = '';
	export let titleUrl = '';
	export let fullscreen = false;
</script>

<div class="top-panel fade-in animate__animated animate__fadeInDown">
	<div
		class="top-panel-decoration"
		data-augmented-ui="tl-clip l-clip t-clip-x b-clip-x tr-clip r-clip bl-clip br-clip border"
	>
		&nbsp;
	</div>

	<div class="version"><small>DCC v{config.version}</small></div>

	<div class="global-toolbar">
		<MainMenu />
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
		<HexMenu>
			<slot name="action-menu" />
		</HexMenu>
	</div>
</div>

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
		position: fixed;
		--ds: drop-shadow(0 0 0.2vh var(--secondary-accent));
		filter: var(--ds);
		animation-duration: 150ms;
		animation-delay: 50ms;
		--animate-delay: 50ms;
		margin-bottom: 1rem;
	}

	.top-panel-decoration,
	.top-panel-decoration::before,
	.top-panel-decoration::after,
	.top-panel {
		height: 5vh;
		width: 100vw;
		transition: all var(--easing);
	}

	.top-panel-decoration {
		position: fixed;
		background: rgba(0, 0, 0, 0.9);
		--aug-tl1: 0px;
		--aug-tr1: 0px;
		--aug-t1: 0px;
		--aug-t2: 0px;
		--aug-t-extend1: 80%;
		--aug-b1: 0.5rem;
		--aug-b2: 0.5rem;
		--aug-b-extend1: 60%;
		--aug-l1: 1vh;
		--aug-l2: 1vh;
		--aug-r1: 1vh;
		--aug-r2: 1vh;
		--aug-border: initial;
		--aug-border-bg: var(--secondary-accent-muted);
		--aug-border-all: 0.25vh;
		--aug-border-top: 0px;
		--aug-border-bottom: 1px;
		--aug-bl1: 1rem;
		--aug-br1: 1rem;
	}

	.top-panel .global-toolbar {
		position: absolute;
		width: 100vw;
		display: flex;
		justify-content: space-between;
	}

	.top-panel .global-toolbar a {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.version {
		color: var(--third-accent);
		position: absolute;
		bottom: 0.1rem;
		padding-right: 3.5rem;
		width: 100%;
		display: flex;
		justify-content: end;
		transition: all var(--transition-in-time);
		font-size: 0.75rem;
	}

	.search-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70%;
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
		top: 1ch;
		cursor: pointer;
	}
	/* .search-container > .aug-input > i.bi-gear {
		left: 1rem;
	} */
	.search-container > .aug-input > i.bi-search {
		right: 1rem;
	}

	@media (max-width: 750px) {
		.top-panel {
			margin-bottom: 0;
			bottom: 0;
		}
		.top-panel-decoration {
			--aug-tl1: 1vh;
			--aug-tr1: 1vh;
			--aug-t1: 1vh;
			--aug-t2: 1vh;
			--aug-t-extend1: (80% - 1vh);
			--aug-b1: 0vh;
			--aug-b2: 0vh;
			--aug-b-extend1: (80% - 1vh);
			--aug-l1: 0px;
			--aug-l2: 0px;
			--aug-r1: 0px;
			--aug-r2: 0px;
			--aug-border: initial;
			--aug-border-bg: var(--secondary-accent-muted);
			--aug-border-all: 0.5vh;
			--aug-border-top: 1px;
			--aug-border-bottom: 0px;
			--aug-bl1: 0rem;
			--aug-br1: 0rem;
		}
		.top-panel .global-toolbar {
			width: 100vw;
		}
		:global(.global-toolbar div.dropdown:first-of-type) {
			transform: translateX(0.5rem) translateY(-1.5rem);
		}

		:global(.global-toolbar div.dropdown:last-of-type) {
			transform: translateX(-0.5rem) translateY(-1.5rem);
		}
		.search-container {
			display: flex;
			justify-content: center;
			align-items: start;
			width: 80%;
			margin: auto;
		}
		.version {
			padding-right: 1rem;
		}
	}
</style>
