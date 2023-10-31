<script>
	import { config } from '$lib/Shared/config';
	import LoggedInContainer from '$lib/Shared/Components/LoggedInContainer.svelte';
	import LandingShell from '$lib/Shared/Shell/LandingShell.svelte';
	import PagedResults from '$lib/Shared/Components/PagedResults.svelte';
	import { marked } from 'marked';
	/**
	 * @type {Strapi.APIResponse<DC.Spore>}
	 */
	export let data;
</script>

<LandingShell title="Spores">
	<article class="fade-in content-container">
		<h1>Dimm City Spores</h1>
		<LoggedInContainer>
			<div class="register-links" slot="public">
				<a class="button" href={config.apiBaseUrl + '/connect/google'}
					><i class="bi bi-google" />Sign in with Google</a
				>
				<a class="button" href={config.apiBaseUrl + '/connect/reddit'}
					><i class="bi bi-reddit" />Sign in with Reddit</a
				>
			</div>
			<div class="spore-container fade-in">
				<h3>&lt;Dimm City 1-Page RPG&gt;</h3>
				{@html marked.parse(data.pageData.attributes.content ?? "")}				
				<PagedResults results={data.spores.data} autoLoad={false} page={data.spores.meta.pagination.page}>
					<svelte:fragment slot="result" let:result>
						<a
							class="spore-item"
							href={`spores/${result.attributes.slug}`}
							
							data-augmented-ui="border"
						>
							<h4>{result.attributes.name}</h4>
							{result.attributes.shortDescription ?? ''}
						</a>
					</svelte:fragment>
				</PagedResults>
			</div>
		</LoggedInContainer>
	</article>
</LandingShell>

<style>
	h1 {
		margin-bottom: 0rem;
	}
	.spore-container h3 {
		font-size: 0.75rem;
		display: block;
		margin-bottom: 1rem;
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
