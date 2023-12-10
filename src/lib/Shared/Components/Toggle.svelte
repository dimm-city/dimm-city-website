<!-- ToggleSwitch.svelte -->
<script>
	export let checked = false;
	export let label = '';
	export let enabled = true;

	function handleToggle() {
		if (enabled) checked = !checked;
	}
</script>

<label class="toggle-switch">
	<input
		disabled={!enabled}
		type="checkbox"
		bind:checked
		on:click={handleToggle}
		on:keypress={handleToggle}
	/>
	<span class="slider" />
	<span class="label">{label}</span>
</label>

<style>
	/* Style for the toggle switch */
	.toggle-switch {
		--toggle-width: 30px;
		--toggle-height: 1rem;
		--toggle-switch-size: calc(var(--toggle-height) - 2px);
		position: relative;
		display: inline-block;
		width: var(--toggle-width);
		height: var(--toggle-height);
		display: flex;
		align-items: center;
	}

	/* Hide the default checkbox input */
	.toggle-switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* Style the slider (the visual part of the toggle switch) */
	.slider {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		border-radius: 2px;
		cursor: pointer;
		transition: 0.4s;
	}

	/* Change the slider background color when the toggle switch is checked */
	.slider::before {
		position: absolute;
		content: '';
		height: var(--toggle-switch-size);
		width: var(--toggle-switch-size);
		left: 2px;
		bottom: 1px;
		background-color: var(--fourth-accent);
		border-radius: 2px;
		transition: 0.4s;
	}

	/* Style the label text */
	.label {
		position: absolute;
		left: calc(var(--toggle-width) + 10px);
		white-space: nowrap;
	}

	/* Change the slider background color and position when the toggle switch is checked */
	.toggle-switch input:checked + .slider {
		background-color: var(--third-accent);
	}

	.toggle-switch input:checked + .slider::before {
		transform: translateX(calc(var(--toggle-width) - var(--toggle-switch-size) - 5px));
	}
</style>
