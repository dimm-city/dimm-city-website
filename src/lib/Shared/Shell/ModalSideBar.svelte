<script>
	import { createEventDispatcher } from 'svelte';
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';

	export let data = {};
	export let isOpen = false;

	const dispatcher = createEventDispatcher()
	export let dismiss = () => {
		dispatcher('dismiss');
		closeModal();

	};
</script>
{#if isOpen}

<div
	role="dialog"
	class="modal"
	transition:fly|global={{ x: '150vw', delay: 0, duration: 450 }}
	on:introstart
	on:outroend
>
	<div
		class="contents"
		data-augmented-ui="tl-clip-x tr-clip-x br-2-clip-y bl-2-clip-y both"
	>
		<div class="actions">
			<slot name="actions" />
			<div on:click={dismiss} on:keypress={dismiss} role="button" tabindex="0">
				<i class="bi bi-x-octagon" />
			</div>
		</div>
		<div class="modal-content-container">
			<slot {data} />
		</div>
	</div>
</div>
{/if}
<style>
	:root{
		--dc-sidebar-width: minmax(min-content, 50dvw);
		--dc-sidebar-height: min-content;
	}
	[data-augmented-ui]::before {
		background-color: rgba(172, 170, 15, 0);
	}
	:global(.backdrop)	{

		--backdrop: transparent;
		pointer-events: none;
	}
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;

		/* allow click-through to backdrop */
		pointer-events: none;
	}

	.contents {
		width: var(--dc-sidebar-width);
		margin: 2rem;
		height: var(--dc-sidebar-height);
		display: flex;
		padding: 2.5rem;
		background: rgba(0, 0, 0, 0.9);
		pointer-events: auto;
		color: var(--fourth-accent);
		border: 1px;
		--aug-border-all: 2px;
	}
	.modal-content-container {
		height: 100%;
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
