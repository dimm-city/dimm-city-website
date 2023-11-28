<script>
	export let showDetails = false;
	export let side = 'right';
</script>

<div
	class="details-panel {side}"
	class:shown={showDetails}
	class:hidden={!showDetails}
	data-augmented-ui="tl-clip tr-clip br-clip bl-clip both"
>
	<div class="content">
		<slot />
	</div>
	<button class="text-button" on:click={() => (showDetails = !showDetails)}>
		<i class="btn bi bi-chevron-left" /></button
	>
</div>

<style>
	.details-panel {
		position: absolute;
		right: -2ch;
		bottom: 1rem;
		z-index: 1000;
		width: 0;
		height: 80dvh;
		margin: auto;
		display: flex;
		flex-direction: column;
		overflow-y: auto;

		max-height: 100%;
		color: var(--light);

		--aug-inlay-bg: var(--dark);
		--aug-border-bg: var(--fourth-accent);
		padding: 1rem;
	}
	.details-panel.left {
		right: unset;
		left: -2ch;
	}
	.details-panel.shown {
		/* visibility: visible; */
		opacity: 1;
		width: 25dvw;
		right: 0ch;
		transition: width 0.2s ease-in-out, right 0.2s ease-in-out, visibility 0.2s ease-in-out 0s,
			opacity 0.1s ease-in-out;
		transition-delay: 0s;
	}
	.details-panel.left.shown {
		left: 0ch;
		right: unset;
	}
	.details-panel.hidden {
		/* visibility: collapse;
		opacity: 0; */
		width: 5ch;
		transition: width 0.2s ease-in-out, right 0.2s ease-in-out, visibility 0.2s ease-in-out 0.3s,
			opacity 0.3s ease-in-out;
	}

	.details-panel > button {
		position: absolute;
		top: 5px;
		right: 25px;
		transition: width 0.2s ease-in-out, right 0.2s ease-in-out, rotate 0.2s ease-in-out 0s,
			left 0.1s ease-in-out;
	}
	.details-panel.left > button {
		right: 5px;
	}
	.details-panel > button > i {
		rotate: 0deg;
		transition: rotate 0.2s ease-in-out 0s;
	}
	.details-panel.left > button > i {
		rotate: 180deg;
	}
	.details-panel.shown > button {
		right: 5px;
	}
	.details-panel.shown.left > button {
		right: unset;
	}
	.details-panel.shown > button i {
		right: 5px;
		rotate: 180deg;
		transition: rotate 0.2s ease-in-out 0s;
	}
	.details-panel.shown.left > button i {
		right: 5px;
		rotate: 0deg;
		transition: rotate 0.2s ease-in-out 0s;
	}

	.details-panel .content {
		display: grid;
		min-height: 100%;
		grid-template-rows: min-content 1fr min-content;
		overflow: auto;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
		transition-delay: 0.3s;
	}
	.details-panel.shown .content {
		opacity: 1;
	}

	@media (max-width: 768px) {
		.details-panel.shown {
			width: 50dvw;
		}
		.details-panel.hidden {
		/* visibility: collapse;*/
		opacity: 0.5; 
		width: 4ch;
		}
	}

		@media (max-width: 500px) {
		.details-panel.shown {
			width: 90dvw;
		}
	}
</style>
