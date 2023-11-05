<script>
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import Toggle from '$lib/Shared/Components/Toggle.svelte';
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';
	import {
		logout,
		user,
		updateProfile,
		associateLogin,
		removeLogin,

		getItchIoLoginUrl

	} from '$lib/Shared/Stores/UserStore';
	import { config } from '$lib/Shared/config';
	import { setSessionValue } from '$lib/Shared/Stores/StoreUtils';
	import { onMount } from 'svelte';
	import LoginButtons from '$lib/Shared/Components/LoginButtons.svelte';
	onMount(() => {
		setSessionValue('redirect', document?.location);
	});
	const itchioUrl = getItchIoLoginUrl()
	let editing = false;
	/**
	 * @type {any}
	 */
	let _temp;
	async function saveChanges() {
		//Send to API
		await updateProfile($user);
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

	// $: if ($user && $user.profile == null)
	// 	$user.profile = {
	// 		email: $user.email
	// 	};

	/**
	 * @type {any[]}
	 */
	$: associatedLogins = $user?.users ?? [];
</script>

<LandingShell title="Profile">
	<article class="fade-in content-container">
		<LoggedInContainer>
			<div class="register-links" slot="public">
				<h3>Sign in to manage your profile</h3>
				<LoginButtons />
			</div>
			<div class="header">
				<div class="top-row">
					{#if editing}
						<!-- svelte-ignore a11y-missing-content -->
						<h1 contenteditable="true" bind:innerText={$user.displayName} />
					{:else}
						<h1>{$user.displayName}</h1>
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
				<h4>
					<span>email:</span>
					{#if editing}
						<span contenteditable="true" bind:innerText={$user.email} />
					{:else}
						<span>{$user?.email ?? 'Missing email address'}</span>
					{/if}
				</h4>
				{#if $user?.email?.endsWith('strapi.io')}
					<small class="warning">Please update your email address</small>
				{/if}
				<h4>
					<Toggle
						bind:checked={$user.notifications}
						label="Receive Dimm City News"
						enabled={editing}
					/>
				</h4>
			</div>
			<div>
				<h4><span>bio:</span></h4>
				{#if editing}
					<p contenteditable="true" bind:innerHTML={$user.bio} />
				{:else}
					<!-- svelte-ignore a11y-missing-attribute -->
					<p>{@html $user?.bio ?? ''}</p>
				{/if}
			</div>

			<div>
				<h3>Connect Account</h3>
				<div class="register-links">
					{#if !associatedLogins.some((a) => a.provider === 'itchio')}
						<button on:click={() => associateLogin(itchioUrl)} class="button"
							><i class="bi bi-house" />Connect itch.io</button
						>
					{/if}
					{#if !associatedLogins.some((a) => a.provider === 'google')}
						<button
							class="button"
							on:click={() => associateLogin(config.apiBaseUrl + '/connect/google')}
							><i class="bi bi-google" />Connect Google</button
						>
					{/if}
					{#if !associatedLogins.some((a) => a.provider === 'reddit')}
						<button
							class="button"
							on:click={() => associateLogin(config.apiBaseUrl + '/connect/reddit')}
							><i class="bi bi-reddit" />Connect Reddit</button
						>
					{/if}
				</div>
			</div>
			<div>
				<h3>Remove Account</h3>
				<div class="register-links">
					{#if associatedLogins.some((a) => a.provider === 'itchio')}
						<button on:click={() => removeLogin('itchio')} class="button"
							><i class="bi bi-house" />Disconnect itch.io</button
						>
					{/if}
					{#if associatedLogins.some((a) => a.provider === 'google')}
						<button class="button" on:click={() => removeLogin('google')}
							><i class="bi bi-google" />Disconnect Google</button
						>
					{/if}
					{#if associatedLogins.some((a) => a.provider === 'reddit')}
						<button class="button" on:click={() => removeLogin('reddit')}
							><i class="bi bi-reddit" />Disconnect Reddit</button
						>
					{/if}
				</div>
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
	h3{
		color: var(--highlight-color);
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
