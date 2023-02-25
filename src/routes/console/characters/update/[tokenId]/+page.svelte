<script>
	import { page } from '$app/stores';
	import UpdateCharacter from '$lib/Characters/UpdateCharacter.svelte';

	let tokenId = $page.params.tokenId;
</script>

<UpdateCharacter {tokenId} />
