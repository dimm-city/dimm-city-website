<script>
	import { config } from '$lib/Shared/config';
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import { profile } from '$lib/Shared/Stores/UserStore';
</script>

<svelte:head>
	<link rel="stylesheet" href="/assets/styles/landing-styles.css" />
</svelte:head>
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
			<LoggedInContainer>
				<div slot="public" class="fade-in">
					<h2>Hello dreamer, have you come looking for the secrets of Dimm City?</h2>

					<p>
						Dreamer, the time is nigh! We're on the brink of launching our Kickstarter campaign for
						the 'Dreamer's Guide to Dimm City'. This isn't just a guide, it's your ticket to the
						ethereal realms of Dimm City, where dreams meld into reality. Be part of our journey.
						Sign up now to stay updated on our progress, and be the first to step into the
						dreamscape when it unfolds.
					</p>
					<p>
						Remember, Dreamer, the future of Dimm City rests in your hands – or rather, in your
						dreams. Wake up to the dream!
					</p>
					<p>
						There are several options available to register your account. Simply choose one from the
						list below, and being your journey into the city...
					</p>

					<div class="register-links">
						<a class="button" href={config.apiBaseUrl + '/connect/google'}
							><i class="bi bi-google" />Register with Google</a
						>
						<a class="button" href={config.apiBaseUrl + '/connect/reddit'}
							><i class="bi bi-reddit" />Register with Reddit</a
						>
					</div>
				</div>
				<div class="logged-in">
					<h2>Welcome back {$profile?.settings?.displayName ?? $profile?.username}!</h2>
					<h4>Thank you for registering to be a citizen of Dimm City.</h4>
					<section>
						<p>
							Please check back often to get the latest news from Dimm City. Don't forget to join
							our
							<a href="https://www.reddit.com/r/DimmCityRPG/" target="_blank"
								>Dimm City RPG subreddit</a
							>
							and check the status of our current <a href="/" target="_blank">kickstarter</a>.
						</p>
						<p>
							We are hard at work extracting information from the ruins of the DC Archives. We hope
							to publish the Op Manual soon. In the meantime, please feel free to browse the <a
								href="/console">DC Console</a
							>
							to learn more about the city and it's citizens.
						</p>
					</section>
				</div>
			</LoggedInContainer>
			<!--<form>
				<label for="name">Name</label>
				<input type="text" id="name" placeholder="Your name" />

				<label for="email">Email</label>
				<input type="email" id="email" placeholder="Your email" />

				 <label for="select">Select an option</label>
		<select id="select">
			<option value="option1">Option 1</option>
			<option value="option2">Option 2</option>
			<option value="option3">Option 3</option>
		</select>
		
		<label for="message">Message</label>
		<textarea id="message" rows="4" placeholder="Your message"></textarea>
		
				<button type="submit">Stay Informed</button>
			</form> -->
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
	.logged-in h2 {
		color: var(--highlight-color);
	}
	.logged-in section {
		padding-block: 1rem;
	}
	.register-links {
		padding-block: 1rem;
	}
</style>
