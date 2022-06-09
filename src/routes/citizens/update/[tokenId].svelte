<script context="module">
	export const prerender = false;
</script>

<script>
	import { page } from '$app/stores';
	import UpdateCharacter from '$lib/Characters/UpdateCharacter.svelte';

	let tokenId = $page.params.tokenId;
</script>

<UpdateCharacter {tokenId} />
