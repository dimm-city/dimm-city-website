<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Dashboard from '$lib/Dashboard/Dashboard.svelte';
	import { config } from '$lib/Shared/config';
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';
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
					<p>something wicked this way comes...</p>
				</section>
			</div>

			<form>
				<label for="name">Name</label>
				<input type="text" id="name" placeholder="Your name" />

				<label for="email">Email</label>
				<input type="email" id="email" placeholder="Your email" />

				<!-- <label for="select">Select an option</label>
		<select id="select">
			<option value="option1">Option 1</option>
			<option value="option2">Option 2</option>
			<option value="option3">Option 3</option>
		</select>
		
		<label for="message">Message</label>
		<textarea id="message" rows="4" placeholder="Your message"></textarea>
		 -->
				<button type="submit">Stay Informed</button>
			</form>
		</section>
	</div>
</LandingShell>

<style>
	.welcome-container {
		display: flex;
		flex-direction: column;
	}
</style>
