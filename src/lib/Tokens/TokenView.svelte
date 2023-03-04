<script lang="ts">
	import type { IToken } from '$lib/Characters/Models/Character';
	import Button from '$lib/Shared/Components/Button.svelte';
	import Image from '$lib/Shared/Components/Image.svelte';
	import Toolbar from '$lib/Shared/Components/Toolbar.svelte';
	import { ownsToken } from '$lib/Shared/Stores/UserStore';
	import MetadataView from './MetadataView.svelte';

	export let token: any;
</script>

<div class="token-container" class:owned={ownsToken(token)}>
	<Image imageUrl={token?.metadata.thumbnail_uri} title={token.name} />

	<MetadataView data={token} />

	<div class="release-details" />
	<div class="toolbar-row">
		<Toolbar>
			<Button shape="square">
				<a href="/citizens/{token?.contract.slug}-{token?.tokenId}"
					><i class="btn bi bi-person-badge" />
					<div>File</div></a
				>
			</Button>
			<Button shape="square">
				<a
					href="https://opensea.io/assets/{token?.contract?.address}/{token.tokenId}"
					target="_blank"
					rel="noreferrer"
				>
					<i class="btn bi bi-shop" />
					<div>OpenSea</div>
				</a>
			</Button>
		</Toolbar>
	</div>
</div>

<style>
	.token-container {
		display: grid;
		height: 100%;
		width: 100%;
		gap: 1rem;
		margin: auto;
	}
	@media (max-width: 745px) {
		.token-attributes div {
			font-size: 0.8rem;
		}
		.image-wrapper {
			height: fit-content;
			width: fit-content;
		}
		.image-wrapper img {
			max-width: 220px;
		}
	}

	.release-details {
		grid-column: 1 / span 2;
		justify-content: start;
		width: 100%;
	}

	.toolbar-row {
		grid-column: 1 / span 2;
		display: flex;
		align-items: end;
		width: 95%;
		justify-self: center;
	}

	:global(.toolbar-row .aug-button) {
		width: 5rem;
	}
	@media (min-width: 768px) {
		.token-container {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
