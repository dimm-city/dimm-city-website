<script>
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';
	import 'bigger-picture/css';
	import BiggerPicture from 'bigger-picture/svelte';
	import { onMount } from 'svelte';
	
    /** @type {{items: BiggerPicture.Item[]}}*/
    export let data;

	onMount(() => {
		let bp = BiggerPicture({
			target: document.body
		});

		let imageLinks = document.querySelectorAll('.thumbnail-wrapper > .thumbnail');

		for (let link of imageLinks) {
			link.addEventListener('click', openGallery);
		}

		function openGallery(e) {
			e.preventDefault();
			bp.open({
				items: imageLinks,
				el: e.currentTarget
			});
		}

		return () => {		
			for (let link of imageLinks) {
				link.removeEventListener('click', openGallery);
			}
		};
	});
</script>

<LandingShell>
	<article class="content-container">

		<div id="gallery-wrapper" />
		<h1>Dimm City Gallery</h1>
		<div class="thumbnail-wrapper">
			{#each data.items as item}
             
				<div
					class="thumbnail"
                    data-title={item.title}
					data-width={item.width}
					data-height={item.height}
					data-img={item.img}
					data-thumb={item.thumb}
					data-alt={item.title}
					data-caption={item.caption}
					data-sources={JSON.stringify(item.sources)}
				>
					<img src={item.thumb} alt={item.caption} />
				</div>
			{/each}
		</div>
	</article>
</LandingShell>

<style>
	:global(.bg-img) {
		max-height: 80dvh;
	}
    :global(.bp-vid > video){
        background-color: black !important;
    }
	.thumbnail-wrapper {
		padding: 1rem;
		display: grid;
		width: 100%;
		grid-template-columns: repeat(6, 1fr);

		row-gap: 1rem;
		column-gap: 0.5rem;
	}
	.thumbnail {
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
	}
	.thumbnail img {
		cursor: pointer;
		width: 100%;
	}
	@media screen and (max-width: 768px) {
		.thumbnail-wrapper {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
