<script lang="ts">
	import './journal-entries.css';
	import Shell from '$lib/Shared/Components/Shell.svelte';
	import ContentPane from '$lib/Shared/Components/ContentPane.svelte';
	import { getJournalEntry } from './getJournalEntryBySlug';
	import Article from '$lib/Shared/Components/Article.svelte';
	import Image from '$lib/Shared/Components/Image.svelte';
	import type { JournalEntry } from './JournalEntry';
	import { formatDate } from '$lib/Shared/FormatFunctions';
	export let slug;
	let model: JournalEntry = null;

	$: if (slug > '') {
		model = null;
		getJournalEntry(slug).then((s) => (model = s));
	}
</script>
<style>
	h1{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>

<Shell title="Journal Entries" titleUrl="/journal-entries">
	<ContentPane padding={2} scrollable={true}>
		{#if model}
			<Article {model}>
				<div slot="header">
					<h1>{model.name}</h1>
					<small>recorded &thickapprox; {formatDate(model.recordedAt)}</small>
				</div>
				<div slot="main-image">
					{#if model.imageUrl > ''}
						<Image
							imageUrl={model.imageUrl}
							title={model.name}
							videoUrl={model.videoUrl}
							aug="tl-clip tr-clip-y br-clip bl-clip-y"
						/>
					{/if}
				</div>
			</Article>
		{/if}
	</ContentPane>
</Shell>
