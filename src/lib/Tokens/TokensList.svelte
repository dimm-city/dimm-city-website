<script lang="ts">
	import TokenViewModal from '$lib/Tokens/TokenViewModal.svelte';
	import { openModal } from 'svelte-modals';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';

	export let tokens = [];

	function showToken(token: any) {
		//openModal(TokenViewModal, { token: token });
		document.location = `/citizens/${token.contract.slug}-${token.tokenId}`;
	}
</script>

<style>


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
