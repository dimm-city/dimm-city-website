<script lang="ts">
	import CharacterTab from '$lib/Characters/Components/Tabs/CharacterSheet.svelte';
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import { characters } from './CharacterStore';
	import Tab from '$lib/Shared/Components/Tab.svelte';
	import CharacterStats from '$lib/Characters/Components/Tabs/CharacterStats.svelte';
	import { loadCharacter } from '$lib/Characters/Queries/getCharacterBySlug';
	import { onMount } from 'svelte';
	import LoadingIndicator from '$lib/Shared/Components/LoadingIndicator.svelte';
	import { updateCharacter } from '$lib/Characters/_remove/updateCharacter';
	import { Character, type ICharacter, type IToken } from './Models/Character';
	import { ownsToken } from '$lib/Shared/Stores/UserStore';
	import Sheet from './Components/CharacterSheet/Sheet.svelte';

	export let tokenId: string;
	let isSaving = false;
	let character: ICharacter;
	let query = new Promise(() => {});
	onMount(async () => {
		character = $characters.find((c) => c.tokenId === tokenId && c.loaded) ?? new Character(null) as ICharacter;
		if (character == null || character.id < 1) {
			query = loadCharacter(tokenId).then((c) => {
				character = c;
				$characters = [c, ...$characters.filter((l) => l.id != c.id)];
			});
		} else {
			query = new Promise((resolve) => resolve(new Character(null)));
		}
	});

	async function save() {
		if (ownsToken(character.token)) {
			isSaving = true;
			await updateCharacter(character)
				.then(() => {
					console.log('character', character);

					//$characters = [...$characters.filter((l) => l.id != character.id)];
					//window.location.href = '/citizens/' + tokenId;
					if (window.history.length > 0) window.history.back();
					else window.location.href = '/citizens/' + tokenId;
				})
				.catch((reason) => {
					console.error('Error updating citizen file', reason);
				})
				.finally(() => (isSaving = false));
		}
	}

	async function cancel() {
		query = loadCharacter(tokenId)
			.then((c) => {
				character = c;
				$characters = [c, ...$characters.filter((l) => l.id != c.id)];
			})
			.then(() => {
				// if (window.history.length > 0) window.history.back();
				// else
				window.location.href = '/citizens';
			});
	}
</script>
<Shell title="Update Character" titleUrl="/console" fullscreen={true}>
	{#await query}
		<LoadingIndicator>Extracting character data...</LoadingIndicator>
	{:then}
		<Sheet {character} />
	{/await}
</Shell>