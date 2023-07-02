<script>
	import './specialties.css';
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import { getSpecialty } from './getSpecialtyBySlug';
	import Article from '$lib/Shared/Components/Article.svelte';

	/**
	 * @type {string}
	 */
	 export let slug;
	/**
	 * @type {import("./Specialty").Specialty | null}
	 */
	let specialty = null;

	$: if (slug > '') {
		specialty = null;
		getSpecialty(slug).then((s) => (specialty = s));
	}
</script>

<Shell title="Specialties" titleUrl="/specialties">
	<ContentPane padding={2} scrollable={true}>
		{#if specialty}
			<Article model={specialty} imageAug="tl-clip tr-clip-y br-clip bl-clip-y" />
		{/if}
	</ContentPane>
</Shell>
