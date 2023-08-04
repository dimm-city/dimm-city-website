<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Dashboard from '$lib/Dashboard/Dashboard.svelte';
	import { config } from '$lib/Shared/config';
	import { loggedIn } from '../Stores/UserStore';
</script>

<svelte:head>
	<link rel="stylesheet" href="/assets/styles/landing-styles.css" />
</svelte:head>

<header>
	<nav>
		<a href="/">Dimm City RPG</a>
		<ul>
			{#if $loggedIn}
			<li><a href="/console">Console</a></li>
			{/if}
			<li><a href="/about">About</a></li>
			<!-- <li><a href="/console">Contact</a></li> -->
		</ul>
	</nav>
</header>
<main>
<slot></slot>
</main>
<footer>
	<div>
		<small>&copy; 2023 Dimm City</small>
		<small> v{config.version}</small>
	</div>
</footer>