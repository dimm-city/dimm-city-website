<script lang="ts">
	import type { ICharacter } from '$lib/Characters/Models/Character';
	import Image from '$lib/Shared/Components/Image.svelte';
	import { config } from '$lib/Shared/config';

	export let character: ICharacter;
	$: imageUrl = `${config.apiBaseUrl}/chain-wallets/images/${character.token.data.attributes.contract?.data.attributes.slug}/${character.token.data.attributes.tokenId}.png`;
		// character.thumbnailImage ||
		// character.imageUrl ||
		// (character.token ? character.token.thumbnail_uri : `/api/chain-wallets/images/${character.token.contract.slug}/${character.token.tokenId}.png`);
</script>

<Image {imageUrl} title={character.name} on:click />
