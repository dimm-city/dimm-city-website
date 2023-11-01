<script>
	import { config } from '$lib/Shared/config';
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';
	import { loggedIn, user } from '$lib/Shared/Stores/UserStore';
	import { setSessionValue } from '$lib/Shared/Stores/StoreUtils';
	import { onMount } from 'svelte';
	import { marked } from 'marked';

	export let data;
	onMount(() => {
		console.log('data', data);
		setSessionValue('redirect', document?.location);
	});
</script>

<LandingShell title="Dimm City RPG">
	<div class="centered-container">
		<section class="form-container">
			<div class="welcome-container">
				<section class="hero">
					<h1>Dimm City RPG</h1>
					<p>hack the ethereal realm</p>
				</section>
			</div>
			<hr />
			{#if $loggedIn}
				<div class="logged-in fade-in">
					<section>
						<h2>Welcome {$user?.profile?.displayName ?? $user?.username}, fellow Dreamer</h2>
						{@html marked.parse(data.loggedIn?.attributes.content ?? '')}
					</section>
				</div>
			{:else}
				<div class="fade-in">
					<section>
						{@html marked.parse(data.public?.attributes.content ?? '')}
						<div class="register-links">
							<a class="button" href={config.apiBaseUrl + '/connect/google'}
								><i class="bi bi-google" />Sign in with Google</a
							>
							<a class="button" href={config.apiBaseUrl + '/connect/reddit'}
								><i class="bi bi-reddit" />Sign with Reddit</a
							>
							<a class="button" href={config.apiBaseUrl + '/connect/itchio'}
								><i class="bi bi-reddit" />Sign with itch.io</a
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
