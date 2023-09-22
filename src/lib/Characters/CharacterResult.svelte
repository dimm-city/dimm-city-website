<script>		
	 /**
	 * @type {{ name: any; race: { data: { attributes: { name: any; }; }; }; specialties: { data: any[]; }; }}
	 */
	  export let item;
</script>
<div>
	<div class="menu-item-header" style="">
		<div class="title-container">
			<i class="bi bi-person text-light" />{item.name}
		</div>
		<div class="subtitle">
			{#if item.race?.data?.attributes}
				<div>{item.race.data.attributes.name}</div>
			{:else}
				<div>Unknown race</div>
			{/if}
		</div>
	</div>
	<div class="description">
		{#if item.specialties?.data?.length > 0}
			<div>
				{item.specialties.data.map((r) => r.attributes.name).join(', ')}
			</div>
		{:else}
			<div>Unknown specialties</div>
		{/if}
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
