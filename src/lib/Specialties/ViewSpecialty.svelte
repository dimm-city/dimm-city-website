<script lang="ts">
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
</script>

<Shell title="Specialties">
	<ContentPane padding={0} scrollable={true}>
		<Article model={specialty} />
	</ContentPane>
	<Menu slot="menu">
		<SpecialtyMenu />
	</Menu>
</Shell>
