<style>
	.token-container {
		display: grid;
		gap: 1rem;
		width: fit-content;
		margin: auto;
		justify-items: center;
	}
	img {
		opacity: 0;
		transition: all;
	}
	.image-wrapper {
		/* max-width: min-content; */
		height: 400px;
		width: 300px;
		background-image: url('/assets/missing-image.png');
		background-size: contain;
		background-position: center;
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
	.token-attributes {
		margin: 0 0.5rem;
		display: grid;
		grid-template-columns: 0.5fr 1fr;
		gap: 0.5rem;
	}
	.token-attributes div {
		width: min-content;
		white-space: nowrap;
	}
	.token-attributes div:nth-child(odd) {
		font-weight: bold;
	}

	.release-details {
		margin-top: 2rem;
		grid-column: 1 / span 2;
		display: grid;
		/* grid-template-columns: repeat(4, 1fr);
		grid-template-rows: 1fr; */
		gap: 0.5rem;
	}

	@media (min-width: 768px) {
		.token-container {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>

<div class="token-container">
	<div
		class="m-3 p-4 d-flex image-wrapper text-primary"
		data-augmented-ui="tl-clip t-clip-x tr-clip-y br-clip b-rect bl-clip l-scoop border"
	>
		<!-- {#if $selectedCharacter.animation_url > ""} -->
		<!-- svelte-ignore a11y-media-has-caption -->
		<!-- <video autoplay on:loadeddata={onVideoLoaded} class="fade-in">
                    <source src={$selectedCharacter.animation_url} type="video/mp4" />

                    Your browser does not support the video tag.
                </video> -->
		<!-- <p class:d-none={isVideoLoaded}>loading...</p>
                {:else} -->

		<img src={data.thumbnail_uri} class="fade-in" alt={data.name} />
		<!-- {/if} -->
	</div>
	<div>
		<h3>Attributes</h3>
		<div class="token-attributes">
			<div>Token Id</div>
			<div>{data.edition}</div>
			<div>Release</div>
			<div>{data.release}</div>

			<div>Artist</div>
			<div>{data.artist}</div>
			<div>Eyes</div>
			<div>{getAttributeValue('Eyes')}</div>
			<div>Mouth</div>
			<div>{getAttributeValue('Mouth')}</div>
			<div>Body</div>
			<div>{getAttributeValue('Body')}</div>
			{#if hasWings}
				<div>Wings</div>
				<div>{getAttributeValue('Behind')}</div>
			{/if}
			<div>Clothing</div>
			<div>{getAttributeValue('Clothing')}</div>
			<div>Equipment</div>
			<div>{getAttributeValue('Equipment')}</div>
			<div>Mask / Hat</div>
			<div>{getAttributeValue('Mask / Hat')}</div>
			<div>Item 1</div>
			<div>{getAttributeValue('Above Head')}</div>
			{#if !hasWings}
				<div>Item 2</div>
				<div>{getAttributeValue('Behind')}</div>
			{/if}
			<div>Background</div>
			<div>{getAttributeValue('Background')}</div>
		</div>
	</div>
</div>
<div class="release-details">
	<p>
		{data.description}
	</p>
	<a href="https://opensea.io/assets/0xef48df1d388aa7222da0b83d8b7cb265ef8d0b4a/{data.edition}" target="_blank"
		>View on OpenSea</a
	>
	{#if data.hasCharacter}
		<a href="/citizens/{data.release}-{data.edition}">View Citizen Profile</a>
	{:else}
		<a href="/citizens/import/{data.release}-{data.edition}">Create Citizen Profile</a>
	{/if}
</div>

<script lang="ts">
	export let data;
	function getAttributeValue(attribKey) {
		let result = data.attributes.find((a) => a.trait_type == attribKey);
		return result ? result.value : '';
	}
	let hasWings =
		Array.isArray(data.attributes) &&
		data.attributes.filter(
			(a) => a.trait_type == 'Behind' && (a.value.indexOf('BIRD') > -1 || a.value.indexOf('WINGS') > -1)
		).length > 0;
</script>
