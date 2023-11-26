<script>
	export let visible = false;
	export let icon = 'bi bi-lightning-charge';
	export let position = 'bottom';
	export let title = '';
	/**
	 * @type {HTMLDivElement}
	 */
	let dropdownContent;

	/**
	 * @type {HTMLButtonElement}
	 */
	let button;
	/**
	 * @param {MouseEvent|KeyboardEvent} event
	 */
	function toggleDropdown(event) {
		visible = !visible;
		console.log('menu toggle');
		event.stopPropagation();
		if (visible) document.body.addEventListener('click', onBodyClick);
		else document.body.removeEventListener('click', onBodyClick);
	}

	$: if (position.includes('top') && dropdownContent && button) {
		const buttonRect = button.getBoundingClientRect();
		dropdownContent.style.bottom = `${buttonRect.height}px`;
	}

	function onBodyClick() {
		if (visible) visible = false;
	}
</script>

<div class="dropdown {$$props.class ?? ''}">
	<button
		bind:this={button}
		class="dropdown-button aug-button"
		data-augmented-ui="all-hex both"
		{title}
		on:click={toggleDropdown}
	>
		<i class={icon} /></button
	>
	<div
		class="dropdown-content"
		role="button"
		tabindex="0"
		data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x both"
		class:visible
		class:hidden={!visible}
		on:click={toggleDropdown}
		on:keyup={toggleDropdown}
		bind:this={dropdownContent}
	>
		<div class="dropdown-content-grid">
			<slot />
		</div>
	</div>
</div>

<style>
	.dropdown {
		position: relative;
		display: inline-block;
	}

	.aug-button:hover,
	.aug-button:focus {
		color: white;

		--aug-border-bg: var(--pink);
	}
	.aug-button:hover i,
    .aug-button:focus i{
        font-size: 1.25rem;
    }
	.dropdown-button {
		cursor: pointer;
		aspect-ratio: 1/1;
		--aug-border-all: 1px;
		--aug-border-bg: var(--yellow);
		--aug-all-width: max(45px, 2vw);
		--aug-inlay-bg: var(--pink);
		transition: transform var(--easing);
		opacity: 1;
	}

	.dropdown-content {
		display: grid;
		position: absolute;
		right: 0;
		z-index: -10;
		width: max-content;
		max-width: 90dvw;
		max-height: 80dvh;
		overflow-y: hidden;
		--aug-inlay-bg: #141414ad;
		--aug-border-all: 1px;
		--aug-border-bg: var(--blue);
		--aug-bl: 0.33rem;
		--aug-br: 0.33rem;
		--aug-tl: 0.33rem;
		--aug-tr: 0.33rem;
		transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
	}

	.dropdown:has(.dropdown-content-grid:empty) {
		display: none;
	}

	.dropdown-content.visible {
		z-index: 1;
		opacity: 1;
		transform: translateY(0) translateX(0);
		transition: opacity 0.2s ease-in-out, transform 0.3s ease-in-out;
	}
	.dropdown-content.hidden {
		opacity: 0;
		z-index: -1000;
		display: none;
		transform: translateY(-100px);
		transition: opacity 0.1s ease-in-out, transform 0.2s ease-in-out;
	}

	@media (max-width: 767px) {
		.dropdown-content {
			transform-origin: bottom right;
			bottom: 3rem;
		}
		.dropdown-content.visible {
			transform: translateY(0) translateX(0);
		}
		.dropdown-content.hidden {
			transform: translateY(100rem) translateX(0);
		}
		.dropdown-button {
			--aug-all-width: max(6vh, 5vw);
		}
	}

	.dropdown-content-grid {
		display: grid;
		z-index: -10;
		grid-template-rows: 1fr;
		gap: 1rem;
		padding: 2rem;
		width: fit-content;
		max-height: 80dvh;
		overflow-y: auto;
	}

	.dropdown-content.visible .dropdown-content-grid {
		z-index: 1;
	}

	:global(.dropdown-content-grid *) {
		opacity: 0;
		transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
	}
	:global(.dropdown-content.visible .dropdown-content-grid *) {
		opacity: 1;
	}
	:global(.dropdown-content.hidden .dropdown-content-grid *) {
		opacity: 0;
		transition-delay: 0;
		transition: opacity 1s ease-in-out, transform 0.5s ease;
	}
</style>
