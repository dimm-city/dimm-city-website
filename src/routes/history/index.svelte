<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import Menu from '$lib/Menu/Menu.svelte';
	import MenuItem from '$lib/Menu/MenuItem.svelte';
	import { showMenu } from '$lib/ShellStore';	
</script>

<Shell title="History">
	<div class="container">
		<Menu>
			<MenuItem icon="bi bi-building" title="Welcome to Dimm City" url="/history/introduction">
				An introduction to the world of Dimm City where the Sporos live
			</MenuItem>
			<MenuItem icon="bi bi-cpu-fill" title="Prologue - Scene 1">compiling...</MenuItem>
			<MenuItem icon="bi bi-terminal" title="Prologue - Scene 2">generating...</MenuItem>
			<MenuItem icon="bi bi-safe" title="Locked">identity unknown</MenuItem>
		</Menu>
	</div>
	<Menu slot="menu">
		<MenuItem icon="bi bi-building" title="Welcome to Dimm City" url="/history/introduction">
			An introduction to the world of Dimm City where the Sporos live
		</MenuItem>
		<MenuItem icon="bi bi-cpu-fill" title="Prologue - Scene 1">compiling...</MenuItem>
		<MenuItem icon="bi bi-terminal" title="Prologue - Scene 2">generating...</MenuItem>
		<MenuItem icon="bi bi-safe" title="Locked">identity unknown</MenuItem>
	</Menu>
</Shell>

<style>
	.container {
		padding: 3rem;
		height: 100%;
		filter: drop-shadow(0 0 2vh var(--pink));
		background: rgb(17 17 17 / 0.75);
	}
</style>
