<script lang="ts">
	export let padding = 1;
	export let scrollable: boolean = false;
</script>

<div class="content-container">
	<div
		class="content-wrapper"
		data-augmented-ui="bl-clip-inset br-clip-inset tl-2-clip-xy tr-2-clip-xy l-rect r-rect t-clip"
	>
		<div class="content-slot padding-{padding}" class:scrollable>
			<slot />
		</div>
	</div>
	<div class="content-decoration-glow">
		<div
			aria-hidden="true"
			class="augmented-content-decoration"
			data-augmented-ui="bl-clip-inset br-clip-inset tl-2-clip-xy tr-2-clip-xy l-rect r-rect t-clip"
		/>
	</div>
</div>

<style>
	:root{
		--content-panel-aspect-ratio: unset;
	}
	.content-decoration-glow {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		filter: var(--content-decoration-filter);
		pointer-events: none;
	}
	.augmented-content-decoration {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		pointer-events: none;
		--aug-border: initial;
		--aug-border-all: var(--content-decoration-aug-size);
		--aug-border-bg: var(--content-decoration-aug-color);
	}
	.augmented-content-decoration,
	.content-container .content-wrapper {
		--aug-bl: 2vmin;
		--aug-br: 2vmin;
		--aug-tl: 2vmin;
		--aug-tr: 2vmin;
		--aug-l: 0.5vmin;
		--aug-r: 0.5vmin;
		--aug-l-extend1: 10vmin;
		--aug-r-extend1: 10vmin;
		--aug-l-offset: 10vmin;
		--aug-r-offset: -10vmin;
		--aug-t: 1vmin;
		--aug-t-center: 20vmin;
	}

	.content-container {
		display: flex;
		position: relative;
		min-height: 100%;
		width: 100%;
		overflow: hidden;
	}

	.content-container .content-wrapper {
		display: block;
		width: 100%;
		height: 100%;
		margin: auto;
		overflow: hidden;
		filter: var(--content-container-filter);
		background: var(--content-container-background);
		color: var(--light);
		scrollbar-color: var(--third-accent) var(--secondary-accent);
		scrollbar-width: thin;
	}
	.content-slot {
		display: grid;
		height: 100%;
		width: 100%;
		overflow: hidden;
		padding: 0 3rem;
	}
	.content-slot.padding-0 {
		padding: 0.5rem !important;
	}
	.content-slot.scrollable {
		overflow-y: auto;
	}
	.content-wrapper::-webkit-scrollbar {
		color: var(--secondary-accent);
	}

	/* https://css-tricks.com/custom-scrollbars-in-webkit/ */
	*::-webkit-scrollbar {
		width: 0.35rem; /* width of the entire scrollbar */
	}

	.padding-1 {
		padding: 1.5rem !important;
	}

	@media all and (max-width: 767px), (max-aspect-ratio: 0.74) {
		:root{
			--content-panel-aspect-ratio: 3/4;
		}
		.content-container {
			position: relative;
			height: 100%;
			width: 100%;
			aspect-ratio: var(--content-panel-aspect-ratio);
		}
	}

	@media (max-width: 750px) {
		.augmented-content-decoration {
			--aug-border-all: 0.25vh;
		}
		.padding-1 {
			padding: 1rem !important;
		}
		.padding-3 {
			padding: 0.3rem !important;
		}
	}
</style>
