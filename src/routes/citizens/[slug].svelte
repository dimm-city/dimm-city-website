<script>
	import { page } from '$app/stores';
	import Character from '$lib/Characters/Character.svelte';
	import ContentPane from '$lib/ContentPane.svelte';
	import Shell from '$lib/Shell.svelte';
	import { onMount } from 'svelte';
	import { getCharacterQuery } from '../../queries/getCharacter';
	import { getCharacterBySlugQuery } from '../../queries/getCharacterBySlug';
	import { config } from '$lib/config';


	let id = '1';
	//let id = document ? document.location.hash.replace("#", "") : 0;

	$: slug = `dcs1r1-${id}`;
	let character;

	let query = new Promise(() => {});

	function loadCharacter() {
		return fetch(config.graphUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				query: getCharacterBySlugQuery,
				variables: { slug }
			})
		})
			.then(async (response) => {
				if (response.ok) {
					const json = await response.json();
					console.log('data', id, json);

					character = json.data.character.data ? json.data.character.data.attributes : null;

					return character;
				}
				return null;
			})
			.catch((reason) => {
				console.log('loadCharacter failed', reason);
			});
	}
	onMount(() => {
		query = loadCharacter();
	});
</script>

<Shell title="Citizen">
	<ContentPane>
		{#await query}
			Loading...
		{:then}
			<Character {character} />
		{/await}
	</ContentPane>
</Shell>
