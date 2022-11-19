<script lang="ts">
	import { getCharacterReleases } from './getCharacterReleases';
	import type { ICharacterRelease } from './IArticle';
	let releases = [];
	getCharacterReleases().then((d) => (releases = d));
	export let selectedRelease: ICharacterRelease = {
		id: 0,
		name: 'DCS1R1: Rabbits',
		slug: '',
		description: 'Cute and terryfing...',
		imageUrl: 'https://files.dimm.city/assets/specialties/augmerc.png',
		videoUrl: 'https://files.dimm.city/assets/specialties/augmerc.mp4',
		thumbnailUrl: '',
		tags: '',
		author: '',
        config: {}
	};
</script>

<select bind:value={selectedRelease}>
    {#each releases as item}
	<option value="{item}">{item.name}</option>
    {/each}
</select>
