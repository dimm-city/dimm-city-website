<script>
	import { config } from '$lib/Shared/config';
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';
	import { loggedIn, user } from '$lib/Shared/Stores/UserStore';
</script>

<LandingShell>
	<div class="centered-container">
		<section class="form-container">
			<div class="welcome-container">
				<section class="hero">
					<h1>Dimm City RPG</h1>
					<p>hacking the ethereal realm</p>
				</section>
			</div>
			<hr />
			{#if $loggedIn}
				<div class="logged-in fade-in">
					<h2>Welcome {$user?.profile?.displayName ?? $user?.username}, fellow Dreamer</h2>
					<section>
						<p>
							You have entered the enigmatic maze of reality and illusion that is Dimm City. Our
							lead artist, Scott Georges, has painted the backdrop of our dreamworld with hues of
							sci-fi and cyberpunk, a world where your imagination holds the reins.
						</p>

						<p>
							Dimm City, the crux of our tale, teeters between the tangible and the ethereal. It is
							a metropolis sculpted from your deepest dreams and darkest nightmares, where the
							glimmering skyscrapers meet the nebulous clouds of the dreamverse.
						</p>

						<p>
							In this game, you're not just a bystander, but a luminary of lucid dreaming. As you
							weave through the labyrinth of Dimm City, you become a puppeteer of your own fate,
							crafting scenes that ripple through the dream fabric of this world.
						</p>

						<p>
							You'll roll the dice, of course, but they're not the masters of your destiny. You are.
							Your choices, your actions, and your dreams shape the course of your journey. You'll
							engage with dream economies, manipulate distances, and navigate deadly scenes, all in
							a day's work.
						</p>

						<p>
							Dimm City isn't just a game. It's a dreamscape that breathes and pulsates with your
							imagination. Are you ready to wake up in this dream, Dreamer? Because in Dimm City,
							the limit is not the sky, but your ability to dream.
						</p>

						<p>
							Come around often to stay clued up to the latest news from Dimm City. Don't forget to
							join the
							<a href="https://www.reddit.com/r/DimmCityRPG/" target="_blank"
								>Dimm City RPG subreddit</a
							>.
						</p>
						<p>
							We are hard at work extracting information from the ruins of the DC Archives. We hope
							to publish the Op Manual soon. In the meantime, please feel free to browse the <a
								href="/console">DC Console</a
							>
							to learn more about the city and it's citizens.
						</p>
						<p>Check the status of our current <a href="/" target="_blank">kickstarter</a></p>
					</section>
				</div>
			{:else}
				<div class="fade-in">
					<h2>Hello dreamer, have you come looking for the secrets of Dimm City?</h2>
					<section>
						<p>
							Dreamer, the time is nigh! We're on the brink of launching our Kickstarter campaign
							for the 'Dreamer's Guide to Dimm City'. This isn't just a guide, it's your ticket to
							the ethereal realms of Dimm City, where dreams meld into reality. Be part of our
							journey. Sign up now to stay updated on our progress, and be the first to step into
							the dreamscape when it unfolds.
						</p>
						<p>
							Remember, Dreamer, the future of Dimm City rests in your hands – or rather, in your
							dreams. Wake up to the dream!
						</p>
						<p>Simply sign in, and being your journey into the city...</p>

						<div class="register-links">
							<a class="button" href={config.apiBaseUrl + '/connect/google'}
								><i class="bi bi-google" />Sign in with Google</a
							>
							<a class="button" href={config.apiBaseUrl + '/connect/reddit'}
								><i class="bi bi-reddit" />Sign with Reddit</a
							>
						</div>
					</section>
				</div>
			{/if}
		</section>
	</div>
</LandingShell>

<style>
	.welcome-container {
		display: flex;
		flex-direction: column;
	}
	hr {
		margin-bottom: 2rem;
	}
	.logged-in section {
		padding-block: 1rem;
	}
	.register-links {
		padding-block: 1rem;
	}
</style>
