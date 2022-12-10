<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import ViewSpore from '$lib/Spores/ViewSpore.svelte';
	import { Spore } from '$lib/Spores/Spore';
	export let slug;
	let spore: Spore = new Spore();

	$: if (slug > '') {
        spore.name =  slug; //"Archive District";
        spore.subtitle = "A Dimm City District";
        spore.villains = ["person 1"];
		// specialty = null;
		// getSpecialty(slug).then((s) => (specialty = s));
	}
</script>

<Shell title="Spores" titleUrl="/spores">
	<ContentPane padding={2} scrollable={true}>
		{#if spore}
			<ViewSpore {spore} />
		{/if}
	</ContentPane>
</Shell>
