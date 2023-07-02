<script>
	/**
	 * @type {{ name: any; type: any; shortDescription: any; description: string; }}
	 */
	export let item;
	export let icon = 'bi-box';
	export let subtitle = "";
</script>

<div>
	<div>
		<div class="menu-item-header" style="">
			<div class="title-container">
				<i class="bi {icon} text-light" />{item.name}
			</div>
			<div class="subtitle">
				{subtitle}
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
