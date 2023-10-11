<script>
	export let icon = 'bi bi-missing';
	export let title = '';
	export let url = '#';
	export let description = '';
	export let disabled = false;
	export let classes = '';
	export let target = '_self';
</script>

<div on:mouseenter on:mouseleave class="menu-item-container" role="button" tabindex="0">
	{#if disabled}
		<div class="fade-zoom-in" {disabled}>
			<div class="menu-item" data-augmented-ui class:disabled>
				<slot>
					<h6><i class={icon} />{title}</h6>
					<small>{description}</small>
				</slot>
			</div>
		</div>
	{:else}
		<a href={url} on:click class="fade-zoom-in" {disabled} {target}>
			<div class="menu-item {classes}" data-augmented-ui class:disabled>
				<slot>
					<h6><i class={icon} />{title}</h6>
					<small>{description}</small>
				</slot>
			</div>
		</a>
	{/if}
</div>
