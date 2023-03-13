<script lang="ts">
	import type { ICharacter } from '$lib/Characters/Models/Character';
	import Image from '$lib/Shared/Components/Image.svelte';
	import { config } from '$lib/Shared/config';

	export let character: ICharacter;
	let imageUrl = '';
	$: if (character.token?.data) {
		// //HACK: this should not be done by splitting strings!!
		let imagePath = `${character.tokenId.split('-').at(0)}/${character.tokenId
			.split('-')
			.at(1)}.png`;
		imageUrl = `${config.apiBaseUrl}/chain-wallets/images/${imagePath}`;
	} else {
		imageUrl = character.imageUrl;
	}
</script>

<Image {imageUrl} title={character.name} on:click />
