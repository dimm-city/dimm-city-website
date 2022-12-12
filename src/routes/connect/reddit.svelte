<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { config } from '$lib/Shared/config';

	const token = $page.url.searchParams.get('access_token');
	console.log(token);

	fetch(config.apiBaseUrl + '/auth/reddit/callback?access_token=' + token).then((data) => {
		console.log(data);
	});
</script>
