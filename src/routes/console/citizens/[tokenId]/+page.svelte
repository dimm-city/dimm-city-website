<script>
	import Sheet from '$lib/Characters/CharacterSheet/Sheet.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import TwitterButton from '$lib/Shared/Components/TwitterButton.svelte';
	import { ownsToken } from '$lib/Shared/Stores/UserStore.js';
	import { browser } from '$app/environment';

	export let data;
	let isEditable = browser && ownsToken(data.attributes.tokenId);

</script>

<Shell title={data?.attributes.name} titleUrl="/console/citizens" fullscreen={true}>
	{#if data?.id}
		<Sheet character={data} />
	{:else}
		<ContentPane padding={3}>
			<div>
				<h1>404</h1>
				<h3>Unable to locate citizen file.</h3>
			</div>
		</ContentPane>
	{/if}
	<svelte:fragment slot="action-menu">

			{#if isEditable}				
				<a
				title="edit character"
				href="/console/builder#mode=edit&citizen={data.attributes.tokenId}"
				class="aug-button animate__fadeInDownBig"
				data-augmented-ui=""><i class="bi bi-pencil" /></a
			>
			{/if}

			<TwitterButton title="share character" />
			<a
				title="print character"
				target="_blank"
				href="/console/citizens/{data.attributes.tokenId}/print"
				class="aug-button animate__fadeInDownBig"
				data-augmented-ui=""><i class="bi bi-printer" /></a
			>
	</svelte:fragment>
</Shell>
