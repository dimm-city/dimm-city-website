<script>
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';

	export let data = {};
	export let fullscreen = true;

	function dismiss() {
		closeModal();
	}
</script>

<style>
	[data-augmented-ui]::before {
		background-color: rgb(128 128 128 / 25%);
	}
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;

		/* allow click-through to backdrop */
		pointer-events: none;
	}

	.contents {
		min-width: 80vw;
		margin: 5rem;
		min-height: 10rem;
		display: flex;

		/* border-radius: 2em; */
		padding: 2.5rem;
		background: rgba(0, 0, 0, 0.9);
		/* display: flex;
        flex-direction: column;
        justify-content: space-between; */
		pointer-events: auto;

		color: var(--primary-accent);
		font-size: 0.8rem;
	}
	.contents.fullscreen {
		width: 100vw;
		min-height: 80%;
		margin: 2em;
	}

	.modal-content-container {
		max-height: 80vh;
		width: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
		scrollbar-width: none;
		margin: 1rem 0;
	}

	.modal-content-container::-webkit-scrollbar {
		width: 0px; /* width of the entire scrollbar */
	}

	.modal-content-container::-webkit-scrollbar-track {
		background: transparent;
	}

	.modal-content-container::-webkit-scrollbar-thumb {
		background-color: transparent;
		border: 0px solid var(--fourth-accent); /* creates padding around scroll thumb */
	}
	@media only screen and (min-width: 320px) and (max-width: 767px) {
		/* .contents.fullscreen {
			transform: translateY(10em);
		} */

		.modal {
			width: 94vw;
		}
	}
	@media only screen and (max-width: 475px) {
		.modal {
			width: 100vw;
		}
		.contents {
			width: 94vw;
			margin: 0;
		}
	}
	.actions {
		display: flex;
		justify-content: flex-end;
		font-size: 1.25em;
		min-height: 1.2rem;
		position: absolute;
		right: 2rem;
		top: 1rem;
	}

	.actions i {
		color: var(--third-accent);
		cursor: pointer;
	}
</style>

<div role="dialog" class="modal" transition:fly={{ y: -600, delay: 0, duration: 450 }} on:introstart on:outroend>
	<div class="contents" class:fullscreen data-augmented-ui="tl-2-clip-xy tr-2-clip-xy br-2-clip-y bl-2-clip-y both">
		<div class="actions">
			<slot name="actions" />
			<div on:click={dismiss}><i class="bi bi-x-octagon" /></div>
		</div>
		<div class="modal-content-container">
			<slot {data} />
		</div>
	</div>
</div>
