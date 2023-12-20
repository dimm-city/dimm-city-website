<script>
	import markdownit from 'markdown-it';

	const md = new markdownit();
	/**
	 * @type {string | null | undefined}
	 */
	 export let text;
</script>
<div>
	{@html md.render(text ?? '')}
</div>
