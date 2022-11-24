<script lang="ts">
	import { getCharacterReleases } from '../Queries/getCharacterReleases';
	import type { ICharacterRelease } from './ICharacterRelease';
	import { defaultEvmStores, contracts, chainId } from 'svelte-ethers-store';

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

	let totalSupply;
	$: if (selectedRelease?.id > 0) {
		console.log(selectedRelease.config.address);
		defaultEvmStores
			.attachContract('selectedContract', selectedRelease.config.address, selectedRelease.config.abi)
			.then((x) => {
				if ($contracts.selectedContract) totalSupply = $contracts.selectedContract.totalSupply();
				else console.log('no contract', $contracts.selectedContract, $chainId);
			});
	}
</script>

<select bind:value={selectedRelease} on:change>
	{#each releases as item}
		<option value={item}>{item.name}</option>
	{/each}
</select>
