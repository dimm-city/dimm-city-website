<script context="module">
	export const prerender = false;
</script>

<script>
	import { page } from '$app/stores';
	import ViewSpecialty from '$lib/Specialties/ViewSpecialty.svelte';
</script>

<ViewSpecialty slug={$page.params.slug} />
