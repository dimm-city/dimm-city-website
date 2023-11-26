<script>
	import Sheet from '$lib/Characters/Components/CharacterSheet/Sheet.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Shell from '$lib/Shared/Shell/Shell.svelte';
	import TwitterButton from '$lib/Shared/Components/TwitterButton.svelte';
	import { ownsToken } from '$lib/Shared/Stores/UserStore.js';
	import { updateEntity } from '$lib/Shared/SvelteStrapi.js';
	import { browser } from '$app/environment';

	export let data;
	let originalCharacter = JSON.stringify(data);
	let isEditable = browser && ownsToken(data.attributes.tokenId);
	let isEditing = false;
	let isSaving = false;

	function startEditing() {
		isEditing = true;
		originalCharacter = JSON.stringify(data);
	}


	async function saveChanges() {
		if (ownsToken(data.attributes.tokenId)) {
			isSaving = true;

			const importData = JSON.parse(JSON.stringify(data.attributes));
			importData.playerUpdated = true;
			//importData.slug = character.name.replace(' ', '-');

			delete importData.mainImage;
			delete importData.mainModel;
			delete importData.mainVideo;
			delete importData.mainAudio;

			importData.currentLocation = data.attributes.currentLocation?.data?.id;
			importData.originLocation = data.attributes.originLocation?.data?.id;

			if (data.attributes.specialties.data?.length > 0)
				importData.specialties = [
					...data.attributes.specialties.data.map((r) => ({ id: Number.parseInt(r.id) }))
				];
			else importData.specialties = [];
      
			await updateEntity('dimm-city/characters', {
				id: data.id,
				...importData
			})
				.then(() => {
					console.log('character saved', data);
				})
				.catch((reason) => {
					console.error('Error updating citizen file', reason);
				});

			// await updateEntity('dimm-city/characters', {
			// 	id: data.id,
			// 	attributes: {
			// 		originLocation:  data.attributes.originLocation.data?.id,
			//     currentLocation: data.attributes.currentLocation.data?.id
			// 	}
			// });

			isSaving = false;
			isEditing = false;
		}
	}

	function cancelChanges() {
		data = JSON.parse(originalCharacter);
		isEditing = false;
	}
</script>

<Shell title={data?.attributes.name} titleUrl="/console/citizens" fullscreen={true}>
	{#if data?.id}
		<Sheet character={data} {isEditing} />
	{:else}
		<ContentPane padding={3}>
			<div>
				<h1>404</h1>
				<h3>Unable to locate citizen file.</h3>
			</div>
		</ContentPane>
	{/if}
	<svelte:fragment slot="action-menu">
		{#if isEditing}
			<button
				title="save changes"
				on:click={saveChanges}
				class="aug-button animate__fadeInDownBig"
				data-augmented-ui=""><i class="bi bi-check" /></button
			>
			<button
				title="cancel changes"
				on:click={cancelChanges}
				class="aug-button animate__fadeInDownBig"
				data-augmented-ui=""><i class="bi bi-x" /></button
			>
		{:else}
			{#if isEditable}
				<button
					on:click={startEditing}
					title="edit character"
					class="aug-button animate__fadeInDownBig"
					data-augmented-ui=""><i class="bi bi-pencil" /></button
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
		{/if}
	</svelte:fragment>
</Shell>
