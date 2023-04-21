<script>
	import { page } from '$app/stores';
	import ViewCharacter from '$lib/Characters/ViewCharacter.svelte';	
	let tokenId = $page.params.tokenId;
</script>

<ViewCharacter {tokenId} />
