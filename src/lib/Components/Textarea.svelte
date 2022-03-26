<script lang="ts">
	export let value: any = '';
</script>

<style>
	textarea {
		width: 100%;
		height: 100%;
		padding: 0.5rem;
		background-color: rgba(17, 17, 17, 0.75);
		border: 0;
		color: var(--third-accent);
		font-size: 1rem;
		font-family: var(--main-font-family);
	}
	.aug-textarea {		
		width: 100%;
		height: 100%;
		
		--aug-clip-tl1: initial;
		--aug-clip-tr1: initial;
		--aug-clip-bl1: initial;
		--aug-clip-br1: initial;
		--aug-border: initial;
		--aug-border-all: 0.25vh;
		--aug-tl1: 1vh;
		--aug-tr1: 1vh;
		--aug-br1: 1vh;
		--aug-bl1: 1vh;
		--aug-border-bg: var(--blue-accent);
		--aug-inlay: initial;
		--aug-inlay-bg: var(--menu-inlay-bg-color);
	}
</style>

<div data-augmented-ui class="aug-textarea"><textarea bind:value {...$$props} /></div>
