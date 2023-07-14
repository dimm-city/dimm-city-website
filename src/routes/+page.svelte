<script lang="ts">
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Dashboard from '$lib/Dashboard/Dashboard.svelte';

	import { getLatestCharacters } from '$lib/Shared/Stores/getCharacters';
	import { getDistricts } from '$lib/Shared/Stores/getDistricts';
	import { getFeaturedJournalEntries } from '$lib/Shared/Stores/getJournalEntries';
	import { getFeaturedSpecialties } from '$lib/Shared/Stores/getSpecialties';
	import { config } from '$lib/Shared/config';
	import { onMount } from 'svelte';
	export let data;

	const load = async () => {
		const latestNews = await getFeaturedJournalEntries();
		const districts = await getDistricts();
		const specialties = await getFeaturedSpecialties();
		const citizens = await getLatestCharacters();

		data = {
			latestNews,
			districts,
			specialties,
			citizens
		};
	};

	onMount(() => load());
</script>

<Shell title={'DCC Dashboard ' + config.version} fullscreen={true}>
	<ContentPane padding={0}>
		<Dashboard
			districts={data?.districts}
			specialties={data?.specialties}
			citizens={data?.citizens}
			latestNews={data.latestNews}
		/>
	</ContentPane>
</Shell>
