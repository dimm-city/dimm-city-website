<script>
	import Image from '$lib/Shared/Components/Image.svelte';

	/**
	 * @type {{ name: any; type: any; shortDescription: any; imageUrl: any; modelUrl: any; videoUrl: any; description: any; }}
	 */
	export let item;
</script>

<article class="grid">
	<section>
		<h1>{item.name}</h1>
		<Image
			imageUrl={item.imageUrl}
			modelUrl={item.modelUrl}
			videoUrl={item.videoUrl}
			title={item.name}
		/>
	</section>
	<section class="item-details-column">
        <div>
		<h3 class="inline">Type:</h3>
		<span>{item.type}</span></div>
		<h3>Description</h3>
		<p>{item.description}</p>
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
