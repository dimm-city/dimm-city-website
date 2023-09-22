<script>
	import Image from '$lib/Shared/Components/Image.svelte';

	/** @type {DC.HistoricalEvent} */
	export let item;
</script>

<article class="grid">
	<section>
		<h1>{item.attributes.name}</h1>
		<Image
			imageUrl={item.attributes.mainImage?.data?.attributes?.formats?.large?.url}
			videoUrl={item.attributes.mainVideo?.data?.attributes?.url}
			title={item.attributes.name}
		/>
	</section>
	<section class="item-details-column">
        <div>
		<h3 class="inline">District:</h3>
		<span>{item.attributes?.location?.data?.attributes?.name}</span></div>
		<h3>Description</h3>
		<p>{item.attributes.description}</p>
	</section>
</article>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	h1 {
		margin-top: 0;
	}
    h3.inline{
        display: inline;
    }
    p{
        margin: 0;
    }
    .item-details-column{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
	@media (max-width: 600px) {
		.grid {
            justify-self: center;
            padding: 1rem;
			grid-template-columns: 1fr;
            grid-template-rows: min-content auto;
		}
	}
</style>
