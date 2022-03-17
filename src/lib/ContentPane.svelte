<script>
	export let fullsize = true;
	export let padding = 3;
</script>

<div class="content-wrapper padding-{padding}" class:full-size={fullsize}>
	<div
		class="iframe-wrapper"
		data-augmented-ui="bl-clip-inset br-clip-inset tl-2-clip-xy tr-2-clip-xy l-rect r-rect t-clip"
	>
		<slot />
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
	.content-decoration-glow {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		--ds: drop-shadow(0 0 0.3rem var(--pink));
		filter: var(--ds) var(--ds);
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
		--aug-border-all: 0.2rem;
		--aug-border-bg: var(--blue);
	}
	.augmented-content-decoration,
	.content-wrapper .iframe-wrapper {
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

	.content-wrapper {
		position: relative;
		height: 87vh;
		max-width: 100vw;
		aspect-ratio: 16 / 9;
		margin-top: calc((100vh - 100% / 16 * 9) / 2 - 5vh);
		overflow-x: hidden;
	}
	.content-wrapper.full-size {
		aspect-ratio: unset;
		margin-top: 1em;
	}
	.content-wrapper .iframe-wrapper {
		display: block;
		width: 99%;
		height: 99%;
		margin: auto;
		overflow: hidden;
		height: 100%;
		filter: drop-shadow(0 0 2vh var(--pink));
		background: rgb(17 17 17 / 0.75);
		color: var(--light);
		overflow-y: auto;

		scrollbar-color: var(--third-accent) var(--secondary-accent);
		scrollbar-width: thin;

	}

	.iframe-wrapper::-webkit-scrollbar
	{
		color: var(--secondary-accent);
		/* width: 100px; */
		
	}
	.content-wrapper.padding-0 .iframe-wrapper{
		padding: 0;
	}
	.content-wrapper.padding-3 .iframe-wrapper{
		padding: 1rem 3em;
	}

	@media all and (max-width: 768px), (max-aspect-ratio: 0.74) {
		.content-wrapper {
			position: relative;
			height: 100%;
			max-width: 90vw;
			aspect-ratio: 3/4;
			margin: 1em auto 0;
		}

		.content-wrapper.full-size {
			height: 75vh;
		}
	}

	@media (max-width: 750px) {
		.augmented-content-decoration {
			--aug-border-all: 0.25vh;
		}
	}
</style>
