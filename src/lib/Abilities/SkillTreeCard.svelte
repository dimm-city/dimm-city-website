<script>
	import { marked } from 'marked';
	import './skill-trees.css';
	import { onMount, onDestroy } from 'svelte';

	onMount(() => {});

	/** @type DC.Ability */
	export let data;
	export let available = false;
	// export let unlocked = false;
	// export let selected = false;
	// export let available = false;

	// $: if (data.selected) {
	//     console.log('selected');
	// 	data.attributes.children.data.forEach((child) => {
	// 		child.unlocked = true;
	// 	});
	// 	data.attributes.children.data = [...data.attributes.children.data];
	// }
	// class:unlocked={data.unlocked}}
	// class:available={data.available}
</script>
<div class="skin-cell-container  {data.attributes.slug}" 
	class:selected={data.selected}>
    
<button
	on:click
	class="skill-cell"
	class:selected={data.selected}
	class:available
	data-skill-index={data.id}
	data-augmented-ui="tl-clip tr-clip-x br-clip bl-clip both"
>
	<div class="aug-border" />
	<div class="skill-cell-inner {data.id ? 'unlocked' : 'locked'}">
		<!-- <div class="top-toolbar">
			<i class="bi bi-braces" /></div> -->
		<div class="header">
			<h1 class="skill-button">{data.attributes.name}</h1>
		</div>
		<div class="skill-description">
			{@html marked.parse(data?.attributes.shortDescription ?? '')}
		</div>
		<div class="bottom-toolbar">
			<div class="left-group">AP: {data.attributes.ap}</div>
			<div class="right-group" />
		</div>
	</div>
</button>

</div>
<style>
	:root {
		--skill-cell-bg-color: var(--dark);
		--skill-cell-border-color: var(--light);
	}

    .skin-cell-container {

		position: relative;
		width: 200px;
		height: 175px;
        
    }

    .skin-cell-container:before {

		position: absolute;
        content: ' ';
        top: 0;
        left: 0;
		width: 200px;
		height: 175px;
        
        box-shadow:  3px -1px 20px 2px var(--skill-cell-border-color);
         filter: blur(15px);
		transition: box-shadow 0.3s ease-in-out;
    }

    .skin-cell-container.selected:before {
		box-shadow: 1px -1px 75px 33px var(--skill-cell-border-color);  
    }
	.aug-border {
        content: ' ';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-sizing: border-box;

		/* add glowing effect around cells */
		box-shadow: inset 3px -1px 20px 7px var(--skill-cell-border-color);   
		transition: box-shadow 0.3s ease-in-out;

		z-index: -1;
		pointer-events: none;
		transition: all 0.3s ease-in-out;
		--aug-border-bg: var(--skill-cell-border-color);
		--aug-border-all: 1px;
	}
	.skill-cell {
		width: 200px;
		height: 175px;
		border: 1px solid var(--skill-cell-border-color);
		background-color: var(--skill-cell-bg-color);
		--aug-border-bg: var(--skill-cell-border-color);
		transition: all 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
		padding-bottom: 0.5rem;
		--aug-border-all: 1px;
		--aug-tr1: 7px;
		text-align: center;
		cursor: pointer;
		margin: 0;
		padding: 0;

        box-sizing: border-box;

		/* add glowing effect around cells */
		box-shadow:  3px -1px 20px 7px var(--skill-cell-border-color);   
		transition: box-shadow 0.3s ease-in-out;
	}

	.skill-cell.selected {
		--aug-border-all: 2px;
		--aug-tr1: 0px;
		--skill-cell-bg-color: var(--fourth-accent);
		--skill-cell-border-color: var(--secondary-accent);
		color: var(--dark);
		box-shadow: inset 3px -1px 20px 7px var(--skill-cell-border-color);
	}
	.skill-cell .header {
		display: flex;
		width: 100%;
		padding: 0.5rem 1rem;
		background-color: rgba(17, 17, 17, 0.75);
		border: 0;
		color: var(--third-accent);
		font-family: var(--main-font-family);
		border: 1px var(--third-accent) solid;
		justify-content: space-evenly;
		align-content: start;
	}
	.skill-cell-inner {
		display: grid;
		grid-template-rows: min-content 1fr min-content;
		height: 100%;
		padding-bottom: 5px;
	}
	.skill-cell h1 {
		margin: 0;
		font-size: 1rem;
		text-wrap: balance;
	}
	:global(.skill-description p) {
		padding-inline: 0.5rem;
		margin: 0;
	}
	.skill-cell.available {
		--skill-cell-bg-color: var(--secondary-accent);
		--skill-cell-border-color: var(--fourth-accent);
		color: var(--dark);

		box-sizing: border-box;

		/*add glowing effect around unlocked cells*/
		box-shadow: inset 3px -1px 20px 7px var(--skill-cell-border-color);

		transition: box-shadow 0.3s ease-in-out;
	}
	.skill-cell.unlocked {
		--skill-cell-bg-color: var(--secondary-accent);
		--skill-cell-border-color: var(--fourth-accent);
		color: var(--dark);

		box-sizing: border-box;

		/*add glowing effect around unlocked cells*/
		box-shadow:  3px -1px 20px 7px var(--skill-cell-border-color);

		transition: box-shadow 0.3s ease-in-out;
	}
    .bottom-toolbar {
		display: flex;
		justify-content: space-between;
		padding-bottom: .5rem;
        padding-inline: 1rem;
	}

	.left-group,
	.right-group {
		display: flex;
		gap: .25rem;
	}

</style>
