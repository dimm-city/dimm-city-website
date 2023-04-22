<script lang="ts">

	export let value: any = "";
	export let type = 'text';
	function onChange(e) {
		value = e.target.value;
	}
</script>

<style>
	input {
		width: 100%;
		padding: 0.5rem 1rem;
		background-color: rgba(17, 17, 17, 0.75);
		border: 0;
		color: var(--third-accent);
		font-size: 1rem;
		font-family: var(--main-font-family);
	}

	input:read-only, .aug-input[disabled=true]{
		--aug-border-bg: var(--blue-accent);
	}
	.aug-input {
		width: 100%;

		--aug-clip-tl1: initial;
		--aug-clip-tr1: initial;
		--aug-clip-bl1: initial;
		--aug-clip-br1: initial;
		--aug-border: initial;
		--aug-border-all: 1px;
		--aug-tl1: 1vh;
		--aug-tr1: 1vh;
		--aug-br1: 1vh;
		--aug-bl1: 1vh;
		--aug-border-bg: var(--fourth-accent);

		--aug-inlay: initial;
		--aug-inlay-bg: var(--menu-inlay-bg-color);
	}
</style>

<div data-augmented-ui class="aug-input" disabled={$$props.disabled}><input readonly={$$props.disabled} {type} on:change={onChange}  {...$$props}/></div>
