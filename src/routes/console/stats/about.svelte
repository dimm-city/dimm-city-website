<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import MainMenu from '$lib/Components/Menu/MainMenu.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import { showMenu } from '$lib/ShellStore';
	$showMenu = false;
</script>

<Shell title="Depenedcies and Integrations" showMenuButton={true} showMainMenuButton={false}>
	<ContentPane>
		<h4 class="">Depenedcies and Integrations:</h4>
		<ul class="unstyled-list">
            <li><a href="">augmented-ui</a></li>
            <li><a href="">animate.css</a></li>
            <li><a href="">ethers</a></li>
            <li><a href="">SvelteKit</a></li>
            <li><a href="">svelte-modals</a></li>
            <li><a href="">svelte-step-wizard</a></li>
            <li><a href="">svelte-ethers-store</a></li>
            <li><a href="">TypeScript</a></li>
            <li><a href="">web3modal</a></li>
            <li><a href="">eslint</a></li>
            <li><a href="">prettier</a></li>
            <li><a href="">Strapi</a></li>
            <li><a href="">Twine</a></li>
		</ul>
	</ContentPane>
	<MainMenu slot="menu" />
</Shell>
