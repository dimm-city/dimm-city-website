<script>
	import Button from './Button.svelte';

	export let text = '';
	export let hashTags = '';
	export let url = document.location.href;
    export let title = "";
    export let shape = "";
	$: urlTemplate = `https://twitter.com/intent/tweet?text=${text}&url=${url}&related=SporosETH&hashtags=${hashTags}`;
</script>

<Button url={urlTemplate} target="_blank" {title} shape={shape}>
	<slot><i class="fade-in btn bi bi-share" /></slot>
</Button>
