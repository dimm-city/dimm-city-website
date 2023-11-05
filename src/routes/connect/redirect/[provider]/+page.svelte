<script>
	import { getSessionValue, setSessionValue } from '$lib/Shared/Stores/StoreUtils';
	import { page } from '$app/stores';
	import { config } from '$lib/Shared/config';
	import { jwt, loadProfile, loadWallets, user } from '$lib/Shared/Stores/UserStore';
	import { onMount } from 'svelte';

	const token =
		$page.url.searchParams.get('access_token') ??
		new URLSearchParams(window.location.hash.substring(1)).get('access_token');

	const provider = $page.params.provider;

	let redirect = { href: $page.url.searchParams.get('redirect') };

	onMount(async () => {
		console.log('redirect', provider, token);

		const callback = await fetch(
			config.apiBaseUrl + '/auth/' + provider + '/callback?access_token=' + token
		);

		if (callback.ok) {
			const cbData = await callback.json();
			if (document) {
				redirect = getSessionValue('redirect');
				const isAssociatingProfile = getSessionValue('ap');

				if (isAssociatingProfile === true && $jwt && $user) {
					const secondary_token = cbData.jwt;
					const secondary_response = await fetch(config.apiBaseUrl + '/profiles/associate-login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + $jwt
						},
						body: JSON.stringify({
							secondary_token
						})
					});
					if (secondary_response.ok) {
						setSessionValue('ap', false);
						const data = await secondary_response.json();
						console.log('associated profile', data);
						setSessionValue('user', data.profile);

						//await loadProfile();
						document.location = redirect?.href ?? '/profile';
					} else {
						console.warn('failed to associate profile');
					}
				} else {
					//Logging in
					setSessionValue('ap', false);
					setSessionValue('jwt', cbData.jwt);
					setSessionValue('user', cbData.user);
					await loadProfile();
					await loadWallets(true);
					document.location = redirect?.href ?? '/';
				}
			}
		} else {
			console.warn('failed to complete authentication', callback.statusText, await callback.text());
		}
	});
</script>
