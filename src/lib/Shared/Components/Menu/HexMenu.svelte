<script>
	export let visible = false;
	export let icon = 'bi bi-lightning-charge';
	export let position = 'bottom';
	/**
	 * @type {HTMLDivElement}
	 */
	let dropdownContent;

	/**
	 * @type {HTMLButtonElement}
	 */
	let button;
	/**
	 * @param {MouseEvent} event
	 */
	function toggleDropdown(event) {
		visible = !visible;
	}

	$: if (position.includes('top') && dropdownContent && button) {
		const buttonRect = button.getBoundingClientRect();
		dropdownContent.style.bottom = `${buttonRect.height}px`;
	}
</script>

<div class="dropdown">
	<button
		bind:this={button}
		class="dropdown-button aug-button"
		data-augmented-ui="all-hex"
		on:click={toggleDropdown}
	>
		<i class={icon} /></button
	>
	<div
		class="dropdown-content {position}"
		data-augmented-ui="tl-clip-x tr-clip-x br-clip-x bl-clip-x both"
		class:visible
		class:hidden={!visible}
		bind:this={dropdownContent}
	>
		<slot />
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
		opacity: 0.75;

		--aug-border-bg: var(--blue);
	}
	.dropdown-button {
		cursor: pointer;
		/* background: var(--pink); */
		--aug-border-all: 1px;
		--aug-border-bg: var(--blue);
		--aug-all-width: max(5vh, 2vw);
		--aug-inlay-bg: var(--blue);
		transition: transform var(--easing);
	}

	.dropdown-content {
		display: grid;
		position: absolute;
		z-index: -1;
		grid-template-rows: 1fr;
		gap: 1rem;
		padding: 2rem;
		left: 0;
		right: 0;
		width: max-content;
		--aug-inlay-bg: var(--dark);
		--aug-border-all: 1px;
		--aug-border-bg: var(--blue);

		transform: translateY(-100px);
		transition: opacity 0.1s ease-in-out, transform 0.15s ease-in-out;
	}

	.dropdown-content.bottom {
		top: 100%;
		transform-origin: top left;
		/* animation: backInDown; */
	}
	.dropdown-content.bottom.left {
		top: 100%;
		transform-origin: top right;
		left: unset;
		right: 0;
	}
	.dropdown-content.top {
		transform-origin: bottom left;
		/* animation: backInUp; */
	}

	.dropdown-content.visible {
		z-index: 1;
		opacity: 1;
		transform: translateY(0);
		transition: opacity 0.1s ease-in-out, transform 0.15s ease-in-out;
		/* transform: scaleY(1) scaleX(1);
		transition: transform 300ms ease-in-out; */
	}
	.dropdown-content.hidden {
		opacity: 0;
		transform: translateY(-100px);
		transition: opacity 0.1s ease-in-out, transform 0.15s ease-in-out;
		transition-delay: 0.5s;
		/* transform: scaleY(0) scaleX(0);
		transition: transform 300ms ease-in-out; */
	}

	:global(.dropdown-content > *) {
		transform: translateY(-200px);
		opacity: 0;
		transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
		transition-delay: 0.3s;
	}
	:global(.dropdown-content.visible > *) {
		transform: translateY(0);
		opacity: 1;
	}
	:global(.dropdown-content.hidden > *) {
		transform: translateY(-200px);
		opacity: 0;
		transition-delay: 0;
	}
</style>
