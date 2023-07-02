<script>
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import List from './List.svelte';
	export let data;

</script>

<Shell title="System Map" enableSearch={false}>
	<ContentPane padding={1}>
			<List data={data.pages} />
	</ContentPane>
</Shell>
