<script context="module">
	export const prerender = false;
</script>

<script>
	import SelectRelease from '$lib/Characters/SelectRelease.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import Shell from '$lib/Components/Shell.svelte';
</script>

<Shell title="Select a release" fullscreen={true}>
	<ContentPane>
		<SelectRelease />
	</ContentPane>
</Shell>
