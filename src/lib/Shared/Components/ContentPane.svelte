<script lang="ts">
	export let fullsize = true;
	export let padding = 3;
	export let scrollable: boolean = true;
</script>

<style>
	.content-decoration-glow {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		filter: var(--content-decoration-filter) ;
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
		--aug-l: 1vmin;
		--aug-r: 1vmin;
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
		aspect-ratio: 16 / 9;
		overflow: hidden;		
	}
	.content-container.full-size {
		aspect-ratio: unset;
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
		height: 100%;
		width: 100%;
		overflow: hidden;
		padding: 0 3rem;
	}
	.content-slot.padding-0{
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
		width: 0rem; /* width of the entire scrollbar */
	}

	@media all and (max-width: 768px), (max-aspect-ratio: 0.74) {
		.content-container {
			position: relative;
			height: 100%;
			width: 100%;
			aspect-ratio: 3/4;
		}
	}

	@media (max-width: 750px) {

		.content-slot {
			overflow-y: auto;
		}
		.augmented-content-decoration {
			--aug-border-all: 0.25vh;
		}
	}
</style>

<div class="content-container" class:full-size={fullsize}>
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
