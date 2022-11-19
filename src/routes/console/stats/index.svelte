<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Shell from '$lib/Components/Shell.svelte';
	import MainMenu from '$lib/Components/Menu/MainMenu.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import { characters, districts, specialties } from '$lib/Shared/ShellStore';
	import { config } from '$lib/Shared/config';
</script>

<Shell title="Console Stats">
	<ContentPane>
		<h4 class="">Console Stats:</h4>
		<ul class="unstyled-list">
			<li>Current Version: {config.version}</li>
			<li>Connection Status: Weak</li>
			<li>Citizen Profiles recorded: {$characters.length}</li>
			<li>Citizen Specialities recorded: {$specialties.length}</li>
			<li>Districts recorded: {$districts.length}</li>
			<!-- <li>License: <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
                CC-BY
              </a>
			</li> -->
		</ul>

		<h4>technologies, projects, and contributions</h4>
		<p>A true thank you to all of the people that poured hours of passion into these projects!</p>
		<ul class="unstyled-list">
			<li><a href="https://augmented-ui.com/">augmented-ui</a></li>
			<li><a href="https://animate.style/">animate.css</a></li>
			<li><a href="https://docs.ethers.io/v5/">ethers</a></li>
			<li><a href="https://kit.svelte.dev/">SvelteKit</a></li>
			<li><a href="https://github.com/mattjennings/svelte-modals">svelte-modals</a></li>
			<li><a href="https://github.com/EvanOxfeld/svelte-step-wizard">svelte-step-wizard</a></li>
			<li><a href="https://gitlab.com/clb1/svelte-ethers-store">svelte-ethers-store</a></li>
			<li><a href="https://www.typescriptlang.org/">TypeScript</a></li>
			<li><a href="https://github.com/web3modal/web3modal">web3modal</a></li>
			<li><a href="https://eslint.org/">eslint</a></li>
			<li><a href="https://prettier.io/">prettier</a></li>
			<li><a href="https://strapi.io/">Strapi</a></li>
			<li><a href="http://www.twinery.org/">Twine</a></li>
		</ul>
	</ContentPane>
	<MainMenu slot="menu" />
</Shell>
