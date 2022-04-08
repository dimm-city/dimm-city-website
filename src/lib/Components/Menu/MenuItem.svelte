<script lang="ts">
	export let icon = 'bi bi-missing';
	export let title = 'Title';
	export let url = '#';
	export let description = '';
	export let disabled = false;
	export let classes = "";
</script>

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
