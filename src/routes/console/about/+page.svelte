<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import { config } from '$lib/Shared/config.js';
	export let data = {};
</script>

<Shell title="Console Stats">
	<ContentPane padding={2} scrollable={true}>
		<div>
			<h3>Console Stats:</h3>
			<ul class="unstyled-list">
				<li>Environment: {config.env}</li>
				<li>Version: {config.version}</li>
				<li>Connection Version: {data.version}</li>
				<li>Connection Status: Weak</li>
				<li><a href="/citizens">Citizen Files</a>: {data.character}</li>
				<li><a href="/specialties">Specialties</a>: {data.specialty}</li>
				<li><a href="/locations">Locations</a>: {data.location}</li>
				<li><a href="/journal-entries">Journal entries</a>: {data['journal-entry']}</li>
			</ul>
		</div>
		
	</ContentPane>
</Shell>

<style>
	a {
		display: inline;
	}
</style>
