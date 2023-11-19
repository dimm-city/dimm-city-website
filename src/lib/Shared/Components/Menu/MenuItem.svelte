<script>
	export let icon = 'bi bi-missing';
	export let title = '';
	export let url = '#';
	export let description = '';
	export let disabled = false;
	export let classes = '';
	export let target = '_self';
	export let selected = false;
</script>

<div
	on:mouseenter
	on:mouseleave
	class="menu-item-container"
	class:selected
	role="button"
	tabindex="0"
>
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

<style>
	:root {
		--dc-menu-item-selected-color: rgb(255, 20, 204, 0.35);
		--dc-menu-item-selected-drop-shadow: 0 0 20px 5px rgb(255, 20, 204, 0.95);
	}
	.menu-item-container {
		position: relative;
	}
	.menu-item-container::before {
		content: ' ';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
	}
	.menu-item-container.selected::before {
		background-color: var(--dc-menu-item-selected-color);

		background-clip: border-box;

		box-shadow: var(--dc-menu-item-selected-drop-shadow);
		transition: all 0.1s ease-in-out;
	}
</style>
