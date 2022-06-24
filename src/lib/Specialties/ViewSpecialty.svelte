<script lang="ts">
	import './specialties.css';
	import Shell from '$lib/Components/Shell.svelte';
	import { showMenu } from '$lib/Shared/ShellStore';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import { onMount } from 'svelte';
	import { getSpecialty } from './getSpecialtyBySlug';
	import Article from '$lib/Components/Article.svelte';
	import SpecialtyMenu from './SpecialtyMenu.svelte';
	import { Specialty } from './Specialty';
	export let slug;
	$showMenu = false;
	let specialty = null;

	$: if (slug > '') {
		specialty = null;
		getSpecialty(slug).then((s) => (specialty = s));
	}
</script>

<Shell title="Specialties">
	<ContentPane padding={0} scrollable={true}>
		{#if specialty}
			<Article model={specialty} imageAug="tl-clip tr-clip-y br-clip bl-clip-y" />
		{/if}
	</ContentPane>
	<Menu slot="menu">
		<SpecialtyMenu bind:selectedItem={slug} />
	</Menu>
</Shell>
