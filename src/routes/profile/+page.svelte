<script>
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';
	import { logout, user } from '$lib/Shared/Stores/UserStore';
	import { config } from '$lib/Shared/config';

	/** @type {import('./$types').PageData} */
	export let data;

	$: data = JSON.parse(JSON.stringify($user));
	let editing = false;
    /**
	 * @type {any}
	 */
    let _temp;
	function updateProfile() {
		//Send to API

		$user = JSON.parse(JSON.stringify(data));
		editing = false;
	}
	function startEditing() {
        _temp = JSON.stringify(data);
		editing = true;
	}
	function cancelEditing() {
        console.log('cancel');
		data =  JSON.parse(_temp);
		editing = false;
	}
</script>

<LandingShell>
	<article class="fade-in content-container">
		<LoggedInContainer>
			<div class="register-links" slot="public">
				<a class="button" href={config.apiBaseUrl + '/connect/google'}
					><i class="bi bi-google" />Sign in with Google</a
				>
				<a class="button" href={config.apiBaseUrl + '/connect/reddit'}
					><i class="bi bi-reddit" />Sign in with Reddit</a
				>
			</div>
			<div class="header">
				<div class="top-row">
					<h1 contenteditable={editing}>{data?.settings?.displayName ?? data?.username}</h1>
					<div class="profile-menu">
						<!-- <a class="text-button" href="/console/characters/create">create character</a> -->

						<!-- <a href="/console/archive"><small>manage archives</small></a> -->
						{#if editing}
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="#" class="text-button" on:click={updateProfile}>save</a>
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="#" class="text-button" on:click={cancelEditing}>cancel</a>
						{:else}
							<!-- svelte-ignore a11y-missing-attribute -->
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<a class="text-button" on:click={startEditing}>update profile</a>
							<!-- <a href="/console/archive"><small>manage archives</small></a> -->
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="#" class="text-button" on:click={logout}>logout</a>
						{/if}
					</div>
				</div>

				<!-- svelte-ignore a11y-missing-attribute -->
				<!-- <p>{@html data?.settings?.bio ?? ''}</p> -->
			</div>
			<hr />
			<div>
				<h4><span>username:</span> {data?.username}</h4>
				<h4><span>provider:</span> {data?.provider}</h4>
				<h4>
					<span>email:</span>
					<span contenteditable={editing}>{data?.email ?? 'Missing email address'}</span>
				</h4>
				{#if data?.email?.endsWith('strapi.io')}
					<small class="warning">Please update your email address</small>
				{/if}
			</div>
		</LoggedInContainer>
	</article>
</LandingShell>

<style>
	.header > .top-row {
		display: flex;
		justify-content: space-between;
	}

	hr {
		margin-block: 0.25rem;
	}
	h4 > span:first-of-type {
		color: var(--accent-color);
	}
	.profile-menu {
		display: flex;
		gap: 0.5rem;
		justify-content: end;
	}
</style>
