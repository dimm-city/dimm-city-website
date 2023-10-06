<script>
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import Toggle from '$lib/Shared/Components/Toggle.svelte';
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';
	import { logout, user, updateProfile } from '$lib/Shared/Stores/UserStore';
	import { config } from '$lib/Shared/config';
	import { setSessionValue } from '$lib/Shared/Stores/StoreUtils';
	import { onMount } from 'svelte';
	onMount(() => {
		setSessionValue('redirect', document?.location);
	});
	let editing = false;
	/**
	 * @type {any}
	 */
	let _temp;
	async function saveChanges() {
		//Send to API
		await updateProfile($user.profile);
		editing = false;
	}
	function startEditing() {
		_temp = JSON.stringify($user);
		editing = true;
	}
	function cancelEditing() {
		console.log('cancel');
		$user = JSON.parse(_temp);
		editing = false;
	}
	$: if ($user && $user.profile == null)
		$user.profile = {
			email: $user.email
		};
</script>

<LandingShell>
	<article class="fade-in content-container">
		<LoggedInContainer>
			<div class="register-links" slot="public">
				<h3>Sign in to manage your profile</h3>
				<a class="button" href={config.apiBaseUrl + '/connect/google'}
					><i class="bi bi-google" />Sign in with Google</a
				>
				<a class="button" href={config.apiBaseUrl + '/connect/reddit'}
					><i class="bi bi-reddit" />Sign in with Reddit</a
				>
			</div>
			<div class="header">
				<div class="top-row">
					{#if editing}
						<!-- svelte-ignore a11y-missing-content -->
						<h1 contenteditable="true" bind:innerText={$user.profile.displayName} />
					{:else}
						<h1>{$user.profile?.displayName}</h1>
					{/if}
					<div class="profile-menu">
						{#if editing}
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="#" class="text-button" on:click={saveChanges}>save</a>
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="#" class="text-button" on:click={cancelEditing}>cancel</a>
						{:else}
							<!-- <a class="text-button" href="/console/characters/create">create character</a> -->

							<!-- svelte-ignore a11y-missing-attribute -->
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<a class="text-button" on:click={startEditing}>edit</a>
							<!-- <a href="/console/archive"><small>manage archives</small></a> -->
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="#" class="text-button" on:click={logout}>logout</a>
						{/if}
					</div>
				</div>
			</div>
			<hr />
			<div>
				<h4><span>username:</span> {$user?.username}</h4>
				<h4><span>provider:</span> {$user?.provider}</h4>
				<h4>
					<span>email:</span>
					{#if editing}
						<span contenteditable="true" bind:innerText={$user.profile.email} />
					{:else}
						<span>{$user?.profile?.email ?? 'Missing email address'}</span>
					{/if}
				</h4>
				{#if $user?.profile?.email?.endsWith('strapi.io')}
					<small class="warning">Please update your email address</small>
				{/if}
				<h4>
					<Toggle
						bind:checked={$user.profile.notifications}
						label="Receive Dimm City News"
						enabled={editing}
					/>
				</h4>
			</div>
			<div>
				<h4><span>bio:</span></h4>
				{#if editing}
					<p contenteditable="true" bind:innerHTML={$user.profile.bio} />
				{:else}
					<!-- svelte-ignore a11y-missing-attribute -->
					<p>{@html $user?.profile?.bio ?? ''}</p>
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

	h1,
	h4,
	h4 > span,
	p {
		padding-block: 0.2rem;
	}
	h1 {
		margin-bottom: 0.5rem;
	}
	h4 > span:first-of-type {
		color: var(--accent-color);
	}
	.profile-menu {
		display: flex;
		gap: 0.5rem;
		justify-content: end;
	}
	[contenteditable] {
		padding: 0.2rem;
		outline: 1px solid var(--secondary-color);
		border-radius: 4px;
	}
</style>
