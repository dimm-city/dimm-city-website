<script>
	import { pageTitle } from '$lib/Shared/Stores/ShellStore';
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<title>{$pageTitle} - Dimm City</title>
	<link rel="icon" type="image/png" href="/assets/icons/shroom256.png" />
	<link rel="stylesheet" type="text/css" href="/assets/styles/trifold.css" />
	<link rel="stylesheet" type="text/css" href="/assets/styles/spore-theme.css" />
	<slot name="head" />
</svelte:head>
<slot />
