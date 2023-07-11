<script lang="ts">
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Dashboard from '$lib/Dashboard/Dashboard.svelte';
	import { config } from '$lib/Shared/config';
</script>

<Shell title={"DCC Dashboard " + config.version} fullscreen={true}>
	<ContentPane padding={0}>
		<Dashboard />
	</ContentPane>
</Shell>
