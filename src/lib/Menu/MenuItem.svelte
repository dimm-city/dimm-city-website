<script lang="ts">
	export let icon = 'bi bi-missing';
	export let title = 'Title';
	export let url = '#';
	export let description = '';
</script>

<a href={url} on:click class="fade-zoom-in">
	<div class="menu-item" data-augmented-ui>
		<slot>
			<p><i class={icon} />{title}</p>
			<small>{description}</small>
		</slot>
	</div>
</a>
