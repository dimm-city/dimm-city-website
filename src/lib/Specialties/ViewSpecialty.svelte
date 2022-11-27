<script lang="ts">
	import './specialties.css';
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import Menu from '$lib/Shared/Components/Menu/Menu.svelte';
	import { getSpecialty } from './getSpecialtyBySlug';
	import Article from '$lib/Shared/Components/Article.svelte';
	export let slug;
	let specialty = null;

	$: if (slug > '') {
		specialty = null;
		getSpecialty(slug).then((s) => (specialty = s));
	}
</script>

<Shell title="Specialties">
	<ContentPane padding={2} scrollable={true}>
		{#if specialty}
			<Article model={specialty} imageAug="tl-clip tr-clip-y br-clip bl-clip-y" />
		{/if}
	</ContentPane>
</Shell>
