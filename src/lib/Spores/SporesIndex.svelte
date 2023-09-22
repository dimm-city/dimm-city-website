<script>
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import PagedResults from '$lib/Shared/Components/PagedResults.svelte';
	import DefaultItemResult from '$lib/Shared/Components/DefaultItemResult.svelte';
	import MenuItem from '$lib/Shared/Components/Menu/MenuItem.svelte';
	/**
	 * @type {Strapi.APIResponse<DC.Spore>}
	 */
	export let data;
</script>

<LandingShell title="Spores">
	<article class="centered-container">
		<div class="spore-container form-container">
			<h1 class="">Dimm City Spores</h1>
			<h3>&lt;Dimm City 1-Page RPG&gt;</h3>

			<div class="fade-in">
				<p>
					A Dimm City Spore is a rules light (Lasers & Feelings homebrew) introduction to the Dimm
					City Campaign Setting for use with the Dimm City RPG.
				</p>
				<p>
					In a Dimm City Spore, Dreamers (players) take on the role of a sporos hero doing good
					deeds in a bad place using magic, technology, combat, and their own wits to succeed. Dream
					Masters (the judge and storyteller) provide environmental descriptions, atmosphere,
					challenges, and opponents along with the plot to drive the Dream (shared story) forward.
					The Dream Master is not an enemy of the Dreamers, but a guide into Dimm City and all the
					action, adventure, and secrets it holds. Dreamers and the DM work together to create a
					story that is both exciting and unforgettable.
				</p>
				<p>
					To download a copy of a spore, click one of the menu items below. Use the <a
						href="/dashboard">console</a
					> to learn more about Dimm City and it's citizens.
				</p>

				<p>
					We hope you enjoy your journey,
					<br />-the founders
				</p>
			</div>
			<PagedResults results={data.data} autoLoad={false} page={data.meta.pagination.page}>
				<svelte:fragment slot="result" let:result>
					<a
						class="spore-item"
						href={`spores/${result.attributes.slug}`}
						target="_blank"
						data-augmented-ui="border"
					>
						<h4>{result.attributes.name}</h4>
						{result.attributes.shortDescription ?? ''}
					</a>
				</svelte:fragment>
			</PagedResults>
		</div>
	</article>
</LandingShell>

<style>
	.spore-container h1 {
		margin-bottom: 0rem;
	}
	.spore-container h3 {
		font-size: 0.75rem;
		display: block;
		margin-bottom: 1rem;
	}
	.spore-container {
		height: min-content;
		width: 100%;
		overflow-y: auto;
	}

	.spore-item {
		text-decoration: none;
		display: block;
		padding: 0.5em;
		color: var(--primary-color) white;
		transition: all 300ms ease-in-out;
		height: 7em;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;

		--aug-clip-tl1: initial;
		--aug-clip-tr1: initial;
		--aug-clip-bl1: initial;
		--aug-clip-br1: initial;
		--aug-border: initial;
		--aug-border-all: 1px;
		--aug-tl1: 1vh;
		--aug-tr1: 2vh;
		--aug-br1: 1vh;
		--aug-bl1: 1vh;
		--aug-border-bg: var(--primary-color);
		--aug-inlay: initial;
		--aug-inlay-bg: var(--menu-inlay-bg-color);
	}

	.spore-item:hover,
	.spore-item:active {
		border-color: var(--highlight-color);
	}
	.spore-item:hover h4,
	.spore-item:active h4 {
		color: var(--highlight-color);
	}
</style>
