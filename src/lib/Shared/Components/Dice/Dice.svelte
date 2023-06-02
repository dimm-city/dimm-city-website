<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import DiceBox from '@3d-dice/dice-box-threejs';

	const defaultConfig = {
		assetPath: '/dice',
		framerate: 1 / 60,
		sounds: false,
		volume: 100,
		color_spotlight: 0xefdfd5,
		shadows: true,
		theme_surface: 'default', //cyberpunk
		sound_dieMaterial: 'plastic',
		theme_customColorset: null,
		theme_colorset: '', // white  see available colorsets in https://github.com/3d-dice/dice-box-threejs/blob/main/src/const/colorsets.js
		theme_texture: '', // see available textures in https://github.com/3d-dice/dice-box-threejs/blob/main/src/const/texturelist.js
		theme_material: 'glass', // "none" | "metal" | "wood" | "glass" | "plastic"
		gravity_multiplier: 400,
		light_intensity: 0.7,
		baseScale: 100,
		strength: 1, // toss strength of dice
		onRollComplete: () => {}
	};

	async function setupDiceBox() {
		let config = {
			assetPath: '/dice/',
			sounds: true,
			volume: 100,
			
			//theme_colorset:  gameConfig.options?.dice?.key ?? 'pinkdreams',
			//theme_customColorset: gameConfig.options?.dice,
			baseScale: 140,
			strength: 1,
			onRollComplete: (result) => {
				dispatcher('rollCompleted', result);
			}
		};

		if (dice?.key) {
			config.theme_colorset = dice?.key ?? 'pinkdreams';
		} else {
			config.theme_customColorset = dice;
		}

		diceBox = new DiceBox('#dice-roller-container', config);
		await diceBox.initialize();
	}

	const dispatcher = createEventDispatcher();

	export let rolling = false;
	export let header = '';
	export let diceNotation = '1d20';
	export let dice = {};


	let diceBox;
	onMount(async () => {
	
		await setupDiceBox();
	});
	export async function roll() {
		if (rolling) return;
		rolling = true;
		
		let result = await diceBox.roll(diceNotation);

		console.log('return', result);
		rolling = false;
		return result.total;
	}
</script>

<div
	id="dice-roller-container"
	class="dc-dice-roller-container"
	disabled={rolling}
	on:click={roll}
	on:keyup={roll}
>
	<!-- <canvas bind:this={canvas} id="dc-dice-canvas" /> -->
	<div class="dc-dice-roller-header dc-header">
		<slot>
			<div class="dc-header">
				<h4>{header}</h4>
			</div>
		</slot>
	</div>
	{#if !rolling && header}
		<button class="dc-fade-in" on:click={roll} on:keyup={roll}>{header}</button>
	{/if}
</div>

<style>
	.dc-dice-roller-container {
		cursor: pointer;
		display: grid;
		height: 100%;
		width: 100%;
		justify-content: center;
	}

	.dc-dice-roller-container button {
		position: absolute;
		display: grid;
		justify-self: center;
		align-self: center;
	}
</style>
