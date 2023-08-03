<script>
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Dashboard from '$lib/Dashboard/Dashboard.svelte';
	import { config } from '$lib/Shared/config';
</script>

<svelte:head>
	<link rel="stylesheet" href="/assets/styles/landing-styles.css" />
</svelte:head>

<header>
	<nav>
		<a href="/">Dimm City RPG</a>
		<ul>
			<li><a href="/console">Console</a></li>
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