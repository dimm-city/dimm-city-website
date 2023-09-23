<script>
	import { config } from '$lib/Shared/config';
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';
	import { loggedIn, user } from '$lib/Shared/Stores/UserStore';
	import { setSessionValue } from '$lib/Shared/Stores/StoreUtils';
	import { onMount } from 'svelte';
	onMount(() => {
		setSessionValue('redirect', document?.location);
	});
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
					<section>
						<h2>Welcome {$user?.profile?.displayName ?? $user?.username}, fellow Dreamer</h2>

						<p>
							We are hard at work extracting information from the ruins of the DC Archives. We hope
							to publish the Op Manual soon. In the meantime, please feel free to browse the <a
								href="/dashboard">DC Console</a
							>
							to learn more about the city and it's citizens.
						</p>
						<p>
							You can also download a single shot <a href="/spores">Spore</a> and start exploring some
							of the districts of Dimm City.
						</p>
						<!-- <p>Check the status of our current <a href="/" target="_blank">kickstarter</a></p> -->
						<p>
							Join the
							<a href="https://www.reddit.com/r/DimmCityRPG/" target="_blank"
								>Dimm City RPG subreddit</a
							> to stay updated on the last news from the city. We will be announce release dates, community
							events, and more!
						</p>
					</section>
				</div>
			{:else}
				<div class="fade-in">
					<section>
						<p>
							What makes a dream a dream and a nightmare a nightmare? Dreams are mostly pleasant,
							but always slinking along the edges is the threat of shadows ready to flood in. This
							is a good analogy for the five districts of Dimm City. Here there are bright parts of
							the metropolis like the breadbasket of The Market District, but also the pit of horror
							known to all here as The Dark.
						</p>
						<p>
							The conflict between the collective freedom of the populace and the capitalistic
							mega-corporations' attempts at enslavement is palpable. Aliens, angels, AI, outsider
							horrors, and the native anthropomorphic sporos each have their own alliances and
							factions, with some individuals navigating both sides of the divide to their own
							benefit. It is within this tumult that agents are needed to move the needle one way or
							the other.
						</p>
						<p>
							Who wins this struggle is up to you! Will you dream yourself a canine sporos rabble
							rousing for the people or enter into a nightmare as an android suppressing the
							rebellion? When you prowl the five districts of DimmC, just stepping into the shadows
							is enough to pull you into a death-defying adventure.
						</p>
						<p>
							Dimm City isn't just a game, it's a dreamscape that your imagination breathes life
							into. Countless sagas await your character and choices. Are you ready to wake up?
						</p>
						<p>Sign in to begin your journey into the city...</p>

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
