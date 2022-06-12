<script lang="ts">
	import './specialties.css';
	import Shell from '$lib/Shell.svelte';
	import { showMenu } from '$lib/ShellStore';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import { onMount } from 'svelte';
	import { getSpecialty } from './getSpecialtyBySlug';
	import Article from '$lib/Components/Article.svelte';
	import SpecialtyMenu from './SpecialtyMenu.svelte';
	import { Specialty } from './Specialty';
	export let slug;
	$showMenu = false;
	let specialty = new Specialty();
	onMount(async () => {
		specialty = await getSpecialty(slug);
	});

	$: if (slug > '') {
		getSpecialty(slug).then((s) => (specialty = s));
	}
</script>

<Shell title="Specialties">
	<ContentPane padding={0} scrollable={true}>
		<Article model={specialty} imageAug={null} />
	</ContentPane>
	<Menu slot="menu">
		<SpecialtyMenu bind:selectedItem={slug} />
	</Menu>
</Shell>
