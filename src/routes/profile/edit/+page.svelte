<script>
	import ProfileView from '$lib/Profile/ProfileView.svelte';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';
	import { logout, profile } from '$lib/Shared/Stores/UserStore';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<LandingShell>
	<LoggedInContainer>
		<article class="fade-in content-container">
			<div class="header">
				<div class="top-row">
					<h1>{$profile?.settings?.displayName ?? $profile?.username}</h1>
					<div class="profile-menu">
						<!-- <a class="text-button" href="/console/characters/create">create character</a> -->
						<a class="text-button" href="/profile">cancel</a>
						<!-- <a href="/console/archive"><small>manage archives</small></a> -->
						<button class="text-button" on:click={logout}>save</button>
					</div>
				</div>

				<!-- svelte-ignore a11y-missing-attribute -->
				<!-- <p>{@html $profile?.settings?.bio ?? ''}</p> -->
			</div>
			<hr />
			<div>
				<h4><span>username:</span> {$profile?.username}</h4>
				<h4><span>provider:</span> {$profile?.provider}</h4>
				<h4><span>email:</span> {$profile?.email ?? 'Missing email address'}</h4>
				{#if $profile?.email.endsWith('strapi.io')}
					<small class="warning">Please update your email address</small>
				{/if}
			</div>
		</article>
	</LoggedInContainer>
</LandingShell>

<style>
	.header > .top-row {
		display: flex;
		justify-content: space-between;
	}

	hr {
		margin-block: 0.25rem;
	}
	h4 > span {
		color: var(--accent-color);
	}
	.profile-menu {
		display: flex;
		gap: 0.5rem;
		justify-content: end;
	}
</style>
