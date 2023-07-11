<script lang="ts">
	export let border = '';
	export let shape = 'default';
	export let title = '';
	export let url = '';
	export let height = 'max-content';
	export let target: string = "";
</script>


<a
	href={url}
	data-augmented-ui
	class="aug-button {shape}"
	style="--aug-border-bg: {border}; height: {height};"
	on:click
	{target}
	{title}><slot /></a
>
