<script>
	export let url;
	export let text;
</script>

<style>
	a {
		display: block;
		cursor: pointer;

		color: var(--light);
	}
	a:hover,
	a:focus {
		color: var(--pink);
	}
</style>

<a href={url}> {text}</a>
