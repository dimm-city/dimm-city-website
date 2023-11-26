<script>
	import CharacterBuilder from '$lib/Builder/CharacterBuilder.svelte';
	/**
	 * @type {DC.Character}
	 */
	export let data;

	
</script>

<CharacterBuilder {data} />