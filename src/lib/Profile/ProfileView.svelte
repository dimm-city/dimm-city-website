<script lang="ts">
	import { config } from '$lib/Shared/config';
	import { profile, jwt, loggedIn } from '$lib/Shared/Stores/UserStore';
	import { onMount } from 'svelte';
	onMount(async () => {
		if ($loggedIn) {
			const response = await fetch(`${config.apiBaseUrl}/users/me?fields=*&populate=*`, {
				headers: {
					Authorization: `Bearer ${$jwt}`
				}
			});
			if (response.ok) {
				$profile = await response.json();
			}
		}
	});
</script>

<div>
	<h1>{$profile?.settings?.displayName ?? $profile?.username}</h1>
	<small
		><a href="/console/archive">archives: {$profile?.wallets?.length ?? '0'}</a>
	</small>
	<p>{@html $profile?.settings?.bio ?? ''}</p>
</div>

<style>
	h1 {
		margin-bottom: 0;
	}
</style>
