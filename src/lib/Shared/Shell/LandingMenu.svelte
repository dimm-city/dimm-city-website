<script>
	import { loggedIn, user } from '../Stores/UserStore';

	let checked = false;

	function onBodyClick() {
		if (checked) checked = false;
	}

	function toggleMenu() {}

	const bodyHandler = () => {
		if (checked) document.body.addEventListener('click', onBodyClick);
		else document.body.removeEventListener('click', onBodyClick);
	};
</script>

<nav>
	<input bind:checked type="checkbox" id="nav-toggle" on:change={bodyHandler} />
	<a class="site-title" href="/">Dimm City RPG</a>
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore a11y-interactive-supports-focus -->
	<div
		class="nav-toggle-container"
		role="button"
		tabindex="0"
		on:click|stopPropagation={toggleMenu}
		on:keyup|stopPropagation={toggleMenu}
	>
		<label for="nav-toggle" class="nav-toggle-label"> &lt;&lt; </label>
	</div>
	<div class="nav-items-container" on:visibilitychange={bodyHandler}>
		<ul>
			<!--<li><a href="/about/overview">Overview</a></li>
			 <li><a href="/about/faq">FAQ</a></li>
			<li><a href="/about/glossary">Glossary</a></li> -->
			<li><a href="/about">About</a></li>
			<!-- <li><a href="/gallery">Gallery</a></li> -->

			{#if $loggedIn}
				<li><a href="/spores">Spores</a></li>
				<li><a href="/dashboard">Console</a></li>
				<li><a href="/profile">{$user?.displayName ?? $user?.username}</a></li>
			{:else}
				<li><a href="/profile">Profile</a></li>
			{/if}
		</ul>
	</div>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 1rem;
		margin-block: 0;
		margin-inline: auto;
		font-family: var(--header-font-family);
		letter-spacing: 0.1rem;
	}

	nav a {
		color: var(--highlight-color);
		text-decoration: none;
		text-wrap: balance;
		display: inline-block;
		width: 100%;
	}

	nav a:hover,
	nav a:focus-visible,
	nav a:active {
		color: var(--secondary-color);
		text-decoration: none;
	}

	nav ul {
		display: flex;
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	nav ul li {
		margin-left: 1.5rem;
		pointer-events: all;
	}

	/* Hide the checkbox */
	#nav-toggle,
	.nav-toggle-label {
		display: none;
	}

	.nav-items-container {
		padding-block: 1rem;
		background-color: var(--background-color-opaque);
	}

	.site-title {
		display: block;
		width: auto;
		white-space: nowrap;
	}
	/* Show the toggle button on small screens */
	@media screen and (max-width: 768px) {
		nav {
			padding-right: 0;
			padding-left: 1rem;
		}

		/* Make the menu vertical */
		nav ul {
			flex-direction: column;
		}

		nav ul li {
			padding-inline: 0.2rem;
		}
		nav ul li a {
			padding-block: 0.5rem;
		}

		/* Style the toggle button */
		.nav-toggle-label {
			cursor: pointer;
			color: var(--highlight-color);
			display: flex;
			align-items: center;
			justify-content: center;
			padding-inline: 0.5rem;
			padding-block: 0.5rem;
		}

		.nav-items-container {
			position: fixed;
			height: 100dvh;
			width: 50dvw;
			padding-top: 1.5rem;
			right: -50dvw;
			top: 1.75rem;
			transition: all 300ms ease-in-out;
		}

		.nav-toggle-container {
			transition: all 0.3s ease-in-out;
			transform: rotate(0deg);
		}
		#nav-toggle:checked ~ .nav-toggle-container {
			z-index: 101;
			transform: rotate(-180deg);
			transition: all 0.3s ease-in-out;
		}
		/* Show menu items when checkbox is checked */
		#nav-toggle:checked ~ .nav-items-container {
			display: block;
			visibility: visible;
			z-index: 100;
			right: 0;
			transition: all 300ms ease-in-out;
		}
	}
</style>
