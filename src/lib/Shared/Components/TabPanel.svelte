<script lang="ts">
	import ContentPane from './ContentPane.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let initialTab = '';
	let tab = writable<string>(initialTab);

	export function setTab(id: string) {
		tab.set(id);
	}

	setContext('TabPanel', {
		setTab,
		tab
	});
</script>

<div>
	<slot />
</div>
