<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import { onMount } from 'svelte';
	import TokenViewModal from '$lib/Tokens/TokenViewModal.svelte';
	import { openModal } from 'svelte-modals';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import { getSporos } from '$lib/Characters/Services/SporosService';
	import type { IToken } from '$lib/Characters/Models/Character';
	import ProfileView from '$lib/Profile/ProfileView.svelte';

	let loadingTask: Promise<IToken[]>;
	let selectedSporo = {} as IToken;
	let loaded = false;
	// $: tokenId = `${selectedSporo.release}-${selectedSporo.edition}`;

	// onMount(() => {
	// 	if (window.ethereum && $loggedIn && !$connected) {
	// 		connect();
	// 	}
	// });

	// $: if ($connected && loaded == false && $myCharacterTokens.length < 1) {
	// 	loaded = true;
	// 	loadingTask = getSporos().then((data) => ($myCharacterTokens = data ?? []));
	// }

	function showToken(token: any) {
		openModal(TokenViewModal, { data: token });
	}
</script>

<Shell title="Console">
	<ContentPane padding={0}>
		<div class="content-container">
			<LoggedInContainer>
				<div class="fade-in">
					<ProfileView />
				</div>
			</LoggedInContainer>
		</div>
	</ContentPane>
</Shell>

<style>
	.content-container {
		padding: 1rem;
	}
	h2 {
		text-align: center;
	}

	ul {
		padding: 0;
	}
	:global(.console-menu-item) {
		display: flex;
		justify-content: space-between;
	}

	small {
		white-space: nowrap;
		font-size: clamp(0.3rem, 0.7rem, 1.25rem);
	}

	.menu-item-grid {
		width: 100%;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-template-rows: min-content auto;
		grid-template-areas:
			'name-column id-column'
			'image-column toolbar-column';
	}
	.name-column {
		grid-area: name-column;
	}
	.id-column {
		grid-area: id-column;
		display: flex;
		justify-content: end;
	}
	.image-column {
		grid-area: image-column;
		display: flex;
		justify-content: start;
	}
	.toolbar-column {
		grid-area: toolbar-column;
		display: flex;
		height: 100%;
		justify-content: end;
		align-items: end;
	}
</style>
