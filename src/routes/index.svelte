<Shell title="Home" showMenuButton={true} showMainMenuButton={false}>
	<ContentPane><button on:click={() => openRoller()}>roll</button></ContentPane>
	<MainMenu slot="menu" />
</Shell>

<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Shell from '$lib/Shell.svelte';
	import MainMenu from '$lib/Components/Menu/MainMenu.svelte';
	import ContentPane from '$lib/Components/ContentPane.svelte';

	import DiceRollerModal from '$lib/Components/DiceRollerModal.svelte';
	import { openModal } from 'svelte-modals';

	function openRoller() {
		openModal(DiceRollerModal, { color: 'brown', fullscreen: true });
	}
</script>
