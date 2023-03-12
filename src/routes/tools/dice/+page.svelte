<script lang="ts">
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import D20 from '$lib/Shared/Components/Dice/d20.svelte';
</script>

<Shell title="Dimm City: Dice">
	<ContentPane>
		<div style="overflow: hidden; max-height: 100%"><D20 /></div>
	</ContentPane>
</Shell>
