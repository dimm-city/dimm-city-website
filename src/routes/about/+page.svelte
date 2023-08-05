<script>
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<LandingShell videoUrl="https://files.dimm.city/assets/locations/the-dark-drab-edition.mp4">
	<article class="content-container">
		<h1>
			Welcome, fellow Dreamer, to the streets of Dimm City.
		</h1>
		<p>
			Our cover artist, Scott Georges, has painted the backdrop of our dreamworld with hues of
			sci-fi and cyberpunk, a world where your imagination holds the reins.
		</p>

		<p>
			Dimm City, the crux of our tale, teeters between the tangible and the ethereal. It is a
			metropolis sculpted from your deepest dreams and darkest nightmares, where the glimmering
			skyscrapers meet the nebulous clouds of the dreamverse.
		</p>

		<p>
			In this game, you're not just a bystander, but a luminary of lucid dreaming. As you weave
			through the labyrinth of Dimm City, you become a puppeteer of your own fate, crafting scenes
			that ripple through the dream fabric of this world.
		</p>

		<p>
			You'll roll the dice, of course, but they're not the masters of your destiny. You are. Your
			choices, your actions, and your dreams shape the course of your journey. You'll engage with
			dream economies, manipulate distances, and navigate deadly scenes, all in a day's work.
		</p>

		<p>
			Dimm City isn't just a game. It's a dreamscape that breathes and pulsates with your
			imagination. Are you ready to wake up in this dream, Dreamer? Because in Dimm City, the limit
			is not the sky, but your ability to dream.
		</p>
	</article>
	<style>
		h1 {
			margin-bottom: 1rem;
			color: var(--accent-color);
		}
		h2 {
			margin-top: 1.25rem;
			color: var(--secondary-color);
		}
	</style>
</LandingShell>
