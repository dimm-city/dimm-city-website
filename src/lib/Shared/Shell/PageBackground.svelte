<div class="page-background" />

<style>
	.page-background {
		z-index: -1;;
		background: var(--page-background);
		background-size: 400% 400%;
		/* animation: background-gradient 30s ease infinite; */
	}

	.page-background {
		/*https://www.gradient-animator.com*/
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: linear-gradient(
			33deg,
			var(--primary-accent),
			var(--primary-accent),
			var(--dark),
			var(--dark),
			var(--dark),
			var(--secondary-accent-muted),
			var(--secondary-accent-muted)
		);
		background-size: calc(100vh * 3) calc(100vw * 3);

		--bg-animation-duration: 40s;
		/* -webkit-animation: background-gradient var(--bg-animation-duration)
			cubic-bezier(0.375, 0.5, 0.32, 0.9) infinite alternate-reverse;
		-moz-animation: background-gradient var(--bg-animation-duration)
			cubic-bezier(0.375, 0.5, 0.32, 0.9) infinite alternate-reverse;
		animation: background-gradient var(--bg-animation-duration) cubic-bezier(0.375, 0.5, 0.32, 0.9)
			infinite alternate-reverse; */
	}

	@media (max-width: 750px) {
		.page-background {
			background-size: calc(100vh * 5.5) calc(100vw * 5.3);
		}
	}
</style>
