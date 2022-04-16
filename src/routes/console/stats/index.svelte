<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import MainMenu from '$lib/Components/Menu/MainMenu.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import { showMenu } from '$lib/ShellStore';
    import { config } from "$lib/config";
	$showMenu = false;
</script>

<Shell title="Console Stats" showMenuButton={true} showMainMenuButton={false}>
	<ContentPane>
		<h4 class="">Console Stats:</h4>
		<ul class="unstyled-list">
            <li>Current Version: 0.2.0</li>
			<li>Connection Status: Weak</li>
            <li><a href="/console/stats/about">Depenedcies and Integrations</a></li>
		</ul>


	</ContentPane>
	<MainMenu slot="menu" />
</Shell>
