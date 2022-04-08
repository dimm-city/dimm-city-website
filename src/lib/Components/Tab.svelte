<script lang="ts">
	import { getContext } from 'svelte';
	export let id: string;
	export let padding: number;

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
	<div class="fade-in h-100 padding-{padding}">
		<slot {setTab} />
	</div>
{/if}
