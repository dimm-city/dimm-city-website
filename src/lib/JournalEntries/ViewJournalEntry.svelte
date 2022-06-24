<script lang="ts">
	import './journal-entries.css';
	import Shell from '$lib/Components/Shell.svelte';
	import { showMenu } from '$lib/Shared/ShellStore';
	import ContentPane from '$lib/Components/ContentPane.svelte';
	import Menu from '$lib/Components/Menu/Menu.svelte';
	import { getJournalEntry } from './getJournalEntryBySlug';
	import Article from '$lib/Components/Article.svelte';
	import Image from '$lib/Components/Image.svelte';
	import JournalEntriesMenu from './JournalEntriesMenu.svelte';
	export let slug;
	$showMenu = false;
	let model = null;

	$: if (slug > '') {
		model = null;
		getJournalEntry(slug).then((s) => (model = s));
	}
</script>

<Shell title="Journals">
	<ContentPane padding={0} scrollable={true}>
		{#if model}
			<Article {model}>
				<div slot="main-image">
					{#if model.imageUrl > ''}
						<Image
							height=""
							width=""
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
	<Menu slot="menu">
		<JournalEntriesMenu bind:selectedItem={slug} />
	</Menu>
</Shell>
