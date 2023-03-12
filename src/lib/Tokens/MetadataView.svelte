<script lang="ts">
	export let data = { metadata: { attributes: [{ trait_type: '', value: '' }] } };
	function getAttributeValue(attribKey: string) {
		let result = data?.metadata?.attributes?.find((a) => a.trait_type == attribKey);
		return result ? result.value : '';
	}
	let hasWings =
		Array.isArray(data?.metadata.attributes) &&
		data?.metadata.attributes.filter(
			(a) =>
				a.trait_type == 'Behind' &&
				a.value != null &&
				(a.value.indexOf('BIRD') > -1 || a.value.indexOf('WINGS') > -1)
		).length > 0;
</script>

<div>
	<h3>Attributes</h3>
	<div class="token-attributes">
		<div>Token Id</div>
		<div>{data.metadata.edition}</div>
		<div>Release</div>
		<div>{data.metadata.release}</div>

		<div>Artist</div>
		<div>{data.metadata.artist}</div>
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
	<p>
		{data.metadata.description}
	</p>
</div>

<style>
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
</style>
