<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import MainMenu from '$lib/Menu/MainMenu.svelte';
	import { showMenu } from '$lib/ShellStore';
	import ContentPane from '$lib/ContentPane.svelte';
	$showMenu = false;
</script>

<Shell title="Help">
	<ContentPane><div class="content">Need help?</div></ContentPane>
	<MainMenu slot="menu" />
</Shell>
<style>
    .content {
        padding: 3rem;
    }

</style>