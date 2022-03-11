<script>
	import MainMenu from './MainMenu.svelte';
	export let header = '[missing]';
	let showMainMenu = false;
	const toggleMenu = () => (showMainMenu = !showMainMenu);
</script>

<div class="menu-container">
	<div class="left-header" data-augmented-ui="tl-clip l-clip">
		{header}
	</div>
	<div class="right-header" class:active={showMainMenu} data-augmented-ui="tr-clip r-clip" on:click={toggleMenu}>
		<i class="bi bi-bezier2" />
	</div>
	<div
		class="main-panel {showMainMenu ? 'main' : 'page'}"
		data-augmented-ui="tl-2-clip-x tr-2-clip-x"
	>
		<div class="page-menu">
			<slot><MainMenu /></slot>
		</div>
		<div class="main-menu">
			<MainMenu />
		</div>
	</div>
</div>

<style>
	.main-panel div {
		width: 100%;
	}
	.main-panel.page .page-menu {
		transform: translateY(0);
		transition: all 300ms ease-in-out;
	}
	.main-panel.page .main-menu {
		position: absolute;
		transform: translateY(200vw);
		transition: all 300ms ease-in-out;
	}
	.main-menu,
	.page-menu {
		overflow-y: auto;
		overflow-x: hidden;
	}

	.main-panel.main .main-menu {
		transform: translateY(0);
		transition: all 300ms ease-in-out;
	}
	.main-panel.main .page-menu {
		position: absolute;
		transform: translateY(200vw);
		transition: all 300ms ease-in-out;
	}
	.menu-container {
		opacity: 0;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: max(4vh, 30px) 1fr;
		filter: drop-shadow(0 0 2vh var(--pink));
        animation: slideUp 380ms 10ms both ease-in-out;
    }

    @keyframes slideUp {
        0% {
            opacity: 0;
            transform: translateY(200vh);
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
	.left-header,
	.right-header {
		cursor: pointer;
		background: var(--pink);
		width: 50%;
		position: relative;
		font-size: 1.5em;
		color: white;
		padding-top: 3px;
		text-shadow: 0 0 0.25vh black, 0 0 0.25vh black, 0 0 0.25vh black;
	}
	.left-header {
		grid-area: 1 / 1;
		padding-left: max(4vh, 30px);
		--aug-tl1: (max(4vh, 30px) / 3);
		--aug-l: (max(4vh, 30px) / 3);
		justify-self: right;
		right: calc(50% - 2vh - max(4vh, 30px));
		--aug-clip-br1: initial;
		--aug-br1: max(4vh, 30px);
	}
	.right-header {
		grid-area: 1/2;
		--aug-tr1: (max(4vh, 30px) / 3);
		--aug-r: (max(4vh, 30px) / 3);
		left: calc(50% - 2vh - max(4vh, 30px));
		--aug-clip-bl1: initial;
		--aug-bl1: max(4vh, 30px);
		justify-self: left;
		text-align: center;
	}

    .right-header .bi::before{
        transform: rotate(0deg);
        transition: transform 300ms ease-in;
    }
    .right-header.active .bi::before{
        transform: rotate(180deg);
        transition: transform 300ms ease-in;
    }
	.main-panel {
		padding: 3em 1em 0;
		grid-area: 1 / 1 / 3 / 3;
		display: flex;
		height: 100%;
		--aug-tl1: 2vh;
		--aug-tl2: max(4vh, 30px);
		--aug-tl-extend2: 25%;
		--aug-border-right: 0.25vh;
		--aug-tr1: max(4vh, 30px);
		--aug-tr2: 2vh;
		--aug-tr-extend1: 25%;
		--aug-border-left: 0.25vh;
		--aug-border: initial;
		--aug-border-all: 0.5vh;
		--aug-border-bottom: 0px;
		--aug-border-bg: var(--blue);
		background: rgb(17 17 17 / 0.75);
	}

   
	@media (max-width: 576px) {
		.left-header,
		.right-header {
			font-size: 1.2em;
		}
		.left-header {
			padding-right: 7em;
			padding-top: 0.3em;
		}
		.right-header {
			/* left: calc(30% - 2vh - max(4vh, 30px)); */
			width: 65%;
		}
	}
	@media (max-width: 480px) {
		.left-header,
		.right-header {
			font-size: 1em;
		}
	}
	@media (max-width: 415px) {
		.left-header,
		.right-header {
			font-size: 0.9em;
		}
	}
	@media (max-width: 360px) {
		.left-header,
		.right-header {
			font-size: 0.7em;
		}
	}
</style>
