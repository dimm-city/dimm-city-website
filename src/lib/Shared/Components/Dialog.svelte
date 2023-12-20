<script>
	export let show = false; // boolean
	export const open = () => {
		dialog.show();
		show = true;
	};

	export const close = () => {
		dialog.close();
		show = false;
	};
	/**
	 * @type {HTMLDialogElement}
	 */
	let dialog; // HTMLDialogElement

	$: if (dialog && show) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close on:click|self={close} data-augmented-ui>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<div class="dialog-grid">
			<div>
				<slot name="header" />
			</div>
			<div>
				<slot />
			</div>
			<div>
				<slot name="footer" />
			</div>
		</div>
		<!-- svelte-ignore a11y-autofocus -->
		<button class="text-button" autofocus on:click={close}><i class="bi bi-x" /></button>
	</div>
</dialog>

<style>
	:root {
		--dc-dialog-animation-duration: 0.2s;
	}
	dialog {
		border-radius: 0;
		border: none;
		padding: 0;
		position: absolute;
		background-color: var(--dark);
		outline-color: var(--fourth-accent);
		outline-style: solid;
		outline-width: 1px;
		color: var(--light);
		min-width: 30ch;
		min-height: 30ch;
	}
	dialog > div {
		padding: 1em;
		position: relative;
	}
	.dialog-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content auto min-content;
	}

	button {
		color: var(--third-accent);
		font-size: 1.5rem;
		display: block;
		position: absolute;
		right: 0;
		top: 0;
	}

	dialog {
		animation: fade-out var(--dc-dialog-animation-duration) ease-out forwards;
	}

	dialog[open] {
		animation: fade-in var(--dc-dialog-animation-duration) ease-out;
	}

	dialog::backdrop {
		display: block;
		/* animation: backdrop-fade-out var(--dc-dialog-animation-duration) ease-out forwards; */
		background-color: rgba(255, 0, 0, 0);
		transition: background-color var(--dc-dialog-animation-duration) ease-in;
	}

	dialog[open]::backdrop {
		background-color: rgba(46, 2, 116, 0.651);
		transition: background-color var(--dc-dialog-animation-duration) ease-in;
		/* animation: backdrop-fade-in var(--dc-dialog-animation-duration) ease-out;  */
	}

	/* Animation keyframes */

	@keyframes fade-in {
		0% {
			opacity: 0;
			transform: scale(0);
			display: none;
		}

		100% {
			opacity: 1;
			transform: scale(1);
			display: block;
			position: absolute;
		}
	}

	@keyframes fade-out {
		0% {
			opacity: 1;
			transform: scale(1);
			display: block;
			position: absolute;
		}
		100% {
			opacity: 0;
			transform: scale(0);
			position: absolute;
		}
	}

	@keyframes backdrop-fade-in {
		from {
			background-color: rgb(0 0 0 / 0);
		}

		to {
			background-color: rgb(170, 9, 9);
		}
	}

	@keyframes backdrop-fade-out {
		from {
			display: block;
			background-color: black;
		}

		to {
			display: block;
			background-color: rgb(0 0 0 / 0);
		}
	}
</style>
