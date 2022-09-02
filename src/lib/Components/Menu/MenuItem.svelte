<script lang="ts">
	export let icon = 'bi bi-missing';
	export let title = 'Title';
	export let url = '#';
	export let description = '';
	export let disabled = false;
	export let classes = '';
</script>

<style>
	.menu-item{

		background-color: rgba(33, 0, 43, 0.55);
	}
	.menu-item i {
		margin-right: 0.5rem;
	}

	/* .menu-item-container {
		min-width: 50ch;
	} */

</style>

<div on:mouseenter on:mouseleave class="menu-item-container">
	{#if disabled}
		<div class="fade-zoom-in" {disabled}>
			<div class="menu-item" data-augmented-ui class:disabled>
				<slot>
					<p><i class={icon} />{title}</p>
					<small>{description}</small>
				</slot>
			</div>
		</div>
	{:else}
		<a href={url} on:click class="fade-zoom-in" {disabled}>
			<div class="menu-item {classes}" data-augmented-ui class:disabled>
				<slot>
					<p><i class={icon} />{title}</p>
					<small>{description}</small>
				</slot>
			</div>
		</a>
	{/if}
</div>
