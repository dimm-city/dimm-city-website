<script>
	import { page } from '$app/stores';
	import ViewCharacter from '$lib/Characters/ViewCharacter.svelte';	
	let tokenId = $page.params.tokenId;
	export let data;
</script>

<ViewCharacter {tokenId} character={data}/>
