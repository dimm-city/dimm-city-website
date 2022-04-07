<script lang="ts">
	import { getContext } from 'svelte';
	export let id: string;

	const getTabPanelContext = () => {
		const context = getContext('TabPanel');
		if (!context) {
			throw new Error('TabPanel compound components cannot be rendered outside the TabPanel component');
		}
		return context;
	};

	const { tab, setTab } = getTabPanelContext() as any;
</script>

{#if $tab === id}
	<div class="fade-in">
		<slot {setTab} />
	</div>
{/if}
