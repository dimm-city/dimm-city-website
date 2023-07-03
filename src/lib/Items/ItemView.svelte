<script>
    /**
	 * @type {{ name: any; type: any; shortDescription: any; imageUrl: any; modelUrl: any; videoUrl: any; description: any; }}
	 */
     export let item;
</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }

    @media (max-width: 600px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }
</style>

<div class="grid">
    <div>
        <h2>{item.name}</h2>
        <p><strong>Type:</strong> {item.type}</p>
        <p><strong>Short Description:</strong> {item.shortDescription}</p>
        <p><strong>Image URL:</strong> {item.imageUrl}</p>
        <p><strong>Model URL:</strong> {item.modelUrl}</p>
        <p><strong>Video URL:</strong> {item.videoUrl}</p>
    </div>
    <div>
        <h3>Description</h3>
        <p>{item.description}</p>
    </div>
</div>
