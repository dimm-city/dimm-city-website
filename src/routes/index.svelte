<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Dashboard from '$lib/Dashboard/Dashboard.svelte';
	import { config } from '$lib/Shared/config';
</script>

<Shell title={"DCC Dashboard " + config.version} fullscreen={true}>
	<ContentPane padding={0}>
		<Dashboard />
	</ContentPane>
</Shell>
