<script lang="ts">
	import TokenViewModal from '$lib/Tokens/TokenViewModal.svelte';
	import { openModal } from 'svelte-modals';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';

	export let tokens = [];

	function showToken(token: any) {
		openModal(TokenViewModal, { token: token });
	}
</script>

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

    li{
        display: flex;
        justify-content: space-between;
    }
	small {
		white-space: nowrap;
		font-size: 1rem; 
		 /* clamp(0.3rem, 0.7rem, 1.25rem);		 */
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

<LoggedInContainer>
	<div class="fade-in">
			<ul>
				{#each tokens as sporo}
					<li
						data-augmented-ui
						class="small-menu-item"
						on:click={() => showToken(sporo)}
						on:keyup={() => console.log('check for enter key and open token')}
					>
						<span>{sporo.metadata?.name ?? sporo.contract.slug + "-" + sporo.tokenId}</span> <small> <i class="bi bi-file-person"></i></small>
					</li>
				{/each}
			</ul>
	</div>
</LoggedInContainer>
