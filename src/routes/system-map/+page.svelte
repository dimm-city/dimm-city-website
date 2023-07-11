<script>
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import List from './List.svelte';
	export let data;
</script>

<Shell title="System Map">
	<ContentPane padding={1} scrollable={true}>
		<List data={data.pages} />
	</ContentPane>
</Shell>
