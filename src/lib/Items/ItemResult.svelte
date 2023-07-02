<script>
	/**
	 * @type {{ name: any; type: any; shortDescription: any; description: string; }}
	 */
	export let item;
</script>

<div>
	<div>
		<div class="menu-item-header" style="">
			<div class="title-container">
				<i class="bi bi-tools text-light" />{item.name}
			</div>
			<div class="subtitle">
				{item.type}
            </div>
		</div>
	</div>
	<div class="description">
		{item.shortDescription ?? item.description ?? ""}
	</div>
	<div class="toolbar">
		<!-- <a
target="_blank"
on:click|stopPropagation={() => true}
href="/console/characters/print/{character.attributes.tokenId}"
>
<i class="bi bi-printer" />
</a> -->
	</div>
</div>
