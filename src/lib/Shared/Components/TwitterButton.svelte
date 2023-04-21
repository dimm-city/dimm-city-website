<script>
	import { onMount } from 'svelte';

	export let text = '';
	export let hashTags = '';
	export let url = '';
	export let title = '';
	export let shape = '';
	$: urlTemplate = `https://twitter.com/intent/tweet?text=${text}&url=${url}&related=SporosETH&hashtags=${hashTags}`;
	onMount(() => {
		if (url == '') url = document.location.href;
	});
</script>

<a href={urlTemplate} target="_blank" {title} class={'aug-button ' + shape} data-augmented-ui>
	<slot><i class="fade-in bi bi-share" /></slot>
</a>
